const express = require('express');
const bodyParser = require('body-parser'); // body모듈 설치후 사용가능
//const multipart = require('connect-multiparty');
const multer = require('multer'); // 파일 업로드를 위해 사용함
const fs =  require('fs');
const util = require('util');
const { error } = require('console');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
//app.use((multipart({uploadDir: __dirname + '/public/upload'})));
var upload = multer({dest: __dirname +'/public/upload'});

app.get('/', (req, res) => {
    fs.readFile('10.fileuploadform.html', 'utf8', (error, data) => {
        res.send(data);
    });
});
app.post('/', upload.single('userfile'), (req, res) => {
    let comment = req.body.comment;
    console.log(req.files)
    let filename = req.files.image.name;
    let filetype = req.files.image.type;
    let uploadPath = req.files.image.path;

    /* console.log(req.files); */
    /* console.log(filename, filetype);
    console.log(uploadPath); */

    // 받은 파일이 이미지면 이름을 변경하고, 아니면 제거
    if (filetype.indexOf('image') >= 0) { // html name 영역
        let outputName = comment + filename;
        let newFileName =  __dirname + '/pubilc/upload/' + outputName;
        fs.rename(uploadPath,newFileName, err => {
            if (error)
            console.log(error);
            res.status(400).send(`<h11></h1>`); */
        });
    } else {

    }
    
});

app.listen(3000, () => {
    util.log('Server running at http://127.0.0.1:3000');
});