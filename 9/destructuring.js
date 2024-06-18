//비구조화 할당 이전
// const Week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// const mon = Week[0];
// const tue = Week[1];
// const wed = Week[2];

// console.log(mon);
// console.log(tue);
// console.log(wed);

// let user = {
//     id : 'jamsuham',
//     pw : '1234',
//     name : '잠수함',
//     age : 30,
// };

// let id = user.id;
// let pw = user.pw;
// let name = user.name;
// let age = user.age;

// console.log(id);
// console.log(pw);
// console.log(name);
// console.log(age);


//배열의 구조분해
// const color = ['red', 'green', 'blue'];
// let [r, g, b] = color; 

// console.log(r);
// console.log(g);
// console.log(b);

//변수 값 변경
// const color = ['red', 'green', 'blue'];
// let [r, g, b] = color; 

// [b, g, r] = [r, g, b];
// console.log(r);
// console.log(g);
// console.log(b);

//조금 더 간결하게
// [b, g, r] = ['red', 'green', 'blue'];
// console.log(r);
// console.log(g);
// console.log(b);

//기본값 할당
// const [a, b, c = 'C언어'] = ['C#', 'javascript'];
// console.log(a);
// console.log(b);
// console.log(c);

//일부 요소값 무시하기
// const [a,,c,d] = ['C#', 'javascript', 'python', 'react'];
// console.log(a);
// console.log(c);
// console.log(d);

//나머지 요소 가져오기
// const [a,b, ...rest] = ['C#', 'javascript', 'python', 'react', 'C++'];
// console.log(a);
// console.log(b);
// console.log(rest.length);
// console.log(rest[0]);
// console.log(rest[1]);
// console.log(rest[2]);

//배열의 결합
// const arr1 = ['C#', 'javascript'];
// const arr2 = ['python', 'react', 'C++'];
// const arr3 = [arr1, arr2];

// console.log(arr3);

//객체의 구조분해할당
// let user = {
//     id : 'jamsuham',
//     pw : '1234',
//     name : '잠수함',
//     age : 30,
// };

// let {id, pw, name, age} = user;

// console.log(id);
// console.log(pw);
// console.log(name);
// console.log(age);

//객체의 구조분해 할당 간소화
// let {id, pw, name, age} = {id : 'jamsuham', pw : '1234', name : '잠수함',age : 30,};

// console.log(id);
// console.log(pw);
// console.log(name);
// console.log(age);

// 객체의 기본값 설정하기
// let user = {
//     name : '잠수함',
//     age : 30,
// };

// let {id = 'guest', pw, name, age} = user;

// console.log(id);
// console.log(pw);
// console.log(name);
// console.log(age);

// 객체의 나머지 요소 가져오기
let user = {
    id : 'jamsuham',
    pw : '1234',
    name : '잠수함',
    age : 30,
};

let {id, ...rest} = user;

console.log(id);
console.log(rest.pw);
console.log(rest.name);
console.log(rest.age);