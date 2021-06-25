<html>

    <head>
    <meta charset="utf-8">
        <title>@yield('title')</title>
        <link rel="icon" href="{{ asset('img/senutiaLink.png') }}">
        <link rel="stylesheet" href="{{ asset('css/access.css') }}">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@500&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="{{ asset('js/access.js') }}" defer></script>
        @yield('head')
    </head>

    <body>

        <nav>
            <div id="logo">
                <img src="{{ asset('img/logo.png') }}" alt="">
            </div>
    
            <div id="links">
                <a href="{{ url('home') }}">
                    Home
                </a>
                <a href="{{ url('explore') }}">
                    Esplora
                </a>
            </div>
        </nav>
    
        <section>
            @yield('content')
        </section>

        <section id="infoView" class="hidden">
            <div class="modalWindow">
                <p id="infoTitle">Info utili</p>
                <p><strong>Autore:</strong> Matteo Casabene</p>
                <p><strong>Matricola:</strong> O46002216</p>
                <p><strong>Anno Accademico:</strong> 2020/2021</p>
                <p><strong>Università:</strong> Università degli Studi di Catania</p>
                <p id="closeInfo">Chiudi</p>
            </div>
        </section>

        <footer>
            <div>
                <img src="{{ asset('img/footer.png') }}" alt="">
            </div>

            <div>
                <p id="infoButton">
                    Info
                </p>
            </div>
        </footer>

    </body>

</html>