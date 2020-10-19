const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const bRouter = express.Router();
const dm = require('./db/db-module')
const ut = require('./00_util');
const tplt = require('./view/template'); // app메인에서 받은 로그인 정보를 여기로 받아서 네비바
const fs = require('fs');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));



bRouter.get('/', (req, res)=> {
    dm.getJoinLists(rows => {
        const view = require('./view/BBS_list');
        let navbar = tplt.headertow(req.session.uname); // app메인에서 받은 로그인 정보를 여기로 받아서 네비바로 넘김
        let html = view.bblistForm(rows,navbar); 
        res.end(html);
    });
});

bRouter.get('/:bid',  (req, res) => {
    let bid = parseInt(req.params.bid);
    dm.getbbsview(bid, result => {
        const view = require('./view/BBS_view');
        let navbar = tplt.headertow(req.session.uname);
        let html = view.viewForm(result, navbar);
        res.send(html);
    });
});

app.get('/insert', (req, res) => { // 입력창 영역
    const view = require('./view/BBS_input');
    let html = view.insert() 
        res.send(html);
});

app.post('/insert', (req, res)=> { // 사용자가 입력한 것을 받는 영역
    let title = req.body.title;
    let content = req.body.content;
    let params = [title,content];
    dm.insertbbs(params, ()=> {
        res.redirect('/');
    });
});



// 페이지 
/* const bRouter = express.Router();
bRouter.get('/bbs/:page', (req, res) => {
    let page = parseInt(req.params.page);
    let offset = (page - 1) * 10;
    dm.getBbsTotalCount(result => {
        let totalPage = Math.ceil(result.count / 10);
        dm.getBbsList(offset, rows => {
            let view = require('./view/BBS_list');
            let headertow = template.headertow(req.session.uname?req.session.uname:'개발자');
            let html = view.list(headertow, rows, page, totalPage);
            res.send(html);
        })
    });
}); */



/* const view = require('./view/test');
    let html = view.test();
    res.send(html);*/

/*  app.listen(3000, () => {
        console.log('Server running at http://127.0.0.1:3000');
}); */

module.exports = bRouter;
