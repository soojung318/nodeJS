const router = require("express").Router(); //라우터 꺼내온다
const setup = require('../db_setup');

const sha = require('sha256');

/* server.js로 app.get으로 이동
//⭐get()이 routing 함수. router는 routing 객체가 아니다.
router.get('/', async (req, res) => {
    console.log("GET / 처리 시작");
    try {
        const { mongodgb, mysqldb } = await setup();
        res.send('홈 : DB 사용 가능');
    } catch (err) {
        res.status(500).send('DB 연결 실패');
    }
});
*/

//회원가입화면 보기
router.get("/account/enter", (req, res) => {
    res.render("enter.ejs");
});

//회원가입 처리
router.post("/account/save", async (req, res) => {
    // console.log('req.body<<',req.body);
    //db객체가 있어야 작업가능하니 일단 setup을 시켜준다. setup은 비동기 함수니 기다려줘야함
    const { mongodb, mysqldb } = await setup();
    mongodb.collection('account')
        .findOne({ userid: req.body.userid })
        .then(result => { //result가 있을수도 없을수도 있으니 반드시 검사
            if (result) {
                res.render('enter.ejs', { data: { msg: 'ID가 중복되었습니다.' } }); //db랑 일치하는 회원 정보검사. 있으면 로그인 홈으로 go
            } else {
                const generateSalt = (length = 16) => {

                    //crypto는 내장모듈.
                    const crypto = require('crypto');
                    return crypto.randomBytes(length).toString('hex'); //버퍼에 있는 내용을 16진수 형태로 만들어줘
                };
                const salt = generateSalt();
                console.log('req.body<<', req.body);
                req.body.userpw = sha(req.body.userpw + salt); //userpw를 암호화하는 법
                mongodb.collection('account')
                    .insertOne(req.body)//req.body
                    .then(result => {
                        if (result) {
                            console.log('회원가입 성공');
                            //회원가입이 성공하면 db에 쿼리 날림
                            const sql = `insert into usersalt(userid, salt) values (?,?)`
                            mysqldb.query(sql, [req.body.userid, salt],
                                //(err,rows, fields)=>{}); 
                                (err, rows, fields) => {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        console.log("salt 저장 성공");
                                    }
                                });
                            res.redirect('/'); // '/' 는 홈페이지로 다시 가라

                        } else {
                            //회원가입 실패시(db 문제)
                            console.log("회원가입 실패");
                            res.render('enter.ejs', { data: { alertMsg: '회원가입 실패' } }); //사용자 화면은 그대로 머무는 것처럼 보이지만, 실제로는 새로운 화면이 보이는 것임
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        //res.status(500).send();
                        res.render('enter.ejs', { data: { alertMsg: '회원가입 실패' } });
                    });
            }
        })
        .catch(err => {
            console.log(err);
            //res.status(500).send();
            res.render('enter.ejs', { data: { alertMsg: '회원가입 실패' } });
        });
    // res.render("save ok");/
});

// 로그인 처리
router.post('/account/login', async (req, res) => {
    console.log(req.body);
    const { mongodb, mysqldb } = await setup();
    mongodb.collection('account')
        .findOne({ userid: req.body.userid })
        .then(result => {
            if (result) { //결과가 있으면 쏠트를 mysql 에서 찾아옴
                const sql = `select salt from usersalt where userid=?`; //?는 쿼리문의 [] 부분이 들어감
                mysqldb.query(sql, [req.body.userid],
                    (err, rows, fields) => {
                        const salt = rows[0].salt;
                        const hashPW = sha(req.body.userpw + salt);
                        if (result.userpw == hashPW) { //입력값과 디비에 저장된 해쉬값이 같으면 로그인성공
                            //로그인 성공
                            req.body.userpw = hashPW; //입력된 pw를 해쉬된 pw로 바꿈.
                            req.session.user = req.body; // 그걸가지고 serialize 함.
                            res.cookie('uid', req.body.userid); // (key,value)
                            res.render('index.ejs');
                        } else {
                            // 입력한 pw와 디비에 저장된 pw(해쉬값)이 다를 경우 >> 로그인 실패
                            res.render('login.ejs',{data:{alertMsg:'다시 로그인 해주세요'}}); // 자세히 에러간 난 것을 알려주지 않는 것도 보안의 한 방법이다
                        }
                    });
            } else {
                //로그인 실패
                res.render('login.ejs',{data:{alertMsg:'다시 로그인 해주세요'}});
            }
        })
        .catch(err => {
            //로그인실패
            res.render('login.ejs',{data:{alertMsg:'다시 로그인 해주세요'}});

        });


    // console.log(("GET /login 처리 시작"));
    // try {
    //     const { mongodgb, mysqldb } = await setup();
    //     res.send('로그인 화면 : DB 사용 가능');
    // } catch (err) {
    //     res.status(500).send('DB 연결 실패');
    // }



});
router.get('/account/logout', (req, res) => {
    req.session.destroy();
    res.render('index.ejs'); //destroy 한 다음에 index 페이지로 forward 한다
});

//라우터는 마지막에 항상 방출해야 한다.
module.exports = router;