const mysql = require('mysql');
const fs =require('fs')
let info =fs.readFileSync('./mysql.json', 'utf8');
let connInfo = JSON.parse(info);

let conn = mysql.createConnection ({
    host : connInfo.host,
    user: connInfo.user,
    password: connInfo.password,
    database :connInfo.database,
    port: connInfo.port
});
conn.connect();

let sql = `SELECT c.Continent AS continent,
        c.Name AS newName ,j.Name AS newwName,
        j.Population AS population 
        FROM citycopy AS j
        JOIN country AS c
        ON c.Code = j.CountryCode
        WHERE c.Continent = 'Asia'
        ORDER BY j.Population DESC
        LIMIT 10;`;
conn.query(sql, function(error, rows, fields) {
    if (error)
        console.log(error);
    for (let row of rows) {
        console.log(row.continent, row.newName, row.newwName, row.population);
    }
});

conn.end();