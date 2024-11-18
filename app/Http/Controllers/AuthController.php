<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;


use App\Models\User;

class AuthController extends Controller
{
    

    public function userLogin(Request $request){
        
        $creds = $request->validate([
            'email' => ['required','email'],
            'password' => ['required']
        ]);

        $user = User::where('email',$creds['email'])->first();

        if(!$user || !Hash::check($creds['password'],$user->password)){
            return response()->json([
                'message' => 'Invalid Credentials'
            ],401);
        }

        $token = $user->createToken($user->name.'-AuthToken')->plainTextToken;

        return response()->json([
            'access_token' => $token,
        ],200);
    }

    public function getUser(){
        return response()->json([
            'user'=> auth()->user()
        ],200);
    }

    public function userLogout(Request $request){
        $request->user()->currentAccessToken()->delete();
        
        return response()->json([
            'message'=> 'User Logout Successfully'
        ],200);
    }
}
