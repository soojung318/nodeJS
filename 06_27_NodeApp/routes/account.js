const router = require("express").Router(); //라우터 꺼내온다
const setup = require('../db_setup');

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

router.get('/login', async (req, res) => {
    console.log(("GET /login 처리 시작"));
    try {
        const { mongodgb, mysqldb } = await setup();
        res.send('로그인 화면 : DB 사용 가능');
    } catch (err) {
        res.status(500).send('DB 연결 실패');
    }
})

//라우터는 마지막에 항상 방출해야 한다.
module.exports = router;