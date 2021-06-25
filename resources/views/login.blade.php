@extends('access')

@section('title', 'Senutia - Accedi')

@section('head')
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="{{ asset('css/login.css') }}">
    <script src="{{ asset('js/login.js') }}" defer></script>
@endsection

@section('content')
    <div id="formLogin">

        <img src="{{ asset('img/logo.png') }}" alt="">

        <form name="loginForm" method="post">
            @csrf

            <div class="inputBox">
                <input type="text" name="username" class="textBox" value="{{ old('username') }}" placeholder="Username or email" autocomplete="on">
            </div>

            <div class="inputBox">
                <div>
                    <input type="password" name="password" class="textBox" placeholder="Password" autocomplete="on">
                </div>
            </div>

            <div id="inputAlert" class="inputAlertMessage hidden">
                Attenzione! Inserire username/email e password.
            </div>

            <div id="inputAlert" class="inputAlertMessage">
                <p>{{ session('error') }} </p>
            </div>

            <div id="checkboxContainer">
                <input type="checkbox" id="remindMe" name="rememberMe" value="y">
                <label for="remindMe">Ricordami</label>
            </div>

            <div>
                <input type="submit" id="loginButton" value="Accedi">
            </div>
        </form>
         

        <div id="containerShortcut">
            <p>
                <a href="{{ url('register') }}">Registrati</a>
            </p>
        </div>

    </div>
@endsection