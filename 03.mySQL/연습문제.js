/*  문제 1.
SELECT * FROM girl_group 
WHERE debut BETWEEN '2009-01-01' AND '2009-12-31'*/

// 강사님 답안지
/* let sql = `SELECT NAME, DATE_FORMAT(debut, '%Y-%m-%d') AS debutDate
FROM girl_group WHERE debut BETWEEN '2009-01-01' AND '2009-12-31'
ORDER BY DEBUT;`;
conn.query(sql, function(error, rows, fields) {
    if (error)
        console.log(error);
    for (let row of rows) {
        console.log(row.NAME, row.debutDate);  */

/* 문제 2 
SELECT l.name, l.debut, r.title
	FROM girl_group AS l
	inner JOIN song AS r
    ON l.hit_song_id = r.sid; */

    // 강사님이 하신것 
    /* SELECT g.name,
	date_format(g.debut, '%Y-%m-%d') AS debutDate,
	s.title AS songTitle
	FROM girl_group AS g
	JOIN song AS s ON s.sid = g.hit_song_id
	WHERE debut BETWEEN '2009-01-01' AND '2009-12-31'
	ORDER BY debut; */
    
/* 문제 3 대륙별로 국가숫자, GNP의 합, 평균 국가별 GNP는?
SELECT continent, COUNT(*) AS countCont,
	round(SUM(GNP)) AS sumcont, round(AVG(GNP)) AS avgCont
	FROM country
    GROUP BY continent;

let sql = `SELECT continent, COUNT(*) AS ccountCont,
    round(SUM(GNP)) AS sumcont, round(AVG(GNP)) AS avgCont
    FROM country
    GROUP BY continent;`;
    conn.query(sql, function(error, rows, fields) {
    if (error)
        console.log(error);
    for (let row of rows) {
        console.log(row.continent, row.ccountCont, row.sumcont, row.avgCont);
    }
});

conn.end();
    */

/* 문제 4 /아시아 대륙에서 인구가 가장 많은 도시 10개를 내림차순으로 보여줄 것
(대륙명, 국가명, 도시명, 인구수)

SELECT c.Continent AS continent,
	c.Name AS newName ,j.Name AS newwName,
	j.Population AS population 
	FROM citycopy AS j
	JOIN country AS c
	ON c.Code = j.CountryCode
	WHERE c.Continent = 'Asia'
	ORDER BY j.Population DESC
    LIMIT 10; */
    
/* 문제 5전 세계에서 인구가 가장 많은 10개 도시에서 사용하는 공식언어는?
(도시명, 인구수, 언어명)]

SELECT j.Name AS newname, j.Population AS popula, c.`Language` AS lang
	FROM countrylanguage AS c
	JOIN citycopy AS j
	ON j.CountryCode = c.CountryCode
	WHERE c.IsOfficial= 'T'
	ORDER BY population DESC 
	LIMIT 10; */