<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\UserController;
use App\Http\Controllers\Api\V1\InviteController;
use App\Http\Controllers\Api\V1\InviteGroupController;
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
})->middleware(['auth:sanctum', 'abilities:user,admin']);

Route::post('v1/login', [UserController::class, 'login']);
Route::post('v1/register', [UserController::class, 'register']);

Route::group(['prefix' => 'v1', 'namespace' => '\App\Http\Controllers\Api\V1'], function(){

    //Route::group(['middleware'=>'auth:sanctum'], function(){
        Route::get('profile', [UserController::class, 'profile']);
        Route::post('logout', [UserController::class, 'logout']);
        Route::get('invitations', [InviteController::class, 'index']);
    //});

});
