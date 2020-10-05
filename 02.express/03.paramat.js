// 모듈을 추출합니다.
const express = require('express');
const util = require('util'); 

// 서버를 생성합니다.
const app = express();

// localhost:3000/query?id=kim
app.get('/query', function(req, res) { 
    let id = req.query.id;
    res.send(`<h1> id - ${id}`); // 사용자한테 다시 돌려보낼때 
}); 
// localhost:3000/rest/id/kim
app.get('/rest/id/:id', function(req, res) { 
    let id =req.params.id; // kim이라는 값을 id에 가져옴
    res.send(`<h1> id - ${id}`);
}); 
// localhost:3000/rest2/kim
app.get('/rest2/:id', function(req, res) { 
    let id =req.params.id; 
    res.send(`<h1> id - ${id}`);
}); 

app.get('*', (req, res) =>{ // 내가 지정한 주소 외가 오면 에러메세지 
    res.status(404).send('Path not found'); //  res.status(404).메소드 체이닝
});
//app.post(); 

app.listen(3000, () => {
    util.log('Server Running at http://127.0.0.1:3000');
});