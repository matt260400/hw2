<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\SpotifyController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ExploreController;
use App\Http\Controllers\FavouriteController;
use App\Http\Controllers\TrackController;
use App\Http\Controllers\SettingsController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect('login');
});

Route::get('/explore', [ExploreController::class, 'index']);

Route::get('/home', [HomeController::class, 'index']);


# Login
Route::get('/login', [LoginController::class, 'index']);
Route::post('/login', [LoginController::class, 'login']);
Route::get('/logout', [LoginController::class, 'logout']);

# Impostazioni
Route::get('/settings', [SettingsController::class, 'index']);
Route::post('/settings/username', [SettingsController::class, 'changeUsername']);
Route::post('/settings/email', [SettingsController::class, 'changeEmail']);
Route::post('/settings/password', [SettingsController::class, 'changePassword']);
Route::post('/settings/proPic', [SettingsController::class, 'changeProPic']);

# Registrazione
Route::get('/register', [RegisterController::class, 'index']);
Route::post('/register', [RegisterController::class, 'store']);
Route::get('/register/username/{username}', [RegisterController::class, 'checkUsername']);
Route::get('/register/email/{email}', [RegisterController::class, 'checkEmail']);
Route::post('/register/password', [RegisterController::class, 'checkPassword']);

# Spotify API
Route::get('/spotify/token', [SpotifyController::class, 'token']);

Route::get('/spotify/spotifyFetchTopTracks', [SpotifyController::class, 'fetchTopTracks']);
Route::get('/spotify/spotifyFetchAlbums', [SpotifyController::class, 'fetchAlbums']);
Route::get('/spotify/spotifyFetchRelatedArtists', [SpotifyController::class, 'fetchRelatedArtists']);

Route::post('/spotify/searchArtistSignup', [SpotifyController::class, 'searchArtistSignup']);
Route::post('/spotify/searchTracks', [SpotifyController::class, 'searchTracks']);
Route::post('/spotify/searchAlbums', [SpotifyController::class, 'searchAlbums']);
Route::post('/spotify/searchArtists', [SpotifyController::class, 'searchArtists']);

Route::post('/spotify/getSeveralArtists', [SpotifyController::class, 'getSeveralArtists']);
Route::post('/spotify/getSeveralTracks', [SpotifyController::class, 'getSeveralTracks']);

# Versione parametrizzata delle richieste [spotifyFetchTopTracks, spotifyFetchAlbums, spotifyFetchRelatedArtists].
# Lato JS non è necessaria alcuna modifica al codice, funziona normalmente grazie alle routes.
# Route::get('/spotify/spotifyFetchTopTracks', [SpotifyController::class, 'fetchHome']);
# Route::get('/spotify/spotifyFetchAlbums', [SpotifyController::class, 'fetchHome']);
# Route::get('/spotify/spotifyFetchRelatedArtists', [SpotifyController::class, 'fetchHome']);

# Gestione dei preferiti
Route::post('/favourite/addToFavouriteSignup', [FavouriteController::class, 'addToFavouriteSignup']);
Route::get('/favourite/favouriteTracks', [FavouriteController::class, 'favouriteTracks']);
Route::get('/favourite/favouriteArtists', [FavouriteController::class, 'favouriteArtists']);
Route::post('/favourite/addTrackToFavourites', [FavouriteController::class, 'addTrackToFavourites']);
Route::post('/favourite/addArtistToFavourites', [FavouriteController::class, 'addArtistToFavourites']);
Route::post('/favourite/removeTrackFromFavourites', [FavouriteController::class, 'removeTrackFromFavourites']);
Route::post('/favourite/removeArtistFromFavourites', [FavouriteController::class, 'removeArtistFromFavourites']);

# Informazioni sui brani
Route::post('/lyrics', [TrackController::class, 'getLyrics']);
Route::post('/video/search', [TrackController::class, 'getMusicVideo']);
Route::post('/info', [TrackController::class, 'getMusicInfo']);