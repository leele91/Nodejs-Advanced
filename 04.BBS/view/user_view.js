
const template = require('./template');

module.exports.userview = function (navbar, result) {
    return `
            ${template.header()}
            ${navbar}
            <div class="container-fluid" style="margin-top: 90px">
            <div class="row">
            <div class="col-12">
                <h3>회원 정보</h3>
                <hr>
            </div>
            <div class="col-3"></div>
            <div class="col-6">
                    <table>
                        <tr>
                            <td>사용자 ID</td>
                            <td>${result.uid}</td>
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
                                <button type="submit" class="btn btn-info" onclick="location.href='/user/update/${result.uid}'">수정</button>
                                <button type="submit" class="btn btn-secondary" onclick="location.href='/user/list/1'">취소</button>
                                <button type="submit" class="btn btn-danger" onclick="location.href='/user/delete/${result.uid}'">삭제</button>
                            </td>
                        </tr>
                    </table>
            </div>
            <div class="col-3"></div>
        </div>
            </div>
                ${template.footer()}
    `;
}