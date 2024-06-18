//프로미스 기본 코드
// function pro1(){
//     return new Promise(function(resolve, reject){
//         setTimeout(function(){
//             reject('pro1 fail');
//         },1000);      
//     });
// }
// function pro2(){
//     return new Promise(function(resolve, reject){  
//         setTimeout(function(){
//             resolve('pro2 success');
//         },1000);      
//     });
// }

// pro1()
// .then(function(result){
//     console.log('result1', result);
//     return pro2();
// })
// .catch(function(err){
//     console.log('err', err);
//     return Promise.reject(err);
// })
// .then(function(result){
//     console.log('result2', result);
// })


//개선된 코드
const pro1 = pid =>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            if(pid == "jamsuham"){
                resolve('pro1 success');
            }else{
                reject('pro1 fail');
            }           
        },1000);      
    });
}
const pro2 = ppw=>{
    return new Promise((resolve, reject)=>{  
        setTimeout(()=>{
            if(ppw == '1111'){
                resolve('pro2 success');
            }else{
                reject('pro2 fail');
            }       
        },1000);      
    });
}

const id = 'jamsuham';
const pw = '111';

pro1(id).
then(result=>{
    console.log('result1', result);
    return pro2(pw);
})
.then(result=>{
    console.log('result2', result);
})
.catch(err=>{
    console.log('err', err);
    return Promise.reject(err);
})