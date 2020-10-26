const express = require('express');
const ut = require('./00_util');
const dm = require('./db/db-module');
const am = require('./view/alertMsg');
const tplt = require('./view/template');

const uRouter = express.Router();
// 회원가입 창
uRouter.get('/register', (req, res) => {
        const view = require('./view/userRegister'); //userRegister: 회원가입 html폼
        let navbar = tplt.headertow(req.session.uname);
        let html = view.register(navbar);
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
            res.redirect('/login');
        });
    } else {                                                         // 패스워드 입력이 잘못된 경우
        let html = am.alertMsg(`패스워드가 일치하지 않습니다`,  './register');
        res.send(html);
    }
});
uRouter.get('/dispatch', ut.isLoggedIn, (req, res) => {
    if (req.session.uid === 'admin') {
        res.redirect('/user/list/1');
    } else {
        res.redirect(`/user/update/${req.session.uid}`);
    }
});
uRouter.get('/list/:page', (req, res) => {
    let page = parseInt(req.params.page);
    req.session.currentPage = page;
    let offset = (page - 1) * 10;
    dm.getuserTotalCount(result =>{
        let totalPage = Math.ceil(result.count / 10);
        let startPage = Math.floor((page-1)/10)*10 + 1;
        let endPage = Math.ceil(page/10)*10;
        endPage = (endPage > totalPage) ? totalPage : endPage;
        dm.getuserLists(offset, rows => {
            const view = require('./view/user_list');
            let navbar = tplt.headertow(req.session.uname);
            let html = view.userlistForm(rows,navbar,page,startPage,endPage,totalPage); 
            res.end(html);
            });
    });
});

uRouter.get('/uid/:uid', (req, res) => {
        let uid = req.params.uid;
        dm.getUserInfo(uid, result => {
            const view = require('./view/user_view');
            let navbar = tplt.headertow(req.session.uname);
            let html = view.userview(navbar,result);
            console.log(uid);
            res.send(html);
    
    });
});

uRouter.get('/update/:uid', ut.isLoggedIn, (req, res) =>  {
    let uid = req.params.uid;
    dm.getUserInfo(uid, result => {
            const view = require('./view/user_update');
            let navbar = tplt.headertow(req.session.uname);
            let html = view.updateForm(navbar, result);
            res.send(html);
    });
});

uRouter.post('/update', ut.isLoggedIn, (req, res) => {    
    let uid = req.body.uid;
    let pwdHash = req.body.pwdHash;
    let pwd = req.body.pwd;
    let pwd2 = req.body.pwd2;
    let uname = req.body.uname;
    let tel = req.body.tel;
    let email = req.body.email
    if (pwd && pwd !== pwd2) {
        let html = am.alertMsg(`패스워드가 일치하지 않습니다`, `/user/update/${uid}`);
        res.send(html);
    } else {    
        if (pwd) 
            pwdHash = ut.generateHash(pwd); 
        let params = [pwdHash, uname, tel, email, uid];
        dm.updateUser(params, ()=> {
            console.log(uid,uname,tel,email);
            res.redirect(`/user/uid/${uid}`);
        });                                                  
    }
});

uRouter.get('/delete/:uid', ut.isLoggedIn, (req, res) => {         // 로그인 된 상태확인 
    if (req.params.uid === req.session.uid) {                    // 권한이 있다.
        dm.deleteUser(req.params.uid, () => {
            res.redirect('/login');
        });
    } else {
        let html = am.alertMsg('삭제권한이 없습니다.', '/');
        res.send(html);
    }
});



/* bRouter.get('/delete/:bid/uid/:uid', ut.isLoggedIn, (req, res) => { 
    let bid = parseInt(req.params.bid);      
    if (req.params.uid === req.session.uid) {                   
        dm.deletebbs(bid, () => {
            res.redirect('/');
        });
    } else {
        let html = am.alertMsg('삭제권한이 없습니다.', '/');
        res.send(html);
    }
});
 */



module.exports = uRouter;