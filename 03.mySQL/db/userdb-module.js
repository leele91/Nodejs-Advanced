const fs =  require('fs');
const mysql = require('mysql');
let info = fs.readFileSync('./mysql.json', 'utf8');
let config = JSON.parse(info);

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
    getAllLists: function(callback) { 
        let conn = this.getConnection(); 
        let sql = `SELECT uid, uname, date_format(regDate, '%Y-%m-%d %T') as regDate
                    FROM users WHERE isDeleted=0
                    ORDER BY regDate LIMIT 10;`;
        conn.query(sql, (error, rows, fields) => {
            if (error)
                console.log(error);
            callback(rows);
        });
        conn.end();
    },
    getUserInfo: function(uid, callback) {
        let conn = this.getConnection(); 
        let sql = `select * from users where uid like ?;`;
        conn.query(sql,uid, (error, results, fields) => {
            if (error)
                console.log(error);
            callback(results[0]);  // 주의 할 것
        });
        conn.end();
    },
    /* generateHash: function(something) {
        let shasum = crypto.createHash('sha256');
        shasum.update(something); 
        return shasum.digest('base64');
    }, */
    deleteUser: function(uid, callback) { 
        let conn = this.getConnection();
        let sql = `update users set isDeleted =1 where uid like?;`;
        conn.query(sql, uid, (error, fields) => {
            if (error)
                console.log(error);
            callback();  // 주의 할 것
        });
        conn.end();
    },
    updateUser: function(params, callback) { 
        let conn = this.getConnection();
        let sql = `update users set pwd=? where uid like?;`;
        conn.query(sql, params, (error, fields) => {
            if (error)
                console.log(error);
            callback(); 
        });
        conn.end();
    }
}