// for(var i = 0; i < 5; i++)
// {
//      console.log('javascript');
// }

// var i = 0; //i값을 0으로 초기화
// if(i < 5) {  console.log('javascript'); i++ } //조건이 참이면 실행
// if(i < 5) {  console.log('javascript'); i++ } //조건이 참이면 실행
// if(i < 5) {  console.log('javascript'); i++ } //조건이 참이면 실행
// if(i < 5) {  console.log('javascript'); i++ } //조건이 참이면 실행
// if(i < 5) {  console.log('javascript'); i++ } //i가 5이므로 반복문 종료

//별표 10개 출력하기
// for(var i = 0; i < 10; i++)
// {
//         console.log('*');
// }

//1월부터 12월까지 출력하기
// for(var i = 1; i < 13; i++)
// {
//     console.log(i + '월');
// }

//2의 배수 출력하기
// for(var i = 2; i < 101; i+=2)
// {
//     console.log(i);
// }

//1부터 10까지 합
// var sum = 0;
// for(var i = 1; i < 11; i++)
// {
//         sum = sum + i;
// }
// console.log(sum);

//구구단 2단 출력하기
// for(var i = 1; i < 10; i++)
// {
//          console.log("2 * " + i + " = " + 2 * i);
// }

//사용자로부터 입력한 구구단 출력하기
// const readline = require("readline");
// const rl = readline.createInterface({
//   // 모듈을 이용해 입출력을 위한 인터페이스 객체 생성
//   input: process.stdin,
//   output: process.stdout,
// });

//   // 생성한 rl 변수를 사용하는 법
//   rl.question("단수를 입력하세요 : ", function(dan){ 
//     for(var i = 1; i < 10; i++)
//     {
//         console.log(dan + " * " + i + " = " + dan * i);
//     }
//     rl.close(); // close가 없으면 입력을 무한히 받는다.
//   });
//   rl.on('close', () => {
//     // 입력이 끝난 후 실행할 코드
//   })


//배터리 충전상태 출력하기
// for (var i = 0; i < 101; i++)
// {
//        console.log('충전중 : ' + i + '%');
// }
// console.log('충전이 완료되었습니다.');

//무한 반복
// var i = 0;
// for (;;)
// {
//         console.log('충전중 : ' + i + '%');
//         i++;
// }
// console.log('충전이 완료되었습니다.');

//배열 핸들링
// var arr = ["자바스크립트", "C언어", "파이썬"]
// console.log(arr[0]);
// console.log(arr[1]);
// console.log(arr[2]);

//배열의 동적 추가
console.log('===== 초기 배열 데이터 =====');
var arr = ["자바스크립트", "C언어", "파이썬"]
console.log(arr[0]);
console.log(arr[1]);
console.log(arr[2]);

console.log();
console.log('===== 배열에 데이터 추가 =====');

arr.push('ASP.net');
arr.push('C#.net');

console.log();
console.log('===== 배열의 출력 =====');

console.log('배열의 길이 : ' + arr.length);
for(var i = 0; i < arr.length; i++)
{
    console.log(arr[i]);
}
