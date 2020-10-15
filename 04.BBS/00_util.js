const crypto = require('crypto');

module.exports ={
    generateHash: function(something) {
        let shasum = crypto.createHash('sha256');
        shasum.update(something); 
        return shasum.digest('base64');
    }
}