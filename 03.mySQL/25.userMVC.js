const express = require('express');
const bodyParser = require('body-parser');
const dm = require('./db/userdb-module');
const app = express();
const view = require('./view/alertmsg');
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => { 
    dm.getAllLists(rows => { 
        const view = require('./view/userList');
        let html = view.mainForm(rows);
            res.end(html);
    }); 
});

app.get('/login', (req, res) => {
    const view = require('./view/userlogin');
    let html = view.loginForm();
    res.send(html)
});
app.post('/login', (req, res) => {
    let uid =req.body.uid;
    let pwd =req.body.pwd;
    let pwdHash = dm.generateHash(pwd);
    dm.getUserInfo(uid,result => {
        if (result === undefined) { // undefined가 나와야함
            let html = view.alertMsg(`Login 실패 : ${uid}가 다릅니다.`, '/login');
            res.send(html);
        } else {
            if (result.pwd === pwdHash) { //db에서 가져온 패스워드랑 사용자가 가져온 패스워드랑 비교
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

app.listen(3000, () => {
    console.log('Server running at http://127.0.0.1:3000');
});
