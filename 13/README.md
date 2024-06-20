# 13. 웹 서버 기본 기능 구현
## 13-5. 게시물 생성, 조회, 삭제
### 게시물 생성과 조회
- 데이터 생성 동작은 웹 브라우저 => 서버 => DB 순으로 처리함.
#### enter.html을 enter.ejs로 변경
- html : 데이터 입력 페이지⭕, 데이터 출력 페이지❌
- ejs 사용 목적 : 동적 데이터 출력
- html을 ejs 포맷으로 변경하는 이유 2가지
 
    1. 구조 분리
       `<nav></nav>`로 구성된 메뉴는 `index.html`, `list.ejs` 파일의 공통 내용, 앞으로 생성될 페이지에도 중복으로 들어갈 내용임.
       따라서 이런 경우에 `<nav></nav>`의 내용만 별도로 분리하여 각 `ejs` 파일에 include 시키는 방식으로 구조를 변경할 것임.
       `html` 파일은 이런 구조 분리가 불가능함.
    3. UI 페이지 포맷 통일
       어떤 페이지는 `ejs`로 사용하고 어떤 페이지는 `html`을 사용한다면 동작에는 문제가 없을지라도 프로젝트의 구성이나 코드가 통일성 및 가독성에 문제가 생긴다.

#### 게시물 조회
- 데이터 조회 동작 순서 : DB => Server => Web browser
- 조회할 데이터를 DB에서 서버로 가져온다.
- 서버는 ejs를 이용하여 데이터를 웹 브라우저로 넘겨준다.

#### ajax 사용하여 선택한 데이터 삭제
- ajax(Async Javascript And Xml)란 웹 페이지에서 새로운 데이터를 요청할 때 웹 페이지 전체를 새로고침하지 않고 원하는 데이터만 로드하기 위한 기법임.
- ajax 동작방식
```
$.ajax({
  type : 요청방식,
  url : 요청경로,
  data : 서버로 보낼 데이터
  })
  .done(function(result){...}) // 응답에 성공했을 때
  .fail(function(xhr, textStatus, errorThrown){ // 응답에 실패했을 때
})   
  ```

|종류|데이터|
|:------:|---|
|type|요청 방식(get, post, delete, put)|
|url|요청 주소(/delete)|
|data|서버로 보낼 데이터( {_id : 100 } )|

- 클라이언트에서 서버로 post 방식으로 `/delete` 요청하면 서버는 `app.post('/delete')`로 처리한다.
- 이때 요청 정보와 함께 보낸 게시물 정보는 콜백 함수의 매개변수인 req에 전달된다.
- 사용자가 보낸 요청 정보 `req`에서 post 방식으로 보낸 데이터를 읽어올 때 req.body의 형태를 사용한다.
```
//client
$.ajax({
  type : 'post',
  url : '/delete',
  data : {_id : '644k3j4k32k2l3k3i245k6k'}
})

//server
app.post("/delete", function(req, res) {
  console.log(req.body);
  console.log('삭제완료');
});
```
브라우저 주소창에 'http://localhost:8080/list'를 입력하고 `Enter`를 누르면 ajax는 list.ejs 페이지가 실행될 때 요청이 수행되고, 서버 코드에서 처리된다.
```
//Terminal
{ _id: '645kjlk3k3l435l4k3j3434' }
삭제완료
```
- 요청 정보가 서버로 넘어왔다.
- 사용자가 삭제할 게시물 번호를 서버가 알 수 있다.
- 서버에서는 몽고DB에 해당 게시물 번호로 접근하여 실제 데이터를 삭제 처리한다.
- 게시물 번호 `{ _id: '645kjlk3k3l435l4k3j3434' }`를 몽고DB에서 찾아 삭제한다.
- 몽고DB에서 데이터를 삭제하려면 deleteOne(), deleteMany() 함수를 사용한다.
- deleteOne(data) : document 1개를 삭제할 때 사용
- deleteMany(data) : 조건에 해당하는 도큐먼트를 모두 삭제할 때 사용.

```
mydb.collection('post').deleteOne(req.body)
```

- 몽고DB 내부의 _id 형식은 ObjectId로 감싸져 있다.
- ObjectId는 RDBMS에서 Primary Key와 같은 고유키를 의미한다.
- 삭제 요청을 보낼 때는 이 ObjectId 형식에 맞춰야 한다.
- 
