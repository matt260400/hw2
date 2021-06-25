<html>
    <head>
        <meta charset="utf-8">
        <title>Senutia - Home</title>
        <link rel="icon" href="{{ asset('img/senutiaLink.png') }}">
        <link rel="stylesheet" href="{{ asset('css/home.css') }}">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@500&display=swap" rel="stylesheet">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="{{ asset('js/home.js') }}" defer></script>
    </head>

    <body>
        <header>
            <div id ="overlay"></div>
            <nav>
                <div id="logo">
                    <img src="{{ asset('img/logo.png') }}" alt="">
                </div>

                <div id="links">
                    <a href="{{ url('home') }}">Home</a>
                    <a href="{{ url('explore') }}">Esplora</a>
                    <a href="{{ url('login') }}" class="button">
                       <img src="{{ asset('img/profile.png') }}" alt=""> 
                    </a>
                </div>

                <div id="menu">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                
            </nav>

            <div id="presentation">
                <h1>
                    La tua musica, ovunque
                </h1>
                <a href="{{ url('explore') }}">Registrati ed esplora</a>
            </div>
        </header>

        <section>
            <div class="videoText">
                <div class="video">
                    <video video width="816" height="459" muted loop autoplay>
                        <source src="{{ asset('video/paginaPrincipale.mp4') }}" type="video/mp4">
                    </video>
                </div>
                <div class="description">
                    <h1>
                        Esplora
                    </h1>
                    <p>
                        Naviga all'interno della tua homepage personalizzata, dove puoi trovare una selezione di artisti e brani scelti a posta per te!
                    </p>
                </div>
            </div>

            <div class="line"></div>

            <div class="videoText inverse">
                <div class="video">
                    <video video width="816" height="459" muted loop autoplay>
                        <source src="{{ asset('video/ricerca.mp4') }}" type="video/mp4">
                    </video>
                </div>
                <div class="description">
                    <h1>
                        Cerca
                    </h1>
                    <p>
                        All'interno del sito puoi cercare i tuoi artisti, album e brani preferiti.
                    </p>
                </div>
            </div>

            <div class="line"></div>

            <div class="videoText">
                <div class="video">
                    <video video width="816" height="459" muted loop autoplay>
                        <source src="{{ asset('video/gestioneLike.mp4') }}" type="video/mp4">
                    </video>
                </div>
                <div class="description">
                    <h1>
                        Preferiti
                    </h1>
                    <p>
                        Aggiungi i tuoi artisti ai preferiti per personalizzare la tua homepage.
                        I brani che più ti piacciono potranno essere aggiunti ai preferiti, in modo tale da non perderli mai di vista!
                    </p>
                </div>
            </div>

            <div class="line"></div>

            <div class="videoText inverse">
                <div class="video">
                    <video video width="816" height="459" muted loop autoplay>
                        <source src="{{ asset('video/paginaPreferiti.mp4') }}" type="video/mp4">
                    </video>
                </div>
                <div class="description">
                    <h1>
                        Pagina dei preferiti
                    </h1>
                    <p>
                        Visualizza e gestisci comodamente i tuoi preferiti, in un'unica pagina!
                    </p>
                </div>
            </div>

            <div class="line"></div>

            <div class="videoText">
                <div class="video">
                    <video video width="816" height="459" muted loop autoplay>
                        <source src="{{ asset('video/paginaTesto.mp4') }}" type="video/mp4">
                    </video>
                </div>
                <div class="description">
                    <h1>
                        Testi, informazioni e... ascolto!
                    </h1>
                    <p>
                        Clicca sul link di Senutia® per ascoltare i brani cercati - o preferiti - e ottenere informazioni su di essi e i loro testi.
                        <p class="disclaimer">
                            La disponibilità può variare in base ai brani.
                        </p>
                    </p>
                </div>
            </div>

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
        
        <div class="scrollToTop">
            <img src="img/scroll_top.png" alt="">
        </div>
    </body>

</html>