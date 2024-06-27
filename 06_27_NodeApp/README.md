## ERR 모음
### 1️⃣ connection error: MongoParseError: option usecreateindex is not supported

몽구스 <a href="https://mongodb.github.io/node-mongodb-native/3.3/reference/unified-topology/">공식문서</a>에는
```
No More Deprecation Warning Options
useNewUrlParser, useUnifiedTopology, useFindAndModify, and useCreateIndex are no longer supported options.
Mongoose 6 always behaves as if useNewUrlParser, useUnifiedTopology, and useCreateIndex are true,
and useFindAndModify is false. Please remove these options from your code.
```
버전 6부터 해당 옵션을 사용하지 않으므로 지워주면 된다.
```
 const mongoConn = await MongoClient.connect(mongoDbUrl,
    {
         //useeNewUrlParser: true,
         //useUnifiedTopology: true
    });

```

