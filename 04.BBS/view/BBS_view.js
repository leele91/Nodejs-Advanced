const template = require('./template');

module.exports.viewForm = function (result, navbar) {
    
    
    return `
        ${template.header()} 
        ${navbar}
                <div class="container-fluid" style="margin-top: 90px">
                    <div class="container">
                        <div class="row">
                            <div class="col-10">
                                <h4>제목:${result.title}</h4>
                            </div>
                                <div class="col-2">
                                <h4>이름:${result.uname}</h4>
                            </div>
                            <div class="col-10">
                                글번호: ${result.bid}&nbsp;
                                날짜: ${result.modTime}
                            </div>
                            <div class="col-2">
                                조회: ${result.viewCount}
                                &nbsp;
                                리플: ${result.replyCount}
                            </div>
                        </div>
                        <hr>

                        <p>${result.content}</p>
                        <div style="text-align: right;">
                            <a href="/bbs/update/${result.bid}/uid/${result.uid}"><i class="far fa-edit"></i></a>&nbsp;
                            <a href="/bbs/delete/${result.bid}/uid/${result.uid}"><i class="fas fa-trash-alt"></i></a>
                        </div>
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
