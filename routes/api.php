<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});



Route::post('/login',[AuthController::class,'userLogin']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('/logout',[AuthController::class,'userLogout']);
    Route::get('/user',[AuthController::class,'getUser']);

    Route::prefix('users')->group(function(){
        Route::get('/list',[UserController::class,'getList']);
        Route::post('/delete',[UserController::class,'delete']);
        Route::post('/update',[UserController::class,'update']);
        Route::post('/create',[UserController::class,'create']);
    });
});