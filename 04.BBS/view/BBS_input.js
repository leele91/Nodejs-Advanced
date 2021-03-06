const template = require('./template');

module.exports.insert = function (navbar) {
    return `
                ${template.header()}
                ${navbar}
                <div class="container-fluid" style="margin-top: 90px">

                    <div class="container">
                        <div class="col-2"></div>
                        <div class="col">
                            <form action="/bbs/insert" method="post"> 
                                <input type="text" name="title" class="form-control mt-4 mb-2" id="title" placeholder="제목을 입력해주세요">
                                
                                <div class="form-grup">
                                    <textarea class="form-control" rows="10" name="content" id="content" placeholder="내용을 입력해주세요"></textarea>
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
