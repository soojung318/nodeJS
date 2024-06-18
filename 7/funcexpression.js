// 함수 표현식
// function nickName()
// {
//       console.log("이예쁜");
// }
// nickName();

//한개의 변수로 함수의 포인터 주소 변경하기
// var nickName = function()
// {
//       console.log ("이예쁜");
// }
// nickName();

// nickName = function()
// {
//       console.log ("이귀엽");
// }
// nickName();


//함수를 변수에 복사하기
var nickName = function()
{
    console.log("이예쁜");
}

var userName = nickName;

userName();
nickName();


