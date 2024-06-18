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
