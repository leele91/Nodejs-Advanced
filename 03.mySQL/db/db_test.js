const fs =  require('fs');
const mysql = require('mysql');
let info = fs.readFileSync('./mysql.json', 'utf8');
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


    
/*     let sql = `select * from song where sid=?;`;
    let conn = this.getConnection(); 
    conn.query(sql, 121, function (error, rows, fields) { 
        if (error)
            console.log(error);
        console.log(rows[0]);
    });
    conn.end(); */


/*        let sql = `delete from song where sid=?;`;
        let conn = this.getConnection();
        conn.query(sql, 121, function (error, fields) { 
            if (error)
                console.log(error);
            callback();
        });
        conn.end();