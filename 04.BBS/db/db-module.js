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
    getBbsList: function(offset, callback) {  // 페이지 지원
        let conn = this.getConnection();
        let sql = `SELECT b.bid, b.uid, u.uname, b.title, b.content, 
                    b.modTime, b.viewCount, b.replyCount
                    FROM bbs AS b
                    JOIN users AS u
                    ON b.uid=u.uid
                    WHERE b.isDeleted=0
                    ORDER BY b.bid DESC 
                    LIMIT 10 offset ?;`;
        conn.query(sql, offset, (error, rows, fields) => {
            if (error)
                console.log(error);
            callback(rows);
        });
        conn.end();
    },
    getSearchList:     function(keyword, callback) { // 검색 리스트?
        let conn = this.getConnection();
        let sql = `SELECT b.bid, b.uid, u.uname, b.title, b.content, 
                    b.modTime, b.viewCount, b.replyCount
                    FROM bbs AS b
                    JOIN users AS u
                    ON b.uid=u.uid
                    WHERE b.isDeleted=0 and b.title like ?
                    ORDER BY b.bid DESC;`;
        conn.query(sql, keyword, (error, rows, fields) => {
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
    userint: function(params, callback) {
        let sql = `insert into users(uid, pwd, uname, tel, email) values(?,?,?,?,?);`;
        let conn = this.getConnection();
        conn.query(sql, params, function (error, fields) { 
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    },
    getJoinLists: function(callback) { 
        let conn = this.getConnection(); 
        let sql = `SELECT bid, title, users.uname, date_format(modTime, '%Y-%m-%d %T') AS modTime, viewCount 
        FROM users AS users
        JOIN bbs AS bbs
        ON users.uid = bbs.uid
        ORDER BY modTime DESC LIMIT 10;`;
        conn.query(sql, (error, rows, fields) => {
            if (error)
                console.log(error);
            callback(rows);
        });
        conn.end();
    },
}