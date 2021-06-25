@extends('access')

@section('title', 'Senutia - Impostazioni')

@section('head')
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="{{ asset('css/settings.css') }}">
    <script src="{{ asset('js/check.js') }}" defer></script>
    <script src="{{ asset('js/settings.js') }}" defer></script>
@endsection

@section('content')
    <div id="settingsDiv">
        <div id="titleAndFields">
            <div id="settingsTitle">
                <h1>Impostazioni account</h1>
            </div>

            <section id="settingsFields">
                <div class="typeSection">
                    @error('username')
                        <p class="inputError">{{ $message }}</p>
                    @enderror
                    <p class="inputError hidden"></p>

                    <div class="username">
                        <div class="settingsIcon">
                            <img src="{{ asset('img/username.png') }}" alt="">
                        </div>
                        <input type="text" name="username" class="textBox" value="{{ $username }}" readonly>
                        <div class="settingsIcon pencil">
                            <img src="{{ asset('img/pencil.png') }}" alt="">
                        </div>
                    </div>
                </div>

                <div class="typeSection">
                    @error('email')
                        <p class="inputError">{{ $message }}</p>
                    @enderror
                    <p class="inputError hidden"> aaaaaa</p>

                    <div class="email">
                        <div class="settingsIcon">
                            <img src="{{ asset('img/email.png') }}" alt="">
                        </div>
                        <input type="text" name="email" class="textBox" value="{{ $email }}" readonly>
                        <div class="settingsIcon pencil">
                            <img src="{{ asset('img/pencil.png') }}" alt="">
                        </div>
                    </div>
                </div>

                <form id="passwordSettings" method="post">
                    @csrf
                    <div class="typeSection">
                        <p class="inputError hidden">Inserisci la tua password attuale</p>
                        <div class="password">
                            <div class="settingsIcon"> 
                                <img src="{{ asset('img/password.png') }}" alt="">
                            </div>
                            <input type="password" name="passwordOld" class="textBox" value="sicuramentenonlasua" autocomplete="on" readonly>
                            <div class="settingsIcon pencil">
                                <img src="{{ asset('img/pencil.png') }}" alt="">
                            </div>
                        </div>
                    </div>

                    <div class="typeSection hidden">
                        <div class="passwordChoice">
                            @error('password')
                                <p class="inputError">{{ $message }}</p>
                            @enderror
                            <p class="inputError hidden"></p>
                            <input type="password" name="password" class="textBox" placeholder="Inserisci una nuova password" autocomplete="on">
                        </div>

                        <div class="passwordControl">
                            @error('passwordCheck')
                                <p class="inputError">{{ $message }}</p>
                            @enderror
                            <p class="inputError "></p>
                            <input type="password" name="passwordCheck" class="textBox" placeholder="Ripeti la nuova password" autocomplete="on">
                        </div>
                    </div>

                    <div id="submitButtonDiv" class="hidden">
                        <input type="submit" id="submitButton" value="Prosegui">
                    </div> 
                </form>

                <div class="typeSection">
                    @error('proPic')
                        <p class="inputError">{{ $message }}</p>
                    @enderror
                    <p class="inputError hidden"> aaaaaa</p>

                    <div class="proPic">
                        <div class="settingsIcon">
                            <img src="{{ asset('img/picture.png') }}" alt="">
                        </div>
                        <input type="text" name="proPic" class="textBox" value="{{ $proPic }}" readonly>
                        <div class="settingsIcon pencil">
                            <img src="{{ asset('img/pencil.png') }}" alt="">
                        </div>
                    </div>
                </div>

                <div class="proPicPreview hidden">

                </div>
            </section>

            <div id="exeChanges">
                <button id="cancel" class="cancelButton hoverButton">Cancella</button>
                <button id="save" class="commitButtonNope">Salva</button>
            </div>
        </div>
    </div>
@endsection