<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

use App\Models\User;

class UserController extends Controller
{
    public function getList(){
        $list = User::all();

        return response()->json([
            'list' => $list,
        ],200);
    }

    public function delete(Request $request){
        
        $user = User::find($request['user_id']);        

        if($user){

            $user->delete();

            return response()->json([
                'message' => 'User successfully Deleted'
            ],200);
        }else{
            return response()->json([
                'message' => 'User not Found'
            ],422);
        }        
    }

    public function update(Request $request){

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' =>'User not Updated'
            ],422);
        }

        $user = User::find($request['id']); 

        if($user){
            $user->fill([
                'name' => $request['name'],
                'email' => $request['email'],
                'password'=>Hash::make($request['password'])
            ]);

            if($user->save()){
                return response()->json([
                    'message' => 'User successfully Updated'
                ],200);
            }
        }
    }

    public function create(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' =>'User not Created'
            ],422);
        }

        $user = User::where('email',$request['email'])->get();

        if($user->count() > 0){
            return response()->json([
                'message' =>'Email is already used.'
            ],422);
        }else{
            $user = new User();
            $user->name = $request['name'];
            $user->email = $request['email'];
            $user->password = Hash::make($request['password']);

            if($user->save()){
                return response()->json([
                    'message' =>'User Successfully Created'
                ],200);
            }
        }
    }
}
