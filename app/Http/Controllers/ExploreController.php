<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;
use App\Models\User;

class ExploreController extends Controller
{
    public function index(Request $request){
        if(!$request->session()->has('user_id')){
            return redirect('login');
        }
        $username = User::find(session()->get('user_id'))->first()->username;
        $proPic = User::find(session()->get('user_id'))->first()->proPic;

        return view('explore')->with('username', $username)->with('proPic', $proPic);
    }
}