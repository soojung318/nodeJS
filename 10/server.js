// //const express = require('express');
// // const app = express();

// // app.listen(8080, function(){
// //     console.log("포트 8080으로 서버 대기중 ... ")
// // });
// // app.get('/book', function(req, res){
// //     res.send('도서 목록 관련 페이지입니다.');
// // })
// // app.get('/', function(req, res){
// //     res.sendFile(__dirname + '/index.html');
// // })

// //9. mysql 설정
// const mysql = require("mysql2");
// const conn = mysql.createConnection({ //conn에 객체를 저장.
//   host: "localhost",
//   user: "root",
//   password: "0000",
//   database: "myboard",
// });

// conn.connect(); //conn에 connect 객체 실행. mysql에 연결 완료(==소켓 연결 완료)



// const express = require("express"); //require==import 와 비슷한 뜻. 라이브러리를 가져와서 express라는 객체에 담아 사용하겠다. 
// const app = express();

// //미들웨어 설정
// app.use(express.static("public"));//static 메서드 호출: argument로 static 폴더 지정. 여기선 public이라는 디렉토리.
// //이렇게 하면 라우팅이 필요 없음

// app.listen(8080, function () {
//   console.log("8080 server ready...");
// });



// // 라우팅
// // app.get("/", function (req, res) { // 라우터에 response, request 객체 요청
// //     res.sendFile(__dirname + "public/index.html"); //로컬서버에 바로 보여지길 원하는 디렉토리 설정
// //   });


// // app.get("/list", function (req, res) {
// //   //비동기방식
// //   const rows = conn.query("select * from post", function (err, rows, fields) { //첫번쨰 인자: sql구문, 두번째 인자(1:에러객체,2:row객체,3:필드객체들)
// //     if (err) console.log(err); //err면 출력
// //     else console.log(rows); //아닐경우 출력
// //     //console.log(fields); 길어서 주석처리
// //   });

// //   //동기방식
// //   //const rows=aaa.b(); 
// //   res.send(rows);
// // });

// app.get("/list", function (req, res) {
//   conn.query("select * from post", function (err, rows, fields) {
//     if (err) throw err;
//     console.log(rows);
//   });
// });



///////
const mongoclient = require("mongodb").MongoClient;
const url =
  "mongodb+srv://admin:1111@cluster0.hmvwkf5.mongodb.net/?retryWrites=true&w=majority";

let mydb;
mongoclient
  .connect(url)
  .then((client) => {
    mydb = client.db("myboard");
    // mydb.collection('post').find().toArray().then(result =>{
    //     console.log(result);
    // })

    app.listen(8080, function () {
      console.log("포트 8080으로 서버 대기중 ... ");
    });
  })
  .catch((err) => {
    console.log(err);
  });

// MySQL + nodejs 접속 코드
var mysql = require("mysql");
var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "myboard",
});

conn.connect();

const express = require("express");
const app = express();

// app.listen(8080, function(){
//     console.log("포트 8080으로 서버 대기중 ... ")
// });
app.get("/book", function (req, res) {
  res.send("도서 목록 관련 페이지입니다.");
});
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.get("/list", function (req, res) {
  // conn.query("select * from post", function (err, rows, fields) {
  //   if (err) throw err;
  //   console.log(rows);
  // });
  mydb
    .collection("post")
    .find()
    .toArray()
    .then((result) => {
      console.log(result);
    });
});