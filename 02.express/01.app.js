// 모듈을 추출합니다.
const express = require('express');
const util = require('util'); 

// 서버를 생성합니다.
const app = express();

// request 이벤트 리스너를 설정
// if문으로 연결이 안되있기에 파일 분리가 가능
app.use(function(req, res) { // 많이 사용하는 use를 등록
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
    /* res.redirect(); */ // redirect 다른코드로 갈수있음
}); 
//app.get(); // get방식으로 들어오는 것들을 url보고 처리하겠다는 의미
//app.post(); 

app.listen(3000, () => {
    util.log('Server Running at http://127.0.0.1:3000');
});