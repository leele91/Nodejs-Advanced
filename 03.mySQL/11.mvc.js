const express = require('express');
const bodyParser = require('body-parser');
const dm = require('./db/db-module_00');
// 웹을 컨트롤 할수 있는 것만 냄김
const app = express();
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => { 
    /* dm.getAllLists(rows => { // getAllLists에 있는것을 가져와서 처리
        const view = require('./view/join_00');
        let html = view.mainForm(rows);
            res.end(html);*/
        dm.getJoinLists(rows => { 
        const view = require('./view/join_00');
        let html = view.mainForm(rows);
        res.end(html);
    }); 
});

app.get('/insert', (req, res) => { // 입력창 영역
    const view = require('./view/insert_00');
    let html = view.insertForm() 
        res.send(html);
});

app.post('/insert', (req, res)=> { // 사용자가 입력한 것을 받는 영역
    let title = req.body.title;
    let lyrics = req.body.lyrics;
    let params = [title,lyrics];

    dm.insertSong(params, ()=> {
        res.redirect('/');
    });
});
app.get('/delete/:sid', (req, res) => {
    let sid = parseInt(req.params.sid);
    console.log(sid);
    dm.deleteSong(sid, () => {
        res.redirect('/');
    });
});
app.get('/update/:sid', (req, res) => {
    let sid = parseInt(req.params.sid);
    dm.getsong(sid, result => {
        const view = require('./view/update_00');
        let html = view.updateForm(result);
        res.send(html);
    });
});
app.post('/update', (req, res) =>{
    let sid = parseInt(req.body.sid);
    let title = req.body.title;
    let lyrics = req.body.lyrics;
    let params = [title,lyrics, sid];

    dm.updateSong(params, () => {
        res.redirect('/');
    });
});

app.listen(3000, () => {
    console.log('Server running at http://127.0.0.1:3000');
});
