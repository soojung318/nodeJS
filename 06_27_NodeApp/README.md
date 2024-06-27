## ERR 모음
### 1️⃣ connection error: MongoParseError: option usecreateindex is not supported

몽구스 <a href="https://mongodb.github.io/node-mongodb-native/3.3/reference/unified-topology/">공식문서</a>에는
```
No More Deprecation Warning Options
useNewUrlParser, useUnifiedTopology, useFindAndModify, and useCreateIndex are no longer supported options. Mongoose 6 always behaves as if useNewUrlParser, useUnifiedTopology, and useCreateIndex are true, and useFindAndModify is false. Please remove these options from your code.
```
버전 6부터 해당 옵션을 사용하지 않으므로 지워주면 된다.
```
 const mongoConn = await MongoClient.connect(mongoDbUrl,
    {
         //useeNewUrlParser: true,
         //useUnifiedTopology: true
    });

```
----
### 2️⃣ MongoServerSelectionError: 946C0000:error:0A000438:SSL routines:ssl3_read_bytes:tlsv1 alert internal error:c:\ws\deps\openssl\openssl\ssl\record\rec_layer_s3.c:1590:SSL alert number 80

MongoDB Atlas에서 새로운 IP 추가해주면 된다.

----
### 3️⃣ MySQL Workbench에서 쿼리문 에러가 날 때 테이블 생성하는 다른 방법
<a href="https://pinetreeday.tistory.com/145">테이블 생성하는 다른 방법</a>
