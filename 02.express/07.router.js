// 모듈을 추출합니다.
const express = require('express');
const util = require('util');
const shoppingRouter = require('./07.shopping');

// 서버를 생성합니다.
const app = express();
app.use(express.static(__dirname + '/public'));


let customerRouter = express.Router();
app.use('/shopping', shoppingRouter);
app.use('/customer', customerRouter);

app.get('/', function (req, res) { 
    res.send('<h1>Root Router</h1>');
});
customerRouter.get('/', function (req, res) {
    res.send('<h1>Customer Router</h1>');
});
customerRouter.get('/index', function (req, res) {
    res.send('<h1>Customer Router</h1>');
});

app.get('*', (req, res) => {
    res.status(404).send('Path not found');
});
//app.post(); 

app.listen(3000, () => {
    util.log('Server Running at http://127.0.0.1:3000');
});