const template = require('./template');

module.exports.update = function (navbar, result) {
    return `
                ${template.header()}
                ${navbar}
                <div class="container-fluid" style="margin-top: 90px">

                    <div class="container">
                        <div class="col-2"></div>
                        <div class="col">
                            <form action="/bbs/update" method="post"> 
                                <input type="hidden" name="bid" value="${result.bid}">
                                <input type="text" name="title" class="form-control mt-4 mb-2" id="title" value ="${result.title}">
                                
                                <div class="form-grup">
                                    <textarea class="form-control" rows="10" name="content" id="content">${result.content}"</textarea>
                                </div>
                                
                                <button type="submit" class="btn btn-success mt-3">등록</button>
                            </form>
                            <div class="col-2"></div>
                        </div>
                    </div>
                </div>
    
        ${template.footer()}
    `;
}
