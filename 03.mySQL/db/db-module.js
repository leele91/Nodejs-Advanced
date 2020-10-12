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
            port: config.port,
            dateStrings: 'date'
        });
        conn.connect(function(err) {
            if (err) 
                console.log('mysql connection error :' + err);
        });
        return conn;
    },
    getAllLists: function(callback) { //callback 다른 코드의 인수로서 넘겨주는 실행 가능한 코드
        let conn = this.getConnection(); //this라는 걸 써서 내것을 가져옴
        let sql = `SELECT * FROM girl_group
        ORDER BY ggid desc
        LIMIT 10;`;
        conn.query(sql, (error, rows, fields) => {
            if (error)
                console.log(error);
            callback(rows);
        });
        conn.end();
    },
    insertSong: function(params, callback) {
        let sql = `insert into girl_group(name, debut) values(?, ?);`;
        let conn = this.getConnection();
        conn.query(sql, params, function (error, fields) { 
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    },
    deleteSong: function(ggid, callback) {
        let sql = `delete from girl_group where ggid=?;`;
        let conn = this.getConnection();
        conn.query(sql, ggid, function (error, fields) { 
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    },
    getsong: function(ggid, callback) {
        let sql = `select * from girl_group where ggid=?;`;
        let conn = this.getConnection(); 
        conn.query(sql, ggid, function (error, rows, fields) { // 조회 쿼리
            if (error)
                console.log(error);
            callback(rows[0]); //주의할 것 
        });
        conn.end();
    },
    updateSong: function(params, callback) {
        let sql = `update girl_group set name=?,debut=? where ggid=?;`;
        let conn = this.getConnection();
        conn.query(sql, params, function (error, fields) { 
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    }
}