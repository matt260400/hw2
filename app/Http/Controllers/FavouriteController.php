<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;
use App\Models\Artist;
use App\Models\Track;
use App\Models\User;

class FavouriteController extends Controller
{
    # Funzione per salvare gli artisti scelti al momento della registrazione nel database.
    public function addToFavouriteSignup(Request $request){
        $user_id = User::find(session()->get('user_id'))->first()->id;

        $data = $request->all();

        # $data è un array contenente le coppie chiave-valore
        # key => artist_id

        foreach($data as $item){
            $artist = new  Artist;

            $artist->user_id = $user_id;
            $artist->artist_id = $item;

            $artist->save();
        }
    }

    public function favouriteTracks(Request $request){
        $user = User::find(session('user_id'));

        $tracks = $user->tracks->toArray();

        $json = array();

        foreach($tracks as $item){
            $json[] = $item['track_id'];
        }

        return json_encode($json);
    }

    public function addTrackToFavourites(Request $request){
        $user_id = User::find(session()->get('user_id'))->first()->id;

        $data = $request->input('id');
        
        $track = new Track;

        $track->user_id = $user_id;
        $track->track_id = $data;

        $track -> save();
    }
    
    public function removeTrackFromFavourites(Request $request){
        $track = Track::where('user_id', session('user_id'))
                    ->where('track_id', $request->input('id'))
                    ->delete();
    }

    public function favouriteArtists(Request $request){
        $user = User::find(session('user_id'));

        $artists = $user->artists->toArray();

        $json = array();

        foreach($artists as $item){
            $json[] = $item['artist_id'];
        }

        return json_encode($json);
    }

    public function addArtistToFavourites(Request $request){
        $user_id = User::find(session()->get('user_id'))->first()->id;

        $data = $request->input('id');
        
        $artist = new Artist;

        $artist->user_id = $user_id;
        $artist->artist_id = $data;

        $artist -> save();
    }
    
    public function removeArtistFromFavourites(Request $request){
        $artist = Artist::where('user_id', session('user_id'))
                    ->where('artist_id', $request->input('id'))
                    ->delete();
    }
}