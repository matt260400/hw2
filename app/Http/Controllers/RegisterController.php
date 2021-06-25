<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;
use App\Models\User;

class RegisterController extends Controller
{
    public function index(){
        if(!empty(session()->get('user_id'))){
            return redirect('explore');
        }

        return view('register');
    }

    public function store(Request $request){
        $error = array();

        $validatedData = $request->validate([
            'username' => ['required', 'regex:/^[a-zA-Z0-9_]{1,16}$/'],
            'email' => ['required', 'email:filter'],
            'password' => ['required', 'regex:/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/', Password::min(8)->uncompromised()],
            'passwordCheck' => ['required']
        ]);

        $availableUsername = json_decode($this->checkUsername($request->input('username')));
        $availableMail = json_decode($this->checkUsername($request->input('email')));

        if($availableUsername === false){
            $error[] = "Username già utilizzato";
        }
        
        if($availableMail === false){
            $error[] = "Email già utilizzata";
        }

        if (strcmp($request->input('password'), $request->input('passwordCheck')) !== 0) {
            $error[] = "Le password non coincidono";
        }

        if(empty($request->input('proPic'))){
            $proPic = asset('img/cover.png');
        }
        else{
            $proPic = $request->input('proPic');
        }

        if(count($error) === 0){
            /*
                To insert a new record into the database, you should instantiate 
                a new model instance and set attributes on the model.
                Then, call the save method on the model instance             
             */
            $user = new  User;

            $user->username = $request->username;
            $user->email = $request->email;
            $user->password = Hash::make($request->password);
            $user->proPic = $proPic;

            /*
                Assign the name field from the incoming HTTP request
                to the name attribute of the App\Models\User model instance.
                When the save method is called, a record will be inserted into the database.
                The model's created_at and updated_at timestamps will automatically be set 
                when the save method is called, so there is no need to set them manually.
            */
            $user->save();

            /*
                To store data in the session, you will typically use the request instance's put method.
            */
            $request->session()->put('username', $user->username);
            $request->session()->put('proPic', $user->proPic);
            $request->session()->put('user_id', $user->id);

            return '/hw2/public/explore';
        }
        else{
            return back()->withInput();
        }
    }

    public function checkUsername($username){
        /*
            The count method returns the total number of items in the collection:
        */

        $rows = User::where('username', $username)->count();
        if($rows > 0){
            $available = false;
        }
        else{
            $available = true;
        }
        return json_encode($available);
    }

    public function checkEmail($email){
        $rows = User::where('email', $email)->count();
        if($rows > 0){
            $available = false;
        }
        else{
            $available = true;
        }
        return json_encode($available);
    }

    public function checkPassword(Request $request){
        $validator = Validator::make($request->all(), [
            'password' => [Password::min(8)->uncompromised()],
        ]);

        if ($validator->passes()) {
			$secure = true;
        }
        else{
            $secure = false;
        }

        return json_encode($secure);
    }

}