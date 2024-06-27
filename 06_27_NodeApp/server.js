const setup = require('./db_setup'); //export 되어 있는 애가 옴. db_setup.js에서 exports 한 마지막 코드 확인하기
//setup(); 호출법임. 
const express = require("express");

const app = express();
app.use('/', require('./routes/account')); // '/'로 시작하는 모든~ 이라는 뜻. context임

//포트 열어주기
app.listen(8080, async () => {
    await setup(); //setup 함수를 async(비동기)로 만들었기 때문에 위 코드가 다 실행될 동안 기다려주어야하니 await 쓰기
    console.log("8080 서버가 준비되었습니다...");
});