
const template = require('./template');

module.exports.register = function () {
    return `
            ${template.header()}
            ${template.headertow()}
            <div class="container-fluid" style="margin-top: 90px">
            <div class="row">
            <div class="col-12">
                <h3>회원 가입</h3>
                <hr>
            </div>
            <div class="col-3"></div>
            <div class="col-6">
                <form action="/user/register" method="post">
                    <table class="table table-borderless">
                        <tr>
                            <td><label for="uid"> 사용자 ID</label></td>
                            <td><input type="text" name="uid" id="uid"></td>
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
                            <td><input type="text" name="uname" id="uname"></td>
                        </tr>
                        <tr>
                            <td><label for="tel">전화번호</label></td>
                            <td><input type="text" name="tel" id="tel"></td>
                        </tr>
                        <tr>
                            <td><label for="email"">e-메일</label></td>
                            <td><input type="email" name="email" id="email"></td>
                        </tr>
                        <tr>
                            <td colspan="2" style="text-align: center;">
                                <button type="submit" class="btn btn-success" onclick="location.href='/login'">가입</button>
								<input class="btn btn-secondary" type="reset" value="취소">
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