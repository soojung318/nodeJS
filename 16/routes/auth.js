var router = require('express').Router();

const mongoclient = require("mongodb").MongoClient;
const ObjId = require("mongodb").ObjectId;
const url = process.env.DB_URL;

let mydb;
mongoclient
  .connect(url)
  .then((client) => {
    mydb = client.db("myboard");
  })
  .catch((err) => {
    console.log(err);
  });

  const sha = require('sha256');
  let session = require("express-session");
  router.use(
    session({
      secret: "dkufe8938493j4e08349u",
      resave: false,
      saveUninitialized: true,
    })
  );

  router.get("/login", function (req, res) {
    console.log(req.session);
    if (req.session.user) {
      console.log("세션 유지");
      //res.send('로그인 되었습니다.');
      res.render("index.ejs", { user: req.session.user });
    } else {
      console.log("로그인 페이지");
      res.render("login.ejs");
    }
  });


  router.get("/", function (req, res) {
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
  
  router.post("/login", function (req, res) {
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
          console.log("새로운 로그인");
          //res.send('로그인 되었습니다.');
          res.render("index.ejs", { user: req.session.user });
        } else {
          //res.send('비밀번호가 틀렸습니다.');
          res.render("login.ejs");
        }
      });
  });
  
  router.get("/logout", function (req, res) {
    console.log("로그아웃");
    req.session.destroy();
    res.render("index.ejs", { user: null });
  });
  
  router.get("/signup", function (req, res) {
    res.render("signup.ejs");
  });
  
  router.post("/signup", function (req, res) {
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


  module.exports = router;