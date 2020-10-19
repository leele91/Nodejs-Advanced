const template = require('./template');

module.exports.viewForm = function (navbar) {
    
    
    return `
        ${template.header()} 
        ${navbar}
                <div class="container-fluid" style="margin-top: 90px">
                    <div class="container">
                        <div class="col-2"></div>
                        <div class="col">
                        <table width ="500">
                        <tr>
                            <td align="left"><h3>${result.title}</h3></td>
                            <td ></td>
                            <td></td>
                            <td align="right"><h3>이름${result.uname}</h3></td>
                            
                        </tr>
                        <tr>
                            <td align="left">글번호:${result.bid}</td>
                            <td align="left">날짜:${result.modTime}</td>
                            <td align="right">조회:${result.viewCount}</td>
                            <td align="right">리플:${result.replyCount}</td>
                        </tr>
                    </table>
                        <hr>

                        <p>내용</p>
                        <p>${result.content}</p>
                        <hr>
                        <form action="writerAction" method="post">
                        <div class="form-grup">
                            댓글
                            <textarea class="form-control" rows="2" id="comment" name="text"></textarea>
                        </div>
                            <button type="submit" style="margin-right: 10px;" class="btn btn-success mt-3">등록</button>
                        </form>
                        <div class="col-2"></div>
                        </div>
                    </div>
                </div>
        ${template.footer()}
    `;
}
