# 15장 인증시스템 구현
## 15-1. 쿠키
### 쿠키란
- Cookie : 사용자가 인터넷을 통해 웹사이트에 접속했을 때 해당 사이트의 서버를 통해 데이터를 전달받아 로컬에 저장되는 데이터
- 쿠키 1개당 최대 4KB 용량 가짐.
- 하나의 도메인 당 최대 20개까지 저장 가능
- 작은 데이터여서 쿠키임.

### 쿠키 사용 기능
- 자동 로그인 : 일정 시간 동안 로그인 상태를 유지할 수 있는 자동 로그인 기능
- 장바구니 : 온라인 쇼핑몰에서 로그인을 하지 않아도 장바구니에 물건을 담을 수 있도록 쿠키를 이용함. 장바구니에 담긴 물건 정보를 쿠키에 저장해서 사용자가 다시 접속하면 쿠키를 확인하여 이전에 담은 물건 정보를 불러온다.
- 최근 검색 리스트 : 검색 엔진에서 사용자가 검색한 키워드를 쿠키에 저장하여 최근 검색 기록을 제공.
- 사용자 선호도를 기록하고 분석하는 용도 : 사용자가 이전에 클릭한 상품과 관련된 상품을 추천함. 이전에 검색했던 상품이나 카테고리 정보, 구매 이력 등을 쿠키에 저장하여 활용함.

### 쿠키 생성 과정
목적 : 서버와 클라이언트 간의 통신에서 데이터를 매번 서버로부터 받아 오지 않고 로컬에 저장하여 쉽게 사용하기 위함.

    1. 브라우저에서 서버에 정보를 요청
    2. 서버는 쿠키를 생성하여 요청한 정보를 HTTP 헤더와 함께 쿠키 정보를 돌려보냄.
    3. 브라우저는 받은 쿠키 정보를 로컬에 저장.
    4. 브라우저에서 다시 서버에 접속할 경우 가지고 있는 쿠키를 서버에 전달함.
    5. 업데이트할 정보가 있다면 서버는 해당 쿠키를 요청한 정보와 함께 쿠키 정보를 돌려보냄.

### 쿠키 생성
- 쿠키는 서버 측에서 클라이언트에게 보내주는 '키 : 값" 형식의 데이터
### 쿠키 보관 시간 
```
cookie(키, 값, {maxAge : 보관 시간(ms)})
```
- cookie() 함수의 3번째 인자인 `maxAge` 를 통해 쿠키 보관 시간(ms) 설정 가능

### 쿠키 삭제 기능
- 쿠키는 설정에 따라 시간이 지나면 자동으로 삭제가 되지만 바로 삭제하는 기능도 있음
- `maxAge` : 0을 통한 쿠키 삭제
```
res.cookie("milk", milk, {maxAge : 0 });
```

- `clearCookie()` 함수를 통한 쿠키 삭제
```
res.clearCookie('milk'); //삭제할 쿠키의 값을 전달하면 해당 쿠키 바로 삭제 가능
```
## 15-2. 쿠키 보안
- 쿠키 데이터는 로컬 컴퓨터에 저장되기 때문에 누구든 열람해 볼 수 있으므로 안전❌
### 쿠키 데이터의 암호화
1. cookieParser에 전달인자로 키값을 넘겨주어 해당 키값을 사용하여 쿠키 데이터를 암호화한다.
```
app.use(cookieParser('nlkjasflkdaslfkj23kr3')); // 키값은 아무값이나 막 입력하면 된다.
```
2. `req.cookies` 대신 `req.signedCookies`로 변경한다. 이것은 쿠키 데이터를 암호화한 상태로 읽어온다.
```
let milk = parseInt(req.signedCokkies.milk) + 1000;
```
3. 쿠키 데이터를 암호화된 상태로 생성하기 위해 cookie() 함수 전달인자로 `{signed:true}` 추가한다.
```
res.cokkie("milk", milk, {signed:true});
```
### 쿠키 암호화 방법
- 위 방법은 쿠키의 암호화보다는 쿠키 값에 서명을 추가하여 무결성을 검증하기 위한 방법임.
- 암호화된 쿠키값 : 암호화 라이브러리 사용
- 1. 대칭키 암호화(Symmetric Encryption) : 암호화, 복호화에 동일한 키를 사용
  2. 비대칭키 암호화(Asymmetric Encryption) : 암화화, 복호화에 서로 다른 키 쌍 사용

## 15-3. 세션 방식
### 세션이란
- 중요한 개인정보가 매번 브라우저와 서버를 오고 가는 것은 해킹의 위험이 큼.
- 쿠키 : 모든 데이터를 전부 저장
- 세션 : 식별자(id)만 저장
- 사용자가 서버에 요청 => 브라우저에서는 저장된 식별자를 서버에 보냄 => 서버는 해당 식별자에 해당하는 데이터 찾아 응답

### 세션 생성
- express-session : 서버가 세션을 이용하게 해 주고 사용자 쿠키에 세션 정보를 담을 수 있게 하는 미들웨어
- 세션의 id만 저장
- 데이터는 서버에서 관리
- `secret` : 세션 아이디를 암호화하기 위한 재료 값
- `resave` : 세션을 접속할 때마다 새로운 세션 식별자(sid)의 발급 여부 결정. 보통 false.
- `saveUninitialized` : 세션 사용 전까지 세션 식별자를 발급하지 않도록 한다. 보통 false.
- true로 설정할 경우 생기는 문제
      - 세션을 발급해 달라는 요청을 하지도 않았느데 세션이 발급되어 버림.
      - 로그인을 시도하지 않았는데 로그인이 허용되어 버린다.
      - 디도스 공격

### 쿠키와 세션 방식 비교
|쿠키|세션|
|------|---|
|데이터를 브라우저에 저장|데이터를 서버에 저장|
|요청 속도가 세션 방식에 비해 빠름|서버에서 처리하기 때문에 요청 속도가 쿠키 방식에 비해 느림|
|데이터가 로컬에 저장되기 때문에 변질되거나 해킹당할 우려 있음|로컬에는 세션 id만 저장되고 그것으로 구분해서 서버에서 처리하기 때문에 비교적 보안성이 높음|


## 15-4. 로그인 페이지
### 로그인 페이지 구현
- 쿠키 방식 ❌
- 세션 ID 이용 ⭕


## 15-5. 인증 시 세션 적용
### 계정 검사 인증 코드에 세션 적용
- 세션 쿠키
    - session 미들웨어를 서버 코드 앞쪽에 위치
    - 서버가 실행될 경우, 세션의 기본값이 자동 생성됨.

### 세션을 삭제하여 로그아웃 구현
- `destroy()`
- 로그아웃 라우터 => 로그아웃 요청 => 세션 제거 => 로그아웃

## 15-6. 회원가입 페이지

## 15-7. 비밀번호 암호화

## 15-8. 패스포트 인증 시스템

------
<a href="https://forest-eggnog-7b5.notion.site/JihoonKim-7e2af71138d1424bb46ed6c1ef193cdf">참고문헌</a>
