const fs =  require('fs');
const mysql = require('mysql');
// 읽는 것 
let info = fs.readFileSync('./mysql.json', 'utf8');
let config = JSON.parse(info);
// 그때 그때 새로운 콘으로 만드는것
module.exports ={
    getConnection: function() {  
        let conn = mysql.createConnection({
            host: config.host,
            user: config.user,
            password: config.password,
            database: config.database,
            port: config.port
        });
        conn.connect(function(err) {
            if (err) 
                console.log('mysql connection error :' + err);
        });
        return conn;
    },
    userint: function(params, callback) {
        let sql = `insert into users(uid, pwd, uname, tel, email) values(?,?,?,?,?);`;
        let conn = this.getConnection();
        conn.query(sql, params, function (error, fields) { 
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    
    }
}