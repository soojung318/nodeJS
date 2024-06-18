//수행조건이 true인 경우
// if(true)
// {
//     console.log('무조건 참입니다');
// }

//비교연산자
// var num = 20;
// if(num > 10)
// {
//     console.log('변수는 10보다 큽니다.');
// }

//연산자 대소 비교
// var num = 20;
// if(num > 10)
// {
//     console.log('변수는 10보다 큽니다.');
// }
// if(num < 10)
// {
//     console.log('변수는 10보다 작습니다.');
// }
// if(num == 10)
// {
//     console.log('변수는 10과 같습니다.');
// }

//if ~ else
// var num = 5;
// if(num > 10)
// {
//     console.log('변수는 10보다 큽니다.');
// }
// else
// {
//     console.log('변수는 10보다 크지 않습니다.');
// }

//사용자 데이터 입력 코드
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('프로그래밍 언어 이름을 입력하시오 :  ', function(data){
  //입력값에 대한 처리
  console.log('가장 좋아하는 프로그래밍 언어는 ' + data + '입니다');
  rl.close();
});


