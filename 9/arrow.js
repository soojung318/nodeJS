//화살표 함수 기본
// let plus = (a, b)=>{
//     return a + b;
// }

// let result = plus(10, 20);
// console.log('두 수의 합 :' + result);

//화살표 함수 한줄로 축약
// let plus = (a, b)=> a + b;

// let result = plus(10, 20);
// console.log('두 수의 합 :' + result);

//화살표 함수의 인수가 1개인 경우
// let plus = a => a + 1;

// let result = plus(10);
// console.log('값의 1증가 : ' + result);

//화살표 함수의 인수가 없는 경우
let plus = () => "플러스";

let result = plus();
console.log('A ' + result);