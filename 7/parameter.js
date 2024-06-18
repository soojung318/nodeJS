function account(userId)
{
    var savedUser = '이은성';
    if(userId == savedUser){
        console.log('반갑습니다. ' + userId + '님');
    }else{
        console.log('로그인 실패했습니다.');
    }
}
account('이은성');
