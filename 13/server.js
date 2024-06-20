const mongoclient = require("mongodb").MongoClient;
const ObjId = require('mongodb').ObjectId;
const url =
  "mongodb+srv://admin:1234@cluster0.qefoj4b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
let mydb;
mongoclient
  .connect(url)
  .then((client) => {

    mydb = client.db('myboard');
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
var mysql = require("mysql2");
var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "0000",
  database: "myboard",
});

conn.connect();

const express = require("express");
const app = express();

//body-parser 라이브러리 추가
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
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
//   conn.query("select * from post", function (err, rows, fields) {
//     if (err) throw err;
//     console.log(rows);
//   });
    mydb.collection('post').find().toArray().then(result => {
      console.log(result);
      res.render('list.ejs', { data : result });
    })
});

//'/enter' 요청에 대한 처리 루틴
app.get('/enter', function(req, res){
  // res.sendFile(__dirname + '/enter.html');
  res.render('enter.ejs');
});

//'/save' 요청에 대한 post 방식의 처리 루틴
app.post('/save', function(req, res){
  console.log(req.body.title);
  console.log(req.body.content);
  //몽고DB에 데이터 저장하기
  // mydb.collection('post').insertOne(
  //     {title : req.body.title, content : req.body.content}, 
  //     function(err, result){
  //         console.log(err);
  //         console.log(result);
  //         console.log('데이터 추가 성공');
  //     });

  mydb.collection('post').insertOne(
    {title : req.body.title, content : req.body.content, date : req.body.someDate})
    .then(result => {
        console.log(result);
        console.log('데이터 추가 성공');
    });

  // let sql = "insert into post (title, content, created) values(?, ?, NOW())";
  // let params = [req.body.title, req.body.content];
  // conn.query(sql, params, function (err, result) {
  //     if (err) throw err;
  //     console.log('데이터 추가 성공'); 
  // });
  res.send('데이터 추가 성공');
});


app.post("/delete", function (req, res) { //post, get 
  console.log(req.body);
  req.body._id = new ObjId(req.body._id);
  //req.body._id의 _id는 객체
  //new ObjId(req.body._id);의 _id는 body의 parameter 이름
  mydb.collection('post').deleteOne(req.body) //{_id:object('xxx5ds645654s6z')} 오브젝트가 16진수로 저장된다.
  .then(result=>{
    console.log('삭제완료');
    res.status(200).send();
  })
  .catch(err =>{
    console.log(err);
    res.status(500).send(); //collection에 이름을 빼면 500:Internal Server Error
  });
});