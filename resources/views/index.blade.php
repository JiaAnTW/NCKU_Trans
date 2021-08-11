<!doctype html>
<html lang="zh-Hant-TW" charset="utf-8">
    <head>
        <title>NCKU STUDY・成大學業分享</title>
        <!--setting-->
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="theme-color" content="rgba(254, 218, 106, 1)">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="一個讓成大學生匿名分享各式學業心得的平台。">
        <meta property="og:image" content="https://i.imgur.com/GJawE7A.jpg" />
        <link rel="shortcut icon" href="{{ asset('favicon.ico') }}">
        <link rel="icon" href="{{ asset('favicon.ico') }}">
        <!--CDN plugin-->
        <link href="https://fonts.googleapis.com/css?family=Noto+Sans+TC:100,400,700" rel="stylesheet">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous"/>
        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-QL363EG2WY"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-QL363EG2WY');
        </script>
    </head>
    <body>
        <div id="root"></div>
            <script src="{{ mix('js/manifest.js') }}"></script>
            <script src="{{ mix('js/vendor.js') }}"></script>
            <script src="{{ mix('js/app.js') }}"></script>
    </body>
</html>
