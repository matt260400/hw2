<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;

class TrackController extends Controller
{
    public function getLyrics(Request $request){
        /*
            L'API utilizzata restituisce il testo di un determinato brano in formato XML.
            Per poter visualizzare e utilizzare i dati ricevuti è sufficiente utilizzare la libreria
            preinstallata di PHP "SimpleXML".
            In particolare uso la funzione "simplexml_load_file" che interpreta un file XML come un oggetto PHP.
        */
        

        $result = Http::get("http://api.chartlyrics.com/apiv1.asmx/SearchLyricDirect?", [
            "artist" => $request->artist,
            "song" => $request->title
        ]);

        $xml = simplexml_load_string($result);
        return $xml->Lyric;
    }

    public function getMusicVideo(Request $request){
        $result = Http::get('https://www.googleapis.com/youtube/v3/search?key='.env('YOUTUBE_KEY').'&q='.$request->artist.''.$request->title);
        return $result->json();
    }

    public function getMusicInfo(Request $request){
        /*
            If you would like HTTP client to automatically retry the request if a client or server error occurs, you may use the retry method. 
            The retry method accepts two arguments: the maximum number of times the request should be attempted 
            and the number of milliseconds that Laravel should wait in between attempts:
        */

        $songID = Http::retry(4, 150)->withToken(env('GENIUS_KEY'))
        ->get('https://api.genius.com/search?', [
            "q" => $request->artist.''.$request->title
        ]);

        $id = $songID['response']['hits'][0]['result']['api_path'];

        $get = 'https://api.genius.com'.$id.'?text_format=plain';

        $result = Http::retry(4, 150)->withToken(env('GENIUS_KEY'))
        ->get($get);

        $test = $result->json();
        return $test;
    }
}
