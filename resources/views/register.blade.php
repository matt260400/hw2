@extends('access')

@section('title', 'Senutia - Registrazione')

@section('head')
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="{{ asset('css/signup.css') }}">
    <script src="{{ asset('js/check.js') }}" defer></script>
    <script src="{{ asset('js/signup.js') }}" defer></script>
    <script src="{{ asset('js/search.js') }}" defer></script>
@endsection

@section('content')
    <div id="registrationPage">

        <h1>
            CREA ACCOUNT
        </h1>
        
        <form id="formRegistration" method="post">
            @csrf

            <div id="firstPage">

                <div class="inputBox">
                    @error('username')
                        <p class="inputError">{{ $message }}</p>
                    @enderror
                    <p class="inputError hidden"></p>
                    <input type="text" name="username" class="textBox" placeholder="Scegli un nome utente">
                </div>

                <div class="inputBox">
                    @error('email')
                        <p class="inputError">{{ $message }}</p>
                    @enderror
                    <p class="inputError hidden"></p>
                    <input type="text" name="email" class="textBox" placeholder="Inserisci la tua email">
                </div>

                <div class="inputBox">
                    <div>
                        @error('password')
                            <p class="inputError">{{ $message }}</p>
                        @enderror
                        <p class="inputError hidden"></p>
                        <input type="password" name="password" class="textBox" placeholder="Password" autocomplete="on">
                    </div>
                </div>

                <div class="inputBox">
                    <div>
                        @error('passwordCheck')
                            <p class="inputError">{{ $message }}</p>
                        @enderror
                        <p class="inputError hidden"></p>
                        <input type="password" name="passwordCheck" class="textBox" placeholder="Ripeti la password" autocomplete="on">
                    </div>
                </div>
                <div class="goToSecondPage">
                    <p>
                        Avanti
                    </p>
                </div>
                <div id="containerShortcut">
                    <p>
                        Hai già un account?
                        <a href="{{ url('login') }}">Accedi</a>
                    </p>
                </div>
                    
            </div>
            <div id="secondPage" class="hidden">
                <div id="searchParagraph">
                    <p>
                        Scegli i tuoi artisti preferiti:
                    </p>
                    
                    <div id="spotifySearch">
                        <div class="inputBox">
                            <input type="text" name="search" id="artistSearch" class="textBox" placeholder="Cerca" autocomplete="off">
                        </div>
                        <div><img src="{{ url('img/searchWhite.png') }}" alt=""></div>
                    </div>
                </div>
                
                <div id="artistList">
                    <div id="searchResult">
                        <div class="artist">
                            
                        </div>
                    </div>
                    <p id="choices" class="hidden">Le tue scelte:</p>
                    <div id="favouriteArtists">
                        
                    </div>
                    <p id="maxArtistError" class="hidden"></p>
                </div>
                <div class="pageSelection">
                    <div class="goToFirstPage">
                        <p>
                            Indietro
                        </p>
                    </div>
                    <div class="goToThirdPage">
                        <p>
                            Avanti
                        </p>
                    </div>
                </div>
            </div>
            <div id="thirdPage" class="hidden">
                <div>
                    <p>
                        Scegli un'immagine di profilo:
                    </p>
                </div>
                <div class="inputBox">
                    <input type="text" name="proPic" class="textBox" placeholder="Inserisci l'url a un'immagine">
                </div>
                <div id="checkboxContainer">
                    <div id="checkbox">
                        <div id="tick" class=""></div>
                    </div>
                    Accetto i&nbsp;<em>termini di servizio</em>
                </div>
                <p id="agreementError" class="hidden"></p>
                <div class="pageSelection">
                    <div class="goBackToSecondPage">
                        <p>
                            Indietro
                        </p>
                    </div>
                    <div>
                        <input type="submit" id="registerButton" value="Registrati">
                    </div>  
                </div>
            </div>
                
        </form>
        
    </div>
@endsection