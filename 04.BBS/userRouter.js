const express = require('express');
const ut = require('./00_util');
const dm = require('./db/db-module');
const am = require('./view/alertMsg');

const uRouter = express.Router();
// 회원가입 창
uRouter.get('/register', (req, res) => {
        const view = require('./view/userRegister'); //userRegister: 회원가입 html폼
        let html = view.register();
        res.send(html);
});
// 패스워드 재 확인창
uRouter.post('/register',  (req, res)=>{
    let uid = req.body.uid
    let pwd = req.body.pwd
    let pwd2 = req.body.pwd2
    let uname = req.body.uname
    let tel = req.body.tel
    let email = req.body.email
    if (pwd === pwd2) {
        let pwdHash = ut.generateHash(pwd);
        let params = [uid, pwdHash, uname, tel, email];
        dm.userint(params, ()=> {
            res.redirect('/');
        });
    } else {                                                         // 패스워드 입력이 잘못된 경우
        let html = am.alertMsg(`패스워드가 일치하지 않습니다`,  './register');
        res.send(html);
    }
});
uRouter.get('/dispatch', ut.isLoggedIn, (req, res) => {
    if (req.session.uid === 'admin') {
        res.redirect('/');
    } else {
        res.redirect(`/user/update/${req.session.uid}`);
    }
});


/* uRouter.get('/uid/:uid', (req, res) =>{
    let uid = parseInt(req.params.uid);
    dm.getUserInfo(uid, result => {
        const view = require('./view/user_view');
        let html = view.userview(result);
        res.send(html);
    });
}); */

uRouter.get('/update/:uid', ut.isLoggedIn, (req, res) =>  {
    if (req.params.uid === req.session.uid) {                             // 권한이 있다.
        dm.getUserInfo(req.params.uid, (result) => {
            const view = require('./view/user_update');
            html = view.updateForm(result);
            res.send(html);
        });
    } else {
        let html = am.alertMsg('수정 권한이 없습니다.', '/');
        res.send(html);
    }
});

uRouter.post('/update', ut.isLoggedIn, (req, res) => {    
    let uid = req.body.uid;
    let uname = req.body.uname;
    let pwd = req.body.pwd;
    let pwd2 = req.body.pwd2;
    let tel = req.body.tel;
    let emall = req.body.email
    if (pwd === pwd2) {
        let pwdHash = ut.generateHash(pwd); 
        let params = [pwdHash, uname, tel, emall];
        dm.updateUser(params, ()=> {
            console.log(pwdHash, uid)
            res.redirect('/');
        });
    } else {                                                         // 패스워드 입력이 잘못된 경우
        let html = am.alertMsg(`패스워드가 일치하지 않습니다`, `/updat/${uid}`);
        res.send(html);
    }
});




module.exports = uRouter;