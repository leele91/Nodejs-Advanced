const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const dm = require('./db/db-module')
const am = require('./view/alertMsg');
const ut = require('./00_util');
const tplt = require('./view/template'); // app메인에서 받은 로그인 정보를 여기로 받아서 네비바
const fs = require('fs');

const bRouter = express.Router();
/* const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
 */

bRouter.get('/list/:page', (req, res)=> {
    let page = parseInt(req.params.page);
    req.session.currentPage = page;
    let offset = (page - 1) * 10;
    dm.getBbsTotalCount(result => {
        let totalPage = Math.ceil(result.count / 10);
        let startPage = Math.floor((page-1)/10)*10 + 1;
        let endPage = Math.ceil(page/10)*10;
        endPage = (endPage > totalPage) ? totalPage : endPage;
        dm.getJoinLists(offset, rows => {
            const view = require('./view/BBS_list');
            let navbar = tplt.headertow(req.session.uname); // app메인에서 받은 로그인 정보를 여기로 받아서 네비바로 넘김
            let html = view.bblistForm(rows,navbar,page,startPage,endPage,totalPage); 
            res.end(html);

        });
    });
});

bRouter.get('/bid/:bid',  (req, res) => {
    let bid = parseInt(req.params.bid);
    dm.getbbsview(bid, result => {
        dm.increaseViewCount(bid, () => {
            const view = require('./view/BBS_view');
            let navbar = tplt.headertow(req.session.uname);
            let html = view.viewForm(result, navbar);
            res.send(html);
        });
    });
});

bRouter.get('/insert', (req, res) => { // 입력창 영역
    console.log('/bbs/insert get');
    const view = require('./view/BBS_input');
    let navbar = tplt.headertow(req.session.uname);
    let html = view.insert(navbar);
    res.send(html);
});

bRouter.post('/insert', (req, res)=> { // 사용자가 입력한 것을 받는 영역
    let uid = req.session.uid
    let title = req.body.title;
    let content = req.body.content;
    let params = [uid, title, content];
    dm.insertbbs(params, ()=> {
        console.log(params);
        res.redirect('/');
    });
});

bRouter.get('/delete/:bid/uid/:uid', ut.isLoggedIn, (req, res) => { 
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

bRouter.get('/update/:bid/uid/:uid', ut.isLoggedIn, (req, res) => {
    let bid = req.params.bid;
    let uid = req.params.uid;
    if (uid === req.session.uid) {
        dm.getbbsInfo(bid, (result) => {
            const view = require('./view/BBS_udte');
            let navbar = tplt.headertow(req.session.uname);
            html = view.update(navbar, result );
            res.send(html);
        });
    } else {
        let html = am.alertMsg('수정 권한이 없습니다.', '/');
        res.send(html);
    }
});

bRouter.post('/update', (req, res) =>{
    let bid = req.body.bid;
    let title = req.body.title;
    let content = req.body.content;
    let params = [title, content, bid];
    
    dm.updatebbs(params, () => {
        console.log(params);
        res.redirect('/');
    });
});

bRouter.get('/deleteConfirm/:bid', ut.isLoggedIn, (req, res) => {
    let bid = req.params.bid;
    let page = parseInt(req.session.currentPage);
    dm.deletebbs(bid, () => {
        res.redirect(`/bbs/list/${page}`);
    });
});

/* const view = require('./view/test');
    let html = view.test();
    res.send(html);*/

/*  app.listen(3000, () => {
        console.log('Server running at http://127.0.0.1:3000');
}); */

module.exports = bRouter;
