const template = require('./template');
const ut = require('../00_util')

module.exports.bblistForm = function (data, navbar, pageNo, totalPage) {
    let tablebbsist = '';
    for (let row of data) {
        tablebbsist += `<tr><td>${row.bid}</td>
                            <td><a href="/bbs/bid/${row.bid}">${row.title}</a></td>
                            <td>${row.uname}</td>
                            <td>${row.modTime}</td>
                            <td>${row.viewCount}</td>
                        </tr>
        `;
    }
    // 페이지 지원
    let pages = `<li class="page-item disabled">
                    <a class="page-link active" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span></a>
                </li>`;
    for (let page=1; page <= totalPage; page++) {
        if (page === pageNo)
        pages += `<li class="page-item active" aria-current="page">
            <span class="page-link">
                ${page}<span class="sr-only">(current)</span>
            </span>
        </li>`;
        else
        pages += `<li class="page-item"><a class="page-link" href="/bbs/${page}">${page}</a></li>`;
        }
        pages += `<li class="page-item">
        <a class="page-link" href="#" aria-label="Next">
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
                <form action="/bba/bblist" method="post">
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
    </div>
    
        ${template.footer()}
    `;
}