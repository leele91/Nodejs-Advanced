// 모듈을 추출합니다.
const express = require('express');
const util = require('util'); 

// 서버를 생성합니다.
const app = express();

// request 이벤트 리스너를 설정
app.get('/', function(req, res) { // '/'를 써서 내가 받아올 주소만 적음
    let html = `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Express</title>
    </head>
    <body>
        <h1>welcome to Express</h1>
    </body>
    </html>
`;
    res.send(html);
    
}); 
app.get('*', (req, res) =>{ // 내가 지정한 주소 외가 오면 에러메세지 
    res.status(404).send('Path not found'); //  res.status(404).메소드 체이닝
});
//app.post(); 

app.listen(3000, () => {
    util.log('Server Running at http://127.0.0.1:3000');
});