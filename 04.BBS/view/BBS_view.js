const template = require('./template');

module.exports.viewForm = function (navbar, result, replies) {
    let content = result.content.replace(/\n/g, '<br>');
    let cards = '';
    for (let reply of replies) {
        cards += (reply.isMine == 0) ?
            `<div class = "card bg-light text-dark mt-1" style="margin-right:45%;">` :
            `<div class ="card text-right mt-1" style="margin-left:60%;">`;
        cards += `
                    <div class="card-body">
                        ${reply.uname}&nbsp;${reply.regTime}<br>
                        ${reply.content.replace(/\r/g, '<br>')}
                    </div>
                </div>
                `;
    }


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
                                조회: ${result.viewCount + 1}
                                &nbsp;
                                리플: ${result.replyCount}
                            </div>
                        </div>
                        <hr>
                        <p>${content}</p>
                        
                        <div style="text-align: right;">
                            <a href="/bbs/update/${result.bid}/uid/${result.uid}"><i class="far fa-edit"></i></a>&nbsp;
                            <a href="/bbs/delete/${result.bid}/uid/${result.uid}"><i class="fas fa-trash-alt"></i></a>
                        </div>
                        <hr>
                        ${cards}
                        
                        <div class="form-grup">
                            <form class="form-inline" action="/bbs/reply" method="post">
                                    <input type="hidden" name="bid" value ="${result.bid}">
                                    <input type="hidden" name="uid" value ="${result.uid}">
                                댓글
                                    <textarea class="form-control" rows="3" cols="80" id="content" name="content"></textarea>
                                    <button type="submit" style="margin-right: 10px;" class="btn btn-success mt-3">등록</button>
                            </form>
                        </div>
                        <div class="col-2"></div>
                    </div>
                </div>
        ${template.footer()}


        
    `;
}
