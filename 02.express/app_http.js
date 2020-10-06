const http = require('http');
const url = require('url');
const qs = require('querystring');
const fs = require('fs');
const view = require('./view/index');
const template = require('./view/template');

http.createServer(function (req, res) {
    let pathname = url.parse(req.url).pathname; 
    let query = url.parse(req.url, true).query;
    let body;
    console.log(pathname, query.id) // 확인용
    switch (pathname) {
        case '/': // 초기(홈)화면_초기화면에서는 수정 삭제버튼 작동이 필요없기에 tem.js에서 뺌
            if (query.id === undefined) {
                fs.readdir('data', function (error, filelist) {
                    let list = template.listGen(filelist);
                    let content = template.HOME_CONTENTS; // 텍스트 영역
                    content = content.replace(/\n/g, '<br>')
                    let control = template.buttonGen();
                    let html = view.index('Web 기술', list, content, control); // 웹화면의 탭 부분
                    res.end(html);
                });
            } else { // id(목록)_부분
                fs.readdir('data', function (error, filelist) {
                    let list = template.listGen(filelist);
                    let title = query.id;
                    let control = template.buttonGen(title);
                    let filename = 'data/' + title + '.txt';
                    fs.readFile(filename, 'utf8', (error, buffer) => {
                        buffer=buffer.replace(/\n/g, '<br>')
                        let html = view.index(title, list, buffer, control);
                        res.end(html);
                    });
                });
            }
            break;
        case '/create': // 사용자에게 전송할수있는 입력 폼 생성_텍스트 상자
            fs.readdir('data', function (error, filelist) {
                let list = template.listGen(filelist);
                let content = template.createForm();
                let control = template.buttonGen();
                let html = view.index('글 생성', list, content, control);
                res.end(html);
            });
            break;
        case '/create_proc': // 여기부터 ~
            body = '';
            req.on('data', function (data) {
                body += data;
            })
            req.on('end', function () {
                let param = qs.parse(body); // 여기까지 사용자가 입력한 데이터를 가져옴
                // console.log(param.subject, param.description); // 폼에 있던 이름이 여기로 연결 par~.name
                let filepath = 'data/' + param.subject + '.txt';
                fs.writeFile(filepath, param.description, error => {
                    res.writeHead(302, { 'Location': `/?id=${param.subject}` }); // 방금 집어넣었던 pa~.su~ct로 보내주는것
                    res.end();
                })
            });
            break;
        case '/delete':
            fs.readdir('data', function (error, filelist) {
                let list = template.listGen(filelist);
                let content = template.deleteForm(query.id); // qu.id를 통해 화면에 제목이 나옴
                let control = template.buttonGen();
                let html = view.index('글 삭제', list, content, control);
                res.end(html);
            });
            break;
        case '/delete_proc': { // 여기부터 ~ 추가
            body = '';
            req.on('data', function (data) {
                body += data;
            })
            req.on('end', function () {
                let param = qs.parse(body); // 여기까지 사용자가 입력한 데이터를 가져옴
                let filepath = 'data/' + param.subject + '.txt';
                fs.unlink(filepath, error => {
                    res.writeHead(302, { 'Location': '/' });
                    res.end();
                });
            });
        }
            break;
        case '/update':    // 수정폼 초기 화면시작_폼(데이터 가져오는것)
            fs.readdir('data', function (error, filelist) {
                let list = template.listGen(filelist);
                let title = query.id;
                let control = template.buttonGen();
                let filename = 'data/' + title + '.txt';
                fs.readFile(filename, 'utf8', (error, buffer) => {
                    let content = template.updateForm(title, buffer);
                    let html = view.index(`${title}수정`, list, content, control);
                    res.end(html);
                });
            });
            break;
        case '/update_proc': // 수정 후 전송 폼
            body = '';
            req.on('data', function (data) {
                body += data;
            })
            req.on('end', function () {
                let param = qs.parse(body); // 여기까지 사용자가 입력한 데이터를 가져옴
                // console.log(param.original, param.subject, param.description); // 폼에 있던 이름이 여기로 연결 par~.name
                let filepath = 'data/' + param.original + '.txt';
                fs.writeFile(filepath, param.description, error => {
                    if (param.original !== param.subject) {
                        fs.rename(filepath, `data/${param.subject}.txt`, error =>{
                            res.writeHead(302, {'Location': `/?id=${param.subject}`});
                        res.end();
                        });
                    } else {
                        res.writeHead(302, { 'Location': `/?id=${param.subject}` });
                        res.end();
                    }
                });
            });
            break;
        default:
            res.writeHead(404);
            res.end();
    }
}).listen(3000, () => {
    console.log('Server Running at http://localhost:3000')
});