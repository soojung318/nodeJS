const setup = require('./db_setup'); //export 되어 있는 애가 옴. db_setup.js에서 exports 한 마지막 코드 확인하기
//setup(); 호출법임. 
const express = require("express");
const app = express();

const session = require('express-session');
app.use(session({ //session 객체를 호출할 때 {} 안에 호출할 옵션 객체들을 추가
    secret: "암호화키",
    resave: false,
    saveUninitialized: false
}));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); //여러객체가 중첩되어 있어도 처리 가능하게

app.get('/', (req, res) => {
    res.render("index.ejs");
});

app.use('/', require('./routes/account')); // '/'로 시작하는 모든~ 이라는 뜻. context임
app.use('/', require('./routes/post.js')); //deserialize

//포트 열어주기
app.listen(process.env.WEB_PORT, async () => {
    await setup(); //setup 함수를 async(비동기)로 만들었기 때문에 위 코드가 다 실행될 동안 기다려주어야하니 await 쓰기
    console.log("8080 서버가 준비되었습니다...");
});

app.get("/enter", (req, res) => {
    res.sendFile(__dirname + "/enter.html");
});

app.post("/save", (req, res) => {
    //console.log(req.body);
    mydb
        .collection("post")
        .insertOne(req.body)
        .then((result) => {
            //console.log("저장완료\n", result);
            //res.send("ok");
            //res.redirect("/list");
            //보안을 위해서 redirect보다 forward를 추천함
            list(req, res);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send();
        });
});

app.get("/list", (req, res) => {
    list(req, res);
});

function list(req, res) {
    mydb
        .collection("post")
        .find()
        .toArray()
        .then((result) => {
            res.render("list.ejs", { data: result });
        })
        .catch((err) => {
            console.log(err);
        });
}

app.post("/delete", function (req, res) {
    //console.log(req.body);
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
