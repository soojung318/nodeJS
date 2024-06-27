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
    // console.log(("GET /login 처리 시작"));
    // try {
    //     const { mongodgb, mysqldb } = await setup();
    //     res.send('로그인 화면 : DB 사용 가능');
    // } catch (err) {
    //     res.status(500).send('DB 연결 실패');
    // }

    //login ok 상황연출
    res.render('index.ejs');
    
})

//라우터는 마지막에 항상 방출해야 한다.
module.exports = router;