<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\User;

class SettingsController extends Controller
{
    public function index(Request $request){
        if(!$request->session()->has('user_id')){
            return redirect('login');
        }
        else {
            $username = User::find(session()->get('user_id'))->first()->username;
            $email = User::find(session()->get('user_id'))->first()->email;
            $proPic = User::find(session()->get('user_id'))->first()->proPic;
            
            return view('settings')->with('email', $email)->with('username', $username)->with('proPic', $proPic);
        }
    }

    public function changeUsername(Request $request){
        $validatedData = $request->validate([
            'username' => ['required', 'regex:/^[a-zA-Z0-9_]{1,16}$/']
        ]);

        $user = User::find(session()->get('user_id'))->first();

        $user->username = $request->username;

        try{
            $user->save();
        }
        catch(\Illuminate\Database\QueryException $e){
            echo json_encode($e->errorInfo['2']);
            exit;
        }

        $request->session()->forget('username');
        $request->session()->put('username', $request->username);
        
        return json_encode('perfect_username');
    }

    public function changeEmail(Request $request){
        $validatedData = $request->validate([
            'email' => ['required', 'email:filter']
        ]);

        $user = User::find(session()->get('user_id'))->first();

        $user->email = $request->email;

        try{
            $user->save();
        }
        catch(\Illuminate\Database\QueryException $e){
            echo json_encode($e->errorInfo['2']);
            exit;
        }
        
        return json_encode('perfect_email');
    }

    public function changeProPic(Request $request){
        if(empty($request->input('proPic'))){
            $proPic = asset('img/cover.png');

            $user = User::find(session()->get('user_id'))->first();

            $user->proPic = $proPic;
    
            try{
                $user->save();
            }
            catch(\Illuminate\Database\QueryException $e){
                echo json_encode($e->errorInfo['2']);
                exit;
            }

            $request->session()->forget('proPic');
            $request->session()->put('proPic', $proPic);

            return json_encode('perfect_proPic');
        }
        else{    
            $user = User::find(session()->get('user_id'))->first();
    
            $user->proPic = $request->proPic;
    
            try{
                $user->save();
            }
            catch(\Illuminate\Database\QueryException $e){
                echo json_encode($e->errorInfo['2']);
                exit;
            }

            $request->session()->forget('proPic');
            $request->session()->put('proPic', $request->proPic);
            
            return json_encode('perfect_proPic');
        }
    }

    public function changePassword(Request $request){
        $validatedData = $request->validate([
            'password' => ['required', 'regex:/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/', Password::min(8)->uncompromised()],
            'passwordCheck' => ['required']
        ]);

        $user = User::find(session()->get('user_id'))->first();
        $hashedPassword = User::find(session()->get('user_id'))->first()->password;

        if (Hash::check($request->passwordOld, $hashedPassword)) {
            $user->password = Hash::make($request->password);

            $user->save();

            return json_encode('perfect');
        }
        else{
            return json_encode('error');
        }
    }
}