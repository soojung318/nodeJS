//1-12월까지 출력하기
// var i = 1;
// while(i < 13)
// {
//         console.log(i + '월');
//         i++;
// }

//1부터 10까지 출력하기
// var sum = 0;
// var i = 1;
// while( i < 11 )
// {
//        sum = sum + i;
//        i++;
// }
// console.log(sum);

//사용자로부터 입력한 구구단 출력하기
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("단수를 입력하세요 : ", function(dan){ 
    var i = 1;
    while( i < 10)
    {
            console.log(dan * i);
            i++;
    }

    rl.close(); 
});
