const mongoclient = require("mongodb").MongoClient;
const url =
  "mongodb+srv://admin:1234@cluster0.qefoj4b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

let mydb;
mongoclient
  .connect(url)
  .then((client) => {
    console.log('몽고db 접속 성공');

    mydb = client.db("myboard");
    mydb.collection('post').find().toArray().then(result => {
      console.log(result);
    })

    app.listen(8080, function () {
      console.log("포트 8080으로 서버 대기중 ... ");
    });
  })
  .catch((err) => {
    console.log(err);
  });
/*
// MySQL + nodejs 접속 코드
var mysql = require("mysql2");
var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "0000",
  database: "myboard",
});

conn.connect();
*/
const express = require("express");
const app = express();

// app.listen(8080, function () {
//   console.log("포트 8080으로 서버 대기중 ... ")
// });

/*
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

});*/



//유진님
const app = express();

const mongoclient = require('mongodb').MongoClient;
const url = 'mongodb+srv://admin:1234@cluster0.qefoj4b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoclient.connect(url)

let mydb;
mongoclient
.connect(url)
.then((client) => {
  console.log("몽고DB 접속 성공");
  mydb = client.db("myboard");

  app.listen(8080, function(){
    console.log("8080 server ready...")
  });
})

.catch(err => {
  console.log(err);
});

app.get('/list', function(req, res) {
  mydb 
    .collection("post")
    .find()
    .toArray()
    .then((result) => {
      console.log(result);
      res.send(result);
    });
});

app.get('/enter', function(req,res){
  res.sendFile(__dirname+'/enter.html');
});