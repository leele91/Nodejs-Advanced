
const template = require('./template');

module.exports.userview = function (result) {
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
                <form action="/user/information" method="post">
                        <tr>
                            <td>사용자 ID</td>
                            <td>${result.uid}</td>
                        </tr>
                        <tr>
                            <td>패스워드</td>
                            <td>${result.pwd}</td>
                        </tr>
                        <tr>
                            <td>패스워드 확인</td>
                            <td>${result.pwd}</td>
                        </tr>
                        <tr>
                            <td>이름</td>
                            <td>${result.uname}</td>
                        </tr>
                        <tr>
                            <td>전화번호</td>
                            <td>${result.tel}</td>
                        </tr>
                        <tr>
                            <td>e-메일</td>
                            <td>${result.email}</td>
                        </tr>
                        <tr>
                            <td colspan="2" style="text-align: center;">
                                <input class="btn btn-primary" type="submit" value="제출">
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