const fs = require('fs');
const mysql = require('mysql');
let info = fs.readFileSync('../mysql.json', 'utf8');
let config = JSON.parse(info);

function getConnection () {  
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
}




    /* conn.connect(); */

    let sql = `create table if not exists reply (
	rid int NOT NULL PRIMARY KEY DEFAULT auto_increment,
	bid int NOT NULL,
	uid VARCHAR(20) NOT NULL,
	content VARCHAR(100),
	regTime DATETIME DEFAULT current_timestamp,
	isMine int DEFAULT 0
    );`;
    let conn = getConnection();
    conn.query(sql, function(error, fields) {
    if (error)
        console.log(error);
    });
    conn.end();
        

/* let sql = `insert into users(uid, pwd, uname, tel, email) values(?,?,?,?,?);`;
conn.query(sql, params, function(error, fields) { // 받는 데이터가 없기에 row를 안씀
    if (error)
        console.log(error);
});  */

/*  let sql = `SELECT song.sid, song.title, gg.name, song.lyrics FROM song 
        left JOIN girl_group AS gg
        ON song.sid=gg.hit_song_id
        ORDER BY song.sid desc
        LIMIT 10;`;
        conn.query(sql, (error, rows, fields) => {
            if (error)
                console.log(error);
            callback(rows);
        });
        conn.end(); */


    
/*     let sql = `select * from song where sid=?;`;
    let conn = this.getConnection(); 
    conn.query(sql, 121, function (error, rows, fields) { 
        if (error)
            console.log(error);
        console.log(rows[0]);
    });
    conn.end(); */

/* let sql = `delete from song where sid=?;`;
        let conn = this.getConnection();
        conn.query(sql, 121, function (error, fields) { 
            if (error)
                console.log(error);
            callback();
        });
        conn.end(); */
