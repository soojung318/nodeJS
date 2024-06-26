const mongoclient = require("mongodb").MongoClient;
const ObjId = require("mongodb").ObjectId;
const url =
  "mongodb+srv://admin:1234@cluster0.qefoj4b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
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
// var mysql = require("mysql");
// var conn = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "123456",
//   database: "myboard",
// });

// conn.connect();

const express = require("express");
const app = express();

const sha = require('sha256');

let session = require("express-session");
app.use(
  session({
    secret: "dkufe8938493j4e08349u",
    resave: false,
    saveUninitialized: true,
  })
);

//body-parser 라이브러리 추가
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
//정적 파일 라이브러리 추가
app.use(express.static("public"));

app.get("/book", function (req, res) {
  res.send("도서 목록 관련 페이지입니다.");
});
app.get("/", function (req, res) {
  //res.render("index.ejs");
  if (req.session.user) {
    console.log("세션 유지");
    //res.send('로그인 되었습니다.');
    res.render("index.ejs", { user: req.session.user });
  } else {
    console.log("user : null");
    res.render("index.ejs", { user: null });
  }
});
app.get("/list", function (req, res) {
  //   conn.query("select * from post", function (err, rows, fields) {
  //     if (err) throw err;
  //     console.log(rows);
  //   });
  mydb
    .collection("post")
    .find()
    .toArray()
    .then((result) => {
      console.log(result);
      res.render("list.ejs", { data: result });
    });
});

//'/enter' 요청에 대한 처리 루틴
app.get("/enter", function (req, res) {
  // res.sendFile(__dirname + '/enter.html');
  res.render("enter.ejs");
});

//'/save' 요청에 대한 post 방식의 처리 루틴
app.post("/save", function (req, res) {
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

  mydb
    .collection("post")
    .insertOne({
      title: req.body.title,
      content: req.body.content,
      date: req.body.someDate,
    })
    .then((result) => {
      console.log(result);
      console.log("데이터 추가 성공");
    });

  // let sql = "insert into post (title, content, created) values(?, ?, NOW())";
  // let params = [req.body.title, req.body.content];
  // conn.query(sql, params, function (err, result) {
  //     if (err) throw err;
  //     console.log('데이터 추가 성공');
  // });
  res.redirect("/list");
});

app.post("/delete", function (req, res) {
  console.log(req.body);
  req.body._id = new ObjId(req.body._id);
  mydb
    .collection("post")
    .deleteOne(req.body)
    .then((result) => {
      console.log("삭제완료");
      res.status(200).send();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send();
    });
});

//'/content' 요청에 대한 처리 루틴
app.get("/content/:id", function (req, res) {
  console.log(req.params.id);
  req.params.id = new ObjId(req.params.id);
  mydb
    .collection("post")
    .findOne({ _id: req.params.id })
    .then((result) => {
      console.log(result);
      res.render("content.ejs", { data: result });
    });
});

//'/edit' 요청에 대한 처리 루틴
app.get("/edit/:id", function (req, res) {
  req.params.id = new ObjId(req.params.id);
  mydb
    .collection("post")
    .findOne({ _id: req.params.id })
    .then((result) => {
      console.log(result);
      res.render("edit.ejs", { data: result });
    });
});

app.post("/edit", function (req, res) {
  console.log(req.body);
  req.body.id = new ObjId(req.body.id);
  mydb
    .collection("post")
    .updateOne(
      { _id: req.body.id },
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          date: req.body.someDate,
        },
      }
    )
    .then((result) => {
      console.log("수정완료");
      res.redirect("/list");
    })
    .catch((err) => {
      console.log(err);
    });
});

let cookieParser = require("cookie-parser"); //설치한 쿠키파서 라이브러리를 포함시켜요

app.use(cookieParser("ncvka0e398423kpfd")); //cookieParser() 미들웨어를 등록해요
app.get("/cookie", function (req, res) { // /cookie 요청 시 처리할 라우터를 생성해요
  let milk = parseInt(req.signedCookies.milk) + 1000; //브라우저에서 받은 req.signedcookies.milk 값은 문자열이에요. 1000씩 더하는 연산을 위해 정수로 형변환 해주어요.
  if (isNaN(milk)) { // 쿠키 생성 전 브라우저가 처음으로 요청한 경우라면 req.cokkies에 NaN이 저장되어 있어요. isNaN() 함수로 현재 쿠키가 NaN인지 확인해요(NaN이면 true)
    milk = 0; //원활한 연산을 위해 milk 값이 NaN일 경우 0을 대입해요
  }
  res.cookie("milk", milk, { signed: true }); //milk라는 쿠키를 생성하여 이 값을 쿠키로 브라우저에 보내요
  //res.clearCookie('milk');
  res.send("product : " + milk + "원"); //현재의 milk값을 브라우저에 표기해요
                                        //send는 한번 호출하고나면 끝. 즉 새로고침해도 두번이상 안생겨요
                                        //브라우저에서 서버로 재요청 시 보내온 쿠키 정보를 req 요청 객체를 통해 쿠키 정보를 읽은 후 다시 브라우저로 전송해요
});

// app.get("/session", function (req, res) { //세션 요청 라우터를 생성해요
//   console.log(req.session.milk);
//   if(isNaN(req.session.milk)) // 브라우저에서 req.session.milk 요청시 값이 NaN이면 0으로 설정해서 연산이 가능하게 만들어요
//   {
//     req.session.milk = 0;
//   }
//   req.session.milk = req.session.milk + 1000; //세션이 쌓일 때마다 1000씩 누적시켜요
//   res.send("session : " + req.session.milk + "원"); //세션의 값을 브라우저로 전송해요
// });

app.get("/login", function (req, res) {
  console.log(req.session);
  if (req.session.user) { // 사용자의 세션이 이미 등록되어 있다면 새로운 홈 화면인 index.ejs로 이동해요. 이때 페이지에 {user: req.session.user} 데이터를 넘겨줘요
    console.log("세션 유지");
    //res.send('로그인 되었습니다.');
    res.render("index.ejs", { user: req.session.user });
  } else { 
    console.log("로그인 페이지");
    res.render("login.ejs");
  }
});

app.post("/login", function (req, res) {
  console.log("아이디 : " + req.body.userid);
  console.log("비밀번호 : " + req.body.userpw);
  //res.send('로그인 되었습니다.');
  mydb
    .collection("account")
    .findOne({ userid: req.body.userid })
    .then((result) => {
      // console.log(result);
      // console.log(md5(req.body.userpw));
      if (result.userpw == sha(req.body.userpw)) {
        req.session.user = req.body;
        console.log("새로운 로그인"); //현재의 로그인이 첫 번째 로그인임을 출력한다.
        //res.send('로그인 되었습니다.');
        res.render("index.ejs", { user: req.session.user }); //처음 로그인에 성공하면 홈화면으로 이동. 홈화면에 {user:req.}
      } else {
        //res.send('비밀번호가 틀렸습니다.');
        res.render("login.ejs");
      }
    });
});

app.get("/logout", function (req, res) {
  console.log("로그아웃");
  req.session.destroy();
  res.render("index.ejs", { user: null });
});

app.get("/signup", function (req, res) {
  res.render("signup.ejs");
});

app.post("/signup", function (req, res) {
  console.log(req.body.userid);
  console.log(sha(req.body.userpw));
  console.log(req.body.usergroup);
  console.log(req.body.useremail);

  mydb
    .collection("account")
    .insertOne({
      userid: req.body.userid,
      userpw: sha(req.body.userpw),
      usergroup: req.body.usergroup,
      useremail: req.body.useremail,
    })
    .then((result) => {
      console.log("회원가입 성공");
    });
  res.redirect("/");
});
