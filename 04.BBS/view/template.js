module.exports = {
    header:  function() {
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <title>My bbs</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="/bootstrap/css/bootstrap.min.css">
        <link rel="stylesheet" href="/fontawesome-free-5.15.1-web/fontawesome-free-5.15.1-web/css/all.css">
        <script src="/jquery/dist/jquery.min.js"></script>
        <script src="/popper/popper.min.js"></script>
        <script src="/bootstrap/js/bootstrap.min.js"></script>
        </head>
        <body>
        `;
    },
    headertow:  function(uname) {
            return `
            <nav class="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
                <a class="navbar-brand" href="#">
                    <img src="https://m.koreaart.ac.kr/images/main/logo.png?ver=201802260903" alt="logo" style="height: 50px;">
                </a>
                <ul class="navbar-nav">
                    <li class="nav-item">
                    <a class="nav-link" href="/bbs"><i class="fas fa-home" style="color: beige;"></i></a></li>

                    <li class="nav-item">
                    <a class="nav-link" href="/bbs/insert">
                    <i class="far fa-edit"></i></a></li>

                    <li class="nav-item">
                        <a class="nav-link" href="/logout">로그아웃</a></li>
                    
                    <li class="nav-item">
                        <a class="nav-link" style="margin-left: 30px;">${uname ? uname : '방문객'}님 반갑습니다</a></li>
                    
                </ul>
                <div class="navbar-collapse collapse w-10 order-3 dual-collapse2">
                    <ul class="navbar-nav ml-auto">
                    <a href="/">
                        <i class="fas fa-cloud-showers-heavy" style="color: beige;">
                        </i></a>
                    </ul>
                </div>
            </nav>
        `;
    },
    footer: function() {
        return `
            <nav class="navbar navbar-expand-sm bg-secondary navbar-light fixed-bottom justify-content-center">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="javascript:void(0)">Copyright ⓒ 2020 Hoseo Institute lf Big Data</a>
                    </li>
                </ul>
            </nav>
        </body>
        </html>
        `;
    }
}