const express = require('express');
const bodyParser = require('body-parser');
const dm = require('./db/userdb-module');
const cookieParser = require('cookie-parser');

const app = express();
const view = require('./view/alertmsg');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req, res) => {
    console.log(req.cookies);
    if (req.cookies && req.cookies.isLoggedIn) {//로그인 된 상태
        dm.getAllLists(rows => {
            const view = require('./view/cookList');
            let html = view.mainForm(rows);
            res.end(html);
        });
    } else {
        res.redirect('/login');
    }
});

app.get('/login', (req, res) => {
    const view = require('./view/userlogin');
    let html = view.loginForm();
    res.send(html)
});
app.post('/login', (req, res) => {
    let uid = req.body.uid;
    let pwd = req.body.pwd;
    let pwdHash = dm.generateHash(pwd);
    dm.getUserInfo(uid, result => {
        if (result === undefined) { // undefined가 나와야함
            let html = view.alertMsg(`Login 실패 : ${uid}가 다릅니다.`, '/login');
            res.send(html);
        } else {
            if (result.pwd === pwdHash) {
                res.cookie('isLoggedIn', 1); //{maxAge: 60*1000} isLoggedIn은 쿠키이름(임의로 지정)
                console.log('login 성공');
                res.redirect('/');
            } else {
                const view = require('./view/alertmsg');
                let html = view.alertMsg(`Login 실패 : 패스워드가 다릅니다.`, '/login');
                res.send(html);
            }
        }
    });
});
app.get('/logout', (req, res) => {
    res.clearCookie('isLoggedIn');
    res.redirect('/login');
})

app.listen(3000, () => {
    console.log('Server running at http://127.0.0.1:3000');
});
