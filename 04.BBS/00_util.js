const crypto = require('crypto');
const moment = require('moment');

module.exports ={ // 로그인 패스워드 확인
    generateHash: function(something) {
        let shasum = crypto.createHash('sha256');
        shasum.update(something); 
        return shasum.digest('base64');
    },
    isLoggedIn: function(req, res, next) {
        if (!req.session.uid) {    
            res.redirect('/login');
        } else {
            next();
        }
    },
      // DB에서 읽은 시간을 오늘이면 시간을 어제까지는 날짜를 반환
    getDisplayTime:     function(dt) {
        let today = moment().format('YYYY-MM-DD');
        let dbtime = moment(dt).format('YYYY-MM-DD HH:mm:ss');
        return (dbtime.indexOf(today) == 0) ?
            dbtime.substring(11) : dbtime.substring(0,10);
    }
}
