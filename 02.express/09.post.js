const express = require('express');
const bodyParser = require('body-parser'); // body모듈 설치후 사용가능
const fs =  require('fs');
const util = require('util');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
   /*  res.send('<h1>3초 후 로그인 페이지 이동합니다.</h1>') */
    setTimeout(() => {
        res.redirect('/login');
    }, 3000);
   /*  return; */
});

app.get('/login', (req, res) => {
    fs.readFile('09.loginform.html', 'utf8', (error, data) => {
        res.send(data);
    });
});
app.post('/login', (req, res)=> { //body로 사용자가 입력한 정보를 보여줌?
    let uid = req.body.uid;
    let pwd = req.body.pwd;
    
    util.log(uid,pwd);
    if (uid === 'park' && pwd === '1234')
        res.send(`<h1>Login Success</h1>`); // uid: ${uid}, pwd: ${pwd}<br> 을 ()안에 포함시 화면에 띄움
    else
        res.redirect('/login');
});

app.listen(3000, () => {
    util.log('Server running at http://127.0.0.1:3000');
});