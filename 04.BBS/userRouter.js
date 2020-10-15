const express = require('express');
const ut = require('./00_util');
const dm = require('./db/db-module');
const uRouter = express.Router();
const am = require('./view/alertMsg');

uRouter.get('/register', (req, res) => {
        const view = require('./view/userRegister');
        let html = view.register();
        res.send(html);
});

uRouter.post('/register',  (req, res)=>{
    let uid = req.body.uid
    let pwd = req.body.pwd
    let pwd2 = req.body.pwd2
    let uname = req.body.uname
    let tel = req.body.tel
    let email = req.body.email
    if (pwd === pwd2) {
        let pwdHash = ut.generateHash(pwd);
        let params = [uid, pwd, pwdHash, uname, tel, email];
        dm.userint(params, ()=> {
            res.redirect('/');
        });
    } else {                                                         // 패스워드 입력이 잘못된 경우
        let html = am.alertMsg(`패스워드가 일치하지 않습니다`);
        res.send(html);
    }
});

module.exports = uRouter;