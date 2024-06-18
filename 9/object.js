//객체의 사용
// let dic = new Object();

// dic.boy = "소년";
// dic.girl = "소녀";
// dic.friend = "친구";

// console.log(dic.boy);
// console.log(dic.girl);
// console.log(dic.friend);

//객체 리터럴
// let dic = {
//     boy : "소년",
//     girl : "소녀",
//     friend : "친구"
// };
      
// console.log(dic.boy);
// console.log(dic.girl);
// console.log(dic.friend);

//프로퍼티 추가
// let dic = {
//     boy : "소년",
//     girl : "소녀",
//     friend : "친구"
// };

// dic.apple = '사과'; 
// dic.ten = 10;     
// console.log(dic.apple);
// console.log(dic.ten);


//프로퍼티 삭제
// let dic = {
//     boy : "소년",
//     girl : "소녀",
//     friend : "친구"
// };

// delete dic.girl;  
// console.log(dic.boy);
// console.log(dic.girl);
// console.log(dic.friend);

//프로퍼티 수정
// let dic = {
//     present : "현재",
// };

// console.log(dic.present);
// dic.present = "선물";
// console.log(dic.present);

//객체 상수 프로퍼티 수정
// const dic = {
//     present : "현재",
// };

// console.log(dic.present);
// dic.present = "선물";
// console.log(dic.present);


//객체 상수 변경
// const dic = {
//     present : "현재",
// };

// dic = { };
// console.log(dic.present);
// dic.present = "선물";
// console.log(dic.present);

//객체의 메소드
// const unit = { 
//     attack : function(weapon ) { 
//             return `${weapon }으로 공격한다.`;
//     } 
// }

// console.log(unit.attack("주먹"));
// console.log(unit.attack("총"));

//메소드 축약형
// const unit = { 
//     attack(weapon ) { 
//             return `${weapon }으로 공격한다.`;
//     } 
// }

// console.log(unit.attack("주먹"));
// console.log(unit.attack("총"));

//대괄호 표기법
// let dic = {
//     boy : "소년",
//     girl : "소녀",
//     friend : "친구"
// };
            
// console.log(dic['boy']);
// console.log(dic['girl']);
// console.log(dic['friend']);

//대괄호 표기법
// let dic = {
//     boy : "소년",
//     girl : "소녀",
//     friend : "친구"
// };
            
// let word = boy;
// console.log(dic[word]);

//대괄호 표기법 사용자 입력
// const readline = require("readline");
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// let dic = {
//     boy : "소년",
//     girl : "소녀",
//     friend : "친구"
// };

// rl.question("찾을 단어를 입력하세요 : ", function (key) {
//     let word = key;
//     console.log(dic[word]);
    
//   rl.close();
// });



//계산된 프로퍼티

// const readline = require("readline");
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// rl.question("다이쓰! 무조건 천원, 상품입력?", function (obj) {
//     let basket = {
//         [obj] : "1000원",
//     }
//     console.log(basket[obj]);
    
//   rl.close();
// });

// let idx = 0;

// let code = {
//     ['index' + idx++] : idx,
//     ['index' + idx++] : idx,
//     ['index' + idx++] : idx,
// };
// console.log(code.index0);            
// console.log(code.index1);
// console.log(code.index2);

//단축 프로퍼티 적용전
// let id = "jamsu";
// let pw = "1111";
        
// let user = {
//     id : id, 
//     pw : pw,
// }

// console.log(user.id);
// console.log(user.pw);


//단축 프로퍼티 적용
// let id = "jamsu";
// let pw = "1111";
        
// let user = {
//     id, 
//     pw,
// }

// console.log(user.id);
// console.log(user.pw);


//for...in
let user = {
    id : "jamsu", 
    pw : "1111",
    name : "lch",
    mobile : "010-4477-XXXX", 
    country : "대한민국"
}

for(let info in user){
  console.log(`${info} : ${user[info]}`);
}

