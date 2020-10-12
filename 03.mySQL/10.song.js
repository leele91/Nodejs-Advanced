const express = require('express');
const bodyParser = require('body-parser'); // body모듈 설치후 사용가능
const fs =  require('fs');
const util = require('util');
const mysql = require('mysql');
let info = fs.readFileSync('./mysql.json', 'utf8');
let config = JSON.parse(info);


const app = express();
app.use(bodyParser.urlencoded({extended: false}));

function getConnection() {  // 그때 그때 새로운 콘으로 만드는것
    let conn = mysql.createConnection({
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database,
        port: config.port
    });

    conn.connect(function(err) {
        if (err) {
            console.log('mysql connection error :' + err);
        }
    });
    return conn;
}

app.get('/', (req, res) => { 
    let conn = getConnection();
    let sql = `SELECT * FROM song ORDER BY sid DESC LIMIT 5;`;
    conn.query(sql, (error, rows, fields) => {
        if (error)
        console.log(error);
        let html = fs.readFileSync('10.list.html', 'utf8');
            for(let row of rows) {
                html += `<tr><td>${row.sid}</td>
                            <td>${row.title}</td>
                            <td>${row.lyrics}</td>
                        </tr>`;
            }
            html +=` </table>  
                </body>
                </html>`;
            res.end(html);
    });
    conn.end();
});

app.get('/insert', (req, res) => {
    fs.readFile('10.song.html', 'utf8', (error, data) => {
        res.send(data);
    });
});

app.post('/insert', (req, res)=> { 
    let title = req.body.title;
    let lyrics = req.body.lyrics;
    let sql = `insert into song(title, lyrics) values(?, ?);`;
    let params = [title,lyrics];
    let conn = getConnection();
    conn.query(sql, params, function (error, fields) { 
        if (error)
            console.log(error);
            res.redirect('/');
    });
    conn.end();
});

app.listen(3000, () => {
    util.log('Server running at http://127.0.0.1:3000');
});
