const express = require('express');
const bodyParser = require('body-parser');
const dm = require('./db/db-module');
// 웹을 컨트롤 할수 있는 것만 냄김
const app = express();
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => { 
        dm.getAllLists(rows => { 
        const view = require('./view/list');
        let html = view.mainForm(rows);
        res.end(html);
    }); 
});

app.get('/insert', (req, res) => { // 입력창 영역
    const view = require('./view/insert');
    let html = view.insertForm() 
        res.send(html);
});

app.post('/insert', (req, res)=> { // 사용자가 입력한 것을 받는 영역
    let name = req.body.name;
    let debut = req.body.debut;
    let params = [name, debut];

    dm.insertSong(params, ()=> {
        res.redirect('/');
    });
});
app.get('/delete/:ggid', (req, res) => {
    let ggid = parseInt(req.params.ggid);
    console.log(ggid);
    dm.deleteSong(ggid, () => {
        res.redirect('/');
    });
});
app.get('/update/:ggid', (req, res) => {
    let ggid = parseInt(req.params.ggid);
    dm.getsong(ggid, result => {
        const view = require('./view/update');
        let html = view.updateForm(result);
        res.send(html);
    });
});
app.post('/update', (req, res) =>{
    let ggid = parseInt(req.body.ggid);
    let name = req.body.name;
    let debut = req.body.debut;
    let params = [name,debut,ggid];

    dm.updateSong(params, () => {
        res.redirect('/');
    });
});

app.listen(3000, () => {
    console.log('Server running at http://127.0.0.1:3000');
});
