
const template = require('./template');

module.exports.updateForm = function (navbar, result ) {
    return `
            ${template.header()}
            ${navbar}
            <div class="container-fluid" style="margin-top: 90px">
            <div class="row">
            <div class="col-12">
                <h3>회원 정보 수정</h3>
                <hr>
            </div>
            <div class="col-3"></div>
            <div class="col-6">
                <form action="/user/update" method="post">
                <input type="hidden" name="uid" value ="${result.uid}">
                <input type="hidden" name="pwdHash" value ="${result.pwd}">
                    <table>
                        <tr>
                            <td><label for="uid"> 사용자 ID</label></td>
                            <td><span id="uid" >${result.uid}</span></td>
                        </tr>
                        <tr>
                            <td><label for="pwd">패스워드</label></td>
                            <td><input type="password" name="pwd" id="pwd"></td>
                        </tr>
                        <tr>
                            <td><label for="pwd2">패스워드 확인</label></td>
                            <td><input type="password" name="pwd2" id="pwd2"></td>
                        </tr>
                        <tr>
                            <td><label for="uname">이름</label></td>
                            <td><input type="text" name="uname" id="uname" value ="${result.uname}"></td>
                        </tr>
                        <tr>
                            <td><label for="tel">전화번호</label></td>
                            <td><input type="text" name="tel" id="tel" value ="${result.tel}"></td>
                        </tr>
                        <tr>
                            <td><label for="email"">e-메일</label></td>
                            <td><input type="email" name="email" id="email" value ="${result.email}"></td>
                        </tr>
                        <tr>
                            <td colspan="2" style="text-align: center;">
                                <input class="btn btn-primary" type="submit" value="제출">
								<button type="submit" class="btn btn-secondary" onclick="location.href='/user/uid/${result.uid}'">취소</button>
                            </td>
                        </tr>
                    </table>
                </form>
            </div>
            <div class="col-3"></div>
        </div>
            </div>
                ${template.footer()}
    `;
}