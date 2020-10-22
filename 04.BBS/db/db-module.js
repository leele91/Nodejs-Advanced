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
    // 페이지에서 isD..값이 0인 것만 표시
    getBbsTotalCount:     function(callback) {
        let conn = this.getConnection();
        let sql = `SELECT count(*) as count FROM bbs where isDeleted=0;`;
        conn.query(sql, (error, results, fields) => {
            if (error)
                console.log(error);
            callback(results[0]);   // 주의할 것
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
        let sql = `select * from users where uid like?;`;
        conn.query(sql, uid, (error, results, fields) => {
            if (error)
                console.log(error);
            callback(results[0]);  // 주의 할 것
        });
        conn.end();
    },
    updateUser: function(params, callback) { 
        let conn = this.getConnection();
        let sql = `update users set pwd=?, uname=?, tel=?, email=? where uid=?;`;
        conn.query(sql, params, (error, fields) => {
            if (error)
                console.log(error);
            callback(); 
        });
        conn.end();
    },

    getbbsInfo: function(bid, callback) {
        let conn = this.getConnection(); 
        let sql = `SELECT b.bid, b.uid, u.uname, b.title, b.content, 
                    DATE_FORMAT(b.modTime, '%Y-%m-%d %T') as modTime, 
                    b.viewCount, b.replyCount
                    FROM bbs AS b
                    JOIN users AS u
                    ON b.uid=u.uid
                    WHERE b.bid=?;`;
        conn.query(sql,bid, (error, result, fields) => {
            if (error)
                console.log(error);
            callback(result[0]);  // 주의 할 것
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
    getJoinLists: function(offset, callback) { 
        let conn = this.getConnection(); 
        let sql = `SELECT b.bid, b.title, u.uname, b.title, b.content,
        DATE_FORMAT(b.modTime, '%Y-%m-%d %T') AS modTime, b.viewCount, b.replyCount
        FROM users AS u
        JOIN bbs AS b
        ON u.uid = b.uid
        WHERE b.isDeleted=0
        ORDER BY b.bid DESC 
        LIMIT 10 OFFSET ?;`;
        conn.query(sql, offset, (error, rows, fields) => {
            if (error)
                console.log(error);
            callback(rows);
        });
        conn.end();
    },

    getbbsview: function(bid, callback) {
        let sql = `SELECT bid, bbs.uid, title, users.uname, bbs.content,
        date_format(modTime, '%Y-%m-%d %T') AS modTime,
        viewCount, replyCount
        from bbs
        JOIN users
        ON bbs.uid = users.uid
        WHERE bbs.bid=?;`;
        let conn = this.getConnection();
        conn.query(sql, bid,(error, rows, fields) => {
            if (error)
                console.log(error);
            callback(rows[0]);
        });
        conn.end();
    },
    insertbbs: function(params, callback) {
        let conn = this.getConnection();
        let sql = `insert into bbs(uid, title, content) values(?, ?, ?);`;
        conn.query(sql, params, (error, fields) => { 
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    },
    deletebbs: function(bid, callback) { 
        let conn = this.getConnection();
        let sql = `update bbs set isDeleted =1 where bid like ?;`;
        conn.query(sql, bid, (error, fields) => {
            if (error)
                console.log(error);
            callback();  // 주의 할 것
        });
        conn.end();
    },
    updatebbs: function(params, callback) {
        let sql = `update bbs set title=?, 
        content=?, modTime=NOW()
        where bid=?;`;
        let conn = this.getConnection();
        conn.query(sql, params, function (error, fields) { 
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    },

    increaseViewCount:  function(bid, callback) { // 조회수
        let conn = this.getConnection();
        let sql = `update bbs set viewCount=viewCount+1 where bid=?;`;
        conn.query(sql, bid, (error, fields) => {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    },

}