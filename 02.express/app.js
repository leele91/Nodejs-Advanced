const express = require('express');
const bodyParser = require('body-parser'); // body모듈 설치후 사용가능
const fs = require('fs');
const util = require('util');
const view = require('./view/index');
const template = require('./view/template');
const { encode } = require('punycode');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
// lo..:300/
app.get('/', (req, res) => {
    fs.readdir('data', function (error, filelist) {
        let list = template.listGen(filelist);
        let content = template.HOME_CONTENTS; // 텍스트 영역
        content = content.replace(/\n/g, '<br>')
        let control = template.buttonGen();
        let html = view.index('Web 기술', list, content, control); // 웹화면의 탭 부분
        res.send(html); // express는 send
    });
});

app.get('/id/:id', (req, res) => {
    fs.readdir('data', function (error, filelist) {
        let list = template.listGen(filelist);
        let title = req.params.id;
        let control = template.buttonGen(title);
        let filename = 'data/' + title + '.txt';
        fs.readFile(filename, 'utf8', (error, buffer) => {
            buffer = buffer.replace(/\n/g, '<br>')
            let html = view.index(title, list, buffer, control);
            res.send(html);
        });
    });
});

app.get('/create', (req, res) => { // 글을 보여주는 영역
    fs.readdir('data', function (error, filelist) {
        let list = template.listGen(filelist);
        let content = template.createForm();
        let control = template.buttonGen();
        let html = view.index('글 생성', list, content, control);
        res.send(html);
    });
});


app.post('/create', (req, res) => { // 추가 부분
    let subject = req.body.subject;
    let description = req.body.description // 여기까지 사용자가 입력한 데이터를 가져옴
    // console.log(subject, description);     폼에 있던 이름이 여기로 연결 par~.name
    let filepath = 'data/' + subject + '.txt';
    fs.writeFile(filepath, description, error => {
        let encoded = encodeURI(`/id/${subject}`);
        console.log(encoded);
        res.status(302).redirect(encoded)
    });
});


app.get('/delete/id/:id', (req, res) => {
    fs.readdir('data', function (error, filelist) {
        let list = template.listGen(filelist);
        let content = template.deleteForm(req.params.id); 
        let control = template.buttonGen();
        let html = view.index('글 삭제', list, content, control);
        res.send(html);
    });
});

app.post('/delete', (req, res) => {
    let filepath = 'data/' + req.body.subject + '.txt';
    fs.unlink(filepath, error => {
        res.redirect('/')
    });
});

app.get('/update/id/:id', (req, res) => {
    fs.readdir('data', function (error, filelist) {
        let list = template.listGen(filelist);
        let title = req.params.id;
        let control = template.buttonGen();
        let filename = 'data/' + title + '.txt';
        fs.readFile(filename, 'utf8', (error, buffer) => {
            let content = template.updateForm(title, buffer);
            let html = view.index(`${title}수정`, list, content, control);
            res.end(html);
        });
    });
});

app.post('/update', (req, res) => {
    let original = req.body.original;
    let subject = req.body.subject;
    let description = req.body.description;
    let filepath = 'data/' + original + '.txt';
    fs.writeFile(filepath, description, error => {
        if (original !== subject) {
            fs.renameSync(filepath, `data/${subject}.txt`);
        }
        res.redirect(`/id/${subject}`);
    });
});

app.get('*', (req, res) => {
    res.status(404).send('Path not found');
});

app.listen(3000, () => {
    util.log('Server Running at http://127.0.0.1:3000');
});