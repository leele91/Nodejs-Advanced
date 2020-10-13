const crypto = require('crypto');

// SHA: sECURE Hash Algorithm 해시를 생성합니다.
let shasum = crypto.createHash('sha256'); // sha256, sha512(알고리즘 생성)
shasum.update('password'); // 암호화를 쓸 평면을 줌 주로 패스워드를 줌
let output = shasum.digest('base64'); // hex(16진수), base64 -> 인코딩 방법

console.log('password:', output);
console.log(output.length);