const mysql = require('mysql');
const fs =require('fs')
let info =fs.readFileSync('./mysql.json', 'utf8');
let config = JSON.parse(info);
let conn = mysql.createConnection ({ // mysql을 nodejs에서 사용하기 위한 설정
    host : config.host,
    user: config.user,
    password: config.password,
    database :config.database,
    port: config.port
});
conn.connect();
 // Dynamite를 쓰지말고 파라메타로 넣어야함
let sql = `insert into song(title, lyrics) values('Dynamite', 
'Cos ah ah I’m in the stars tonight');`;
conn.query(sql, function(error, fields) { // 받는 데이터가 없기에 row를 안씀
    if (error)
        console.log(error);
});

conn.end();