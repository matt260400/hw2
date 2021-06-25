<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;
use App\Models\Artist;
use App\Models\User;

class SpotifyController extends Controller
    /*
        To obtain an instance of the current HTTP request via dependency injection, 
        you should type-hint the Illuminate\Http\Request class on your route closure or controller method.
        The incoming request instance will automatically be injected by the Laravel service container:
        public function func(Request $request)
    */

{
    public function token(Request $request){
        $token = Http::asForm()->withHeaders([
            'Authorization' => 'Basic '.base64_encode(env('CLIENT_ID').':'.env('CLIENT_SECRET')),
        ])->post('https://accounts.spotify.com/api/token', [
            'grant_type' => 'client_credentials',
        ]);
        if ($token->failed()) abort(500);
        
        if($request->session()->has('user_id')){
            $request->session()->put('token', $token['access_token']);
        }
    }

    # Funzione di ricerca degli artisti per poter essere aggiunti ai preferiti al momento della registrazione.
    # https://developer.spotify.com/console/get-search-item/
    public function searchArtistSignup(Request $request) {   
        /*
            If you would like to send data using the application/x-www-form-urlencoded content type, 
            you should call the asForm method before making your request:
        */
        
        $token = Http::asForm()->withHeaders([
            'Authorization' => 'Basic '.base64_encode(env('CLIENT_ID').':'.env('CLIENT_SECRET')),
        ])->post('https://accounts.spotify.com/api/token', [
            'grant_type' => 'client_credentials',
        ]);
        if ($token->failed()) abort(500);


        /*
            Using a few simple methods, you may access all of the user input 
            from your Illuminate\Http\Request instance without worrying about 
            which HTTP verb was used for the request. Regardless of the HTTP verb, 
            the input method may be used to retrieve user input:
                $name = $request->input('name');
        */

        $result = Http::withToken($token['access_token'])->retry(4, 150)
        ->get('https://api.spotify.com/v1/search', [
            'q' => $request->input('name'),
            'type' => 'artist',
            'limit' => '3'
        ]);

        /*
            The get method returns an instance of Illuminate\Http\Client\Response,
            which provides a variety of methods that may be used to inspect the response:
            $response->body() : string;
            $response->json() : array|mixed;
        */

        return $result->json();
    }
    
    #                                          #
    #   FUNZIONI PER PERSONALIZZARE LA HOME    #
    #                                          #

    # Funzione per fetchare i 'top tracks' degli artisti preferiti.
    # https://developer.spotify.com/console/get-artist-top-tracks/
    public function fetchTopTracks(Request $request){
        if(!$request->session()->has('user_id')){
            echo "Devi prima effettuare l'accesso!";
            exit;
        }

        if(!$request->session()->has('token')){
            echo "Il token non è stato settato!";
            exit;
        }

        $token = session()->get('token');

        $user = User::find(session('user_id'));
        
        $artists = $user->artists->toArray();

        $json = array();

        foreach($artists as $id){
            $result = Http::withToken($token)->retry(4, 150)->timeout(2)
            ->get('https://api.spotify.com/v1/artists/'.$id['artist_id'].'/top-tracks?', [
                "market" => "it"
            ]);

            $json[] = $result->json();
        }

        return json_encode($json);
    }

    # Funzione per fetchare i 'top albums' degli artisti preferiti.
    # https://developer.spotify.com/console/get-artist-albums/
    public function fetchAlbums(Request $request){
        if(!$request->session()->has('user_id')){
            echo "Devi prima effettuare l'accesso!";
            exit;
        }

        if(!$request->session()->has('token')){
            echo "Il token non è stato settato!";
            exit;
        }

        $token = session()->get('token');

        $user = User::find(session('user_id'));
        
        $artists = $user->artists->toArray();

        $json = array();

        foreach($artists as $id){
            $result = Http::withToken($token)->retry(4, 150)->timeout(2)
            ->get('https://api.spotify.com/v1/artists/'.$id['artist_id'].'/albums?', [
                "market" => "it",
                "limit" => "4"
            ]);

            $json[] = $result->json();
        }

        return json_encode($json);
    }

    # Funzione per fetchare una serie di artisti correlati agli artisti preferiti.
    # https://developer.spotify.com/console/get-artist-related-artists/
    public function fetchRelatedArtists(Request $request){
        if(!$request->session()->has('user_id')){
            echo "Devi prima effettuare l'accesso!";
            exit;
        }

        if(!$request->session()->has('token')){
            echo "Il token non è stato settato!";
            exit;
        }

        $token = session()->get('token');

        $user = User::find(session('user_id'));
        
        $artists = $user->artists->toArray();

        $json = array();

        foreach($artists as $id){
            $result = Http::withToken($token)->retry(4, 150)->timeout(2)
            ->get('https://api.spotify.com/v1/artists/'.$id['artist_id'].'/related-artists');

            $json[] = $result->json();
        }

        return json_encode($json);
    }

    /*
        # Versione parametrizzata delle richieste [spotifyFetchTopTracks, spotifyFetchAlbums, spotifyFetchRelatedArtists].
        
        public function fetchHome(Request $request){
            if(!$request->session()->has('user_id')){
                echo "Devi prima effettuare l'accesso!";
                exit;
            }

            if(!$request->session()->has('token')){
                echo "Il token non è stato settato!";
                exit;
            }

            $token = session()->get('token');

            $user = User::find(session('user_id'));
            
            $artists = $user->artist->toArray();

            $json = array();

            foreach($artists as $id){
                if($request->is('spotify/spotifyFetchTopTracks')){
                    $url = 'https://api.spotify.com/v1/artists/'.$id['artist_id'].'/top-tracks?';
                    $data = ["market" => "it"];
                }
                
                if($request->is('spotify/spotifyFetchAlbums')){
                    $url = 'https://api.spotify.com/v1/artists/'.$id['artist_id'].'/albums?';
                    $data = ["market" => "it", "limit" => "8"];
                }

                if($request->is('spotify/spotifyFetchRelatedArtists')){
                    $url = 'https://api.spotify.com/v1/artists/'.$id['artist_id'].'/related-artists';
                    $data = [];
                }

                $result = Http::withToken($token)
                ->get($url, $data);
                if($result->failed()) abort(500);

                $json[] = $result->json();
            }

            return json_encode($json);
        }
    */

    public function searchTracks(Request $request){
        if(!$request->session()->has('user_id')){
            echo "Devi prima effettuare l'accesso!";
            exit;
        }

        if(!$request->session()->has('token')){
            echo "Il token non è stato settato!";
            exit;
        }

        $token = session()->get('token');

        $result = Http::withToken($token)->retry(4, 150)->timeout(2)
        ->get('https://api.spotify.com/v1/search?', [
            "q" => $request->input('query'),
            "type" => "track",
            "limit" => "10"
        ]);

        return $result->json();
    }

    public function searchAlbums(Request $request){
        if(!$request->session()->has('user_id')){
            echo "Devi prima effettuare l'accesso!";
            exit;
        }

        if(!$request->session()->has('token')){
            echo "Il token non è stato settato!";
            exit;
        }

        $token = session()->get('token');

        $result = Http::withToken($token)->retry(4, 150)->timeout(2)
        ->get('https://api.spotify.com/v1/search?', [
            "q" => $request->input('query'),
            "type" => "album",
            "limit" => "6"
        ]);

        return $result->json();
    }

    public function searchArtists(Request $request){
        if(!$request->session()->has('user_id')){
            echo "Devi prima effettuare l'accesso!";
            exit;
        }

        if(!$request->session()->has('token')){
            echo "Il token non è stato settato!";
            exit;
        }

        $token = session()->get('token');

        $result = Http::withToken($token)->retry(4, 150)->timeout(2)
        ->get('https://api.spotify.com/v1/search?', [
            "q" => $request->input('query'),
            "type" => "artist",
            "limit" => "6"
        ]);

        return $result->json();
    }

    public function getSeveralTracks(Request $request){
        if(!$request->session()->has('user_id')){
            echo "Devi prima effettuare l'accesso!";
            exit;
        }

        if(!$request->session()->has('token')){
            echo "Il token non è stato settato!";
            exit;
        }

        $token = session()->get('token');

        $items = $request->all();

        $get = '';

        $size = sizeof($request->all());

        for($i = 0; $i < $size; $i++){
            if($i === 0){
                $get = $items[$i];
            }
            else if($i > 0 && $i < $size){
                $get = $get.'%2C'.$items[$i];
            }
        }

        $result = Http::withToken($token)->retry(4, 150)->timeout(2)
        ->get('https://api.spotify.com/v1/tracks?ids='.$get);

        $json[] = $result->json();

        return json_encode($json);
    }

    public function getSeveralArtists(Request $request){
        if(!$request->session()->has('user_id')){
            echo "Devi prima effettuare l'accesso!";
            exit;
        }

        if(!$request->session()->has('token')){
            echo "Il token non è stato settato!";
            exit;
        }

        $token = session()->get('token');

        $items = $request->all();

        $get = '';

        $size = sizeof($request->all());

        for($i = 0; $i < $size; $i++){
            if($i === 0){
                $get = $items[$i];
            }
            else if($i > 0 && $i < $size){
                $get = $get.'%2C'.$items[$i];
            }
        }

        $result = Http::withToken($token)->retry(4, 150)->timeout(2)
        ->get('https://api.spotify.com/v1/artists?ids='.$get);

        $json[] = $result->json();

        return json_encode($json);
    }
}