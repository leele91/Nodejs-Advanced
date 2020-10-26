const template = require('./template');
const ut = require('../00_util')

module.exports.bblistForm = function ( data, navbar, pageNo, startPage, endPage, totalPage) {
    let tablebbsist = '';
    for (let row of data) {
        let displayTime = ut.getDisplayTime(row.modTime);
        let title = (row.replyCount == 0) ? row.title :
            `${row.title}<span class="text-danger">[${row.replyCount}]</span>`;
        tablebbsist += `<tr><td>${row.bid}</td>
                            <td><a href="/bbs/bid/${row.bid}"><strong>${title}</strong></a></td>
                            <td>${row.uname}</td>
                            <td>${displayTime}</td>
                            <td>${row.viewCount}</td>
                        </tr>
        `;
    }
    // 페이지 지원
    let leftPage = (pageNo > 10) ? `/bbs/list/${Math.floor(pageNo/10) * 10}` : '#';
    let pages = `<li class="page-item">
                    <a class="page-link active" href="${leftPage}" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span></a>
                </li>`;
    for (let page = startPage; page <= endPage; page++) {
        if (page === pageNo)
            pages += `<li class="page-item active" aria-current="page">
                        <span class="page-link">
                            ${page}<span class="sr-only">(current)</span>
                        </span>
                    </li>`;
        else
            pages += `<li class="page-item"><a class="page-link" href="/bbs/list/${page}">${page}</a></li>`;
    }
    let rightPage = (endPage < totalPage) ? `/bbs/list/${Math.ceil(pageNo/10)*10 + 1}` : '#';
    pages += `<li class="page-item">
                <a class="page-link" href="${rightPage}" aria-label="Next">
                <span aria-hidden="true">&raquo;</span></a>
            </li>`;

    return `
        ${template.header()} 
        ${navbar}
    <div class="container-fluid" style="margin-top: 90px">
        <div class="row">
            <div class="col-2">
                <hr>
            </div>
            <div class="col-8">
                <form action="/bba/list" method="post">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th style="padding-right: 20px">번호</th>
                                <th style="padding-right: 20px">제목</th>
                                <th style="padding-right: 20px">글쓴이</th>
                                <th style="padding-right: 20px">날짜</th>
                                <th style="padding-right: 20px">조회수</th>
                            </tr>
                        </thead>
                        ${tablebbsist}
                    </table>
                </form>
            </div>
            <div class="col-2"></div>
        </div>
            <ul class="pagination justify-content-center">
                ${pages}
            </ul>
    </div>
    
        ${template.footer()}
    `;
}