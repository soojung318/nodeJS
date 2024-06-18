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


//'/enter' 요청에 대한 처리 루틴
router.get("/enter", function (req, res) {
    // res.sendFile(__dirname + '/enter.html');
    res.render("enter.ejs");
  });
  
  //'/save' 요청에 대한 post 방식의 처리 루틴
router.post("/save", function (req, res) {
    console.log(req.body.title);
    console.log(req.body.content);
    //몽고DB에 데이터 저장하기
    mydb
      .collection("post")
      .insertOne({
        title: req.body.title,
        content: req.body.content,
        date: req.body.someDate,
        path: imagepath
      })
      .then((result) => {
        console.log(result);
        console.log("데이터 추가 성공");
      });
  
    res.redirect("/list");
  });

  let multer = require('multer');

let storage = multer.diskStorage({
  destination : function(req, file, done){
    done(null, './public/image')
  },
  filename : function(req, file, done){
    done(null, file.originalname)
  }
})

let upload = multer({storage : storage});

router.get('/upload', function(req, res){
  res.render('upload.ejs');
})

let imagepath = '';
router.post('/photo', upload.single('picture'), function(req, res){
 console.log(req.file.path);
 imagepath = '\\' + req.file.path;
})

module.exports = router;
