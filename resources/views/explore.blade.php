<html>
    <head>
        <meta charset="utf-8">
        <title>Senutia - Esplora</title>
        <link rel="icon" href="{{ asset('img/senutiaLink.png') }}">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <link rel="stylesheet" href="{{ asset('css/exploreMain.css') }}">
        <link rel="stylesheet" href="{{ asset('css/exploreMainPage.css') }}">
        <link rel="stylesheet" href="{{ asset('css/exploreSearch.css') }}">
        <link rel="stylesheet" href="{{ asset('css/exploreTrack.css') }}">
        <link rel="stylesheet" href="{{ asset('css/favourite.css') }}">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@500&display=swap" rel="stylesheet">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="{{ asset('js/easterEgg.js') }}" defer></script>
        <script src="{{ asset('js/exploreMainPage.js') }}" defer></script>
        <script src="{{ asset('js/exploreSearch.js') }}" defer></script>
        <script src="{{ asset('js/exploreTrack.js') }}" defer></script>
        <script src="{{ asset('js/favourite.js') }}" defer></script>
    </head>

    <body>
        <section id="mainPage">
            <nav id="navbar">
                <form id="searchBar" method="post">
                    @csrf
                    <input type="text" id="search" name="search" class="textBox" placeholder="Cerca brani, artisti e album" autocomplete="on">
                    <div id="searchIcon" class="lens"><img src="{{ url('img/searchBlack.png') }}" alt=""></div>
                </form>
                <div id="profile">
                    <div class="proPicUsername">
                        <p id="proPicImage">
                            <img src="{{ $proPic }}" alt="">
                        </p>

                        <p>
                            {{ $username }}
                        </p>

                        <div id="triangle" class="triangleUp">
                            
                        </div>
                    </div>

                    <div id="rapidSettings" class="hideSettings">
                        <div>
                            <a href="{{ url('settings') }}">Settings</a>
                            <a><img src="{{ asset('img/settings.png') }}" alt=""></a>
                        </div>
                        <div>
                            <a href="{{ url('logout') }}">Logout</a>
                            <a><img src="{{ asset('img/link.png') }}" alt=""></a>
                        </div>
                    </div>
                </div>
            </nav>

            <div class="line"></div>

            <section id="mainPageContent">
                <div id="loadingGIF" class="hidden">
                    <img src="{{ asset('img/loading.gif') }}" alt="">
                    <p>
                        Attendi mentre carichiamo la tua bellissima <sup>[nessuna fonte]</sup> homepage!
                    </p>
                </div>

                <div id="customContents" class="hidden">
                    <h1>Ecco alcuni brani dai tuoi artisti preferiti:</h1>

                    <div id="favouriteArtistsTopTracks">
                    
                    </div>

                    <div id="scroll">
                        <div title="Scorri a sinistra" id="scrollButtonLeft" class="arrow"></div>
                        <div title="Scorri a destra" id="scrollButtonRight" class="arrow"></div>
                    </div>

                    <div class="line"></div>

                    <h1>Ecco alcuni album dai tuoi artisti preferiti:</h1>

                    <div id="favouriteArtistsAlbums">

                    </div>

                    <div class="line"></div>

                    <h1>Artisti che potrebbero piacerti:</h1>

                    <div id="suggestedArtists">

                    </div>

                    <div id="scrollArtist">
                        <div title="Scorri a sinistra" id="scrollButtonLeftArtist" class="arrow"></div>
                        <div title="Scorri a destra" id="scrollButtonRightArtist" class="arrow"></div>
                    </div>

                </div>

                <div id="searchResultsSpotify" class="hidden">
                    <div id="albumSearchResult" class="">
                            <h1 class="type">Album</h1>
                            <div class="resultsCard">
                                                
                            </div>
                        </div>

                    <div id="trackSearchResult" class="">
                            <div class="line"></div>
                            <h1 class="type">Brani</h1>
                            <div class="resultsCard">

                            </div>
                        </div>

                    <div id="artistSearchResult" class="">
                        <div class="line"></div>
                        <h1 class="type">Artisti</h1>
                        <div class="resultsCard">
                            
                        </div>
                    </div>

                    <div id="searchInfo">
                        <div>
                            <p>Search powered by</p>
                            <img src="{{ asset('img/spotifyLogoLink.png') }}" alt="">
                        </div>
                    </div>
                </div>

                <div id="lyrics" class="hidden">
                       
                </div>

                <div id="favourites" class="hidden">
                    
                </div>
            </section>
        
        </section>

        <section id="sidebar">
            <div id="sidebarContents">

                <div id="siteName">
                    Senutia
                </div>

                <div class="line"></div>

                <a href="{{ url('home') }}">
                    <img src="{{ asset('img/home.png') }}" alt="">
                    <span>Home</span>
                </a>

                <a id="artistPageLink" class="pagina_attuale">
                    <img src="{{ asset('img/artist.png') }}" alt="">
                    <span>Artisti</span>
                </a>

                <a id="favouriteLink">
                    <img src="{{ asset('img/white_heart.png') }}" alt="">
                    <span>Preferiti</span>
                </a>

                <div class="line"></div>

            </div>
        </section>

        <div class="scrollToTop">
            <img src="img/scroll_top.png" alt="">
        </div>

    </body>
</html>