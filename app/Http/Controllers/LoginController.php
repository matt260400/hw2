<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\User;

class LoginController extends Controller
{
    public function index(Request $request){
        if($request->session()->has('user_id')){
            return redirect('explore');
        }
        else {
            return view('login');
        }
    }

    public function login(Request $request){
        if($request->session()->has('user_id')) {
            return redirect('explore');
        }

        $credentials = $request->validate([
            'username' => ['required'],
            'password' => ['required'],
        ]);

        $fieldType = filter_var($request->username, FILTER_VALIDATE_EMAIL) ? 'email' : 'username';

        /*
            The attempt method accepts an array of key / value pairs as its first argument.
            The values in the array will be used to find the user in your database table.
            If the user is found, the hashed password stored in the database will be compared with the password value passed to the method via the array. 
            You should not hash the incoming request's password value, since the framework will automatically 
            hash the value before comparing it to the hashed password in the database. 
            An authenticated session will be started for the user if the two hashed passwords match.
        */

        /* https://laravel.com/docs/8.x/authentication#remembering-users */

        
        if(empty($request->rememberMe)){
            $remind = false;
        }
        else{
            $remind = true;
        }

        if(Auth::attempt([$fieldType => $request['username'], 'password' => $request['password']], $remind)) {
            $request->session()->regenerate();
            $user = Auth::getUser();
            $request->session()->put('username', $user->username);
            $request->session()->put('proPic', $user->proPic);
            $request->session()->put('user_id', $user->id);
            return redirect('explore');
        }
        else{
            return back()->withInput()->withError('Le credenziali inserite non sono corrette!');
        }
    }

    public function logout(Request $request){
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('login');  
    }
}