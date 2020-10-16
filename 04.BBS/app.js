const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const uRouter = require('./userRouter');
const bRouter = require('./bbs');
const ut = require('./00_util');
const am = require('./view/alertMsg');
const dm = require('./db/db-module');
const fs = require('fs');

const app = express();
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/popper', express.static(__dirname + '/node_modules/@popperjs/core/dist/umd'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('1q2w3e4r5t6y'));
app.use(session({
    secret: '1q2w3e4r5t6y',  /// keyboard cat
    resave: false,
    saveUninitialized: true,
    store: new FileStore({ logFn: function (){}})
}));

app.use('/user', uRouter);
app.use('/bbs', bRouter);

app.get('/', (req, res) => {
    fs.readFile('./view/index.html', 'utf8', (error, data) => {
        res.send(data);
    });
});
    app.post('/login', (req, res) => {
        let uid = req.body.uid;
        let pwd = req.body.pwd;
        let pwdHash = ut.generateHash(pwd);
        dm.getUserInfo(uid, result => {
            if (result === undefined) {                                  // undefined가 나와야함
                let html = am.alertMsg(`Login 실패: uid ${uid}이/가 없습니다.`, '/');
                res.send(html);
            } else {
                if (result.pwd === pwdHash) {
                    req.session.uid = uid;
                    req.session.uname = result.uname;
                    console.log('login 성공');
                    req.session.save(function () {
                        res.redirect('/bbs');
                    });
                } else {
                    let html = am.alertMsg('Login 실패: 패스워드가 다릅니다.', '/');
                    res.send(html);
                }
            }
        });
    });
    app.get('/logout', (req, res) => {
        req.session.destroy();
        res.redirect('/');
    });


/* const view = require('./view/test');
    let html = view.test();
    res.send(html);*/


app.listen(3000, () => {
    console.log('Server running at http://127.0.0.1:3000');
});