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
    getAllLists: function(callback) { //callback 다른 코드의 인수로서 넘겨주는 실행 가능한 코드
        let conn = this.getConnection(); //this라는 걸 써서 내것을 가져옴
        let sql = `SELECT * FROM song ORDER BY sid DESC LIMIT 5;`;
        conn.query(sql, (error, rows, fields) => {
            if (error)
                console.log(error);
            callback(rows);
        });
        conn.end();
    },
    getJoinLists: function(callback) { 
        let conn = this.getConnection(); 
        let sql = `SELECT song.sid, song.title, gg.name, song.lyrics FROM song 
        left JOIN girl_group AS gg
        ON song.sid=gg.hit_song_id
        ORDER BY song.sid desc
        LIMIT 10;`;
        conn.query(sql, (error, rows, fields) => {
            if (error)
                console.log(error);
            callback(rows);
        });
        conn.end();
    },
    insertSong: function(params, callback) {
        let sql = `insert into song(title, lyrics) values(?, ?);`;
        let conn = this.getConnection();
        conn.query(sql, params, function (error, fields) { 
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    },
    deleteSong: function(sid, callback) {
        let sql = `delete from song where sid=?;`;
        let conn = this.getConnection();
        conn.query(sql, sid, function (error, fields) { 
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    },
    getsong: function(sid, callback) {
        let sql = `select * from song where sid=?;`;
        let conn = this.getConnection(); 
        conn.query(sql, sid, function (error, rows, fields) { // 조회 쿼리
            if (error)
                console.log(error);
            callback(rows[0]); //주의할 것 
        });
        conn.end();
    },
    updateSong: function(params, callback) {
        let sql = `update song set title=?,lyrics=? where sid=?;`;
        let conn = this.getConnection();
        conn.query(sql, params, function (error, fields) { 
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    }
}