const { MongoClient } = require('mongodb');
const mysql = require("mysql2");

let mongodb;
let mysqldb;

const setup = async () => {
    if (mongodb && mysqldb) { //이미 접속한 db가 둘다 있다면
        return { mongodb, mysqldb };
    } else { //처음 접속 및 둘 중 하나 접속이 없다면..
        try {
            //1. 몽고디비 접속
            const mongoDbUrl = `mongodb+srv://admin:1234@cluster0.qefoj4b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
            const mongoConn = await MongoClient.connect(mongoDbUrl, //async-await 짝꿍(비동기함수)
                {
                    //useeNewUrlParser: true,
                    //useUnifiedTopology: true
                });
            mongodb = mongoConn.db('myboard'); //db연결된 것을 mongodb에 asign 시켜줌
            console.log("몽고DB 접속 성공");

            //2. mysql 접속
            mysqldb = mysql.createConnection({ //비동기함수 아니여서 async-await 안함
                host: 'localhost',
                user: 'root',
                password: '0000',
                database: 'myboard'
            });
            mysqldb.connect();
            console.log("MySQL 접속 성공");

            return { mongodb, mysqldb };

        }
        catch (err) { //db접속이 실패한다면 err 찍기
            console.log("DB 접속 실패", err);
            throw err;
        }
    }
};

module.exports = setup; //module 내장객체로 setup을 방출시킨다