const fs =  require('fs');
const mysql = require('mysql');
let info = fs.readFileSync('./mysql.json', 'utf8');
let config = JSON.parse(info);

module.exports ={
    getConnection: function() {  
        let conn = mysql.createConnection ({ 
            host : config.host,
            user: config.user,
            password: config.password,
            database :config.database,
            port: config.port
        });
    conn.connect(function(err) {
        if (err) 
            console.log('mysql connection error :' + err);
    });
    return conn;
},
    getusersinit: function(params, callback) {
        conn.connect();
        let sql = `insert into users(uid, pwd, uname, tel, email) values(?,?,?,?,?);`;
        conn.query(sql, params, function(error, fields) { 
            if (error)
                console.log(error);
            });
        conn.end();
    }

/* 
let sql = `select * from users where uid like ?`;
conn.query(sql, uid, function(error, results, fields) { 
    if (error)
        console.log(error);
    let result = results[0];
    if (result.pwd === pwdHash) { //db에서 가져온 패스워드랑 사용자가 가져온 패스워드랑 비교
        console.log('login 성공');
    } else {
        console.log('Login 실패 :패스워드가 다릅니다.');
    }
});

conn.end();
 */