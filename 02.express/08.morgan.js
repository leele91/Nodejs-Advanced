// 모듈 추출
const express = require('express');
const morgan = require('morgan');

//서버 생성
const app = express();
// 미들웨어 설정
//app.use(morgan('combined'));
// app.use(morgan(':method + :date + :remote-addr'));  // 간략하게 로그 정보가 보임
app.use(morgan('short'));
app.use(function (request, response) {
    response.send('<h1>express basic</h1>');

});
// 서버 실행
app.listen(3000, function() {
    console.log('Server running at http://127.0.0.1:3000');
});