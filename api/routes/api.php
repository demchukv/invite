<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\UserController;
use App\Http\Controllers\Api\V1\InviteController;
use App\Http\Controllers\Api\V1\InviteTimingController;
use App\Http\Controllers\Api\V1\InviteGroupController;
use App\Http\Controllers\Api\V1\InviteGuestController;

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

Route::get('v1/invitation/{link}', [InviteController::class, 'fetchOneInviteByLink'], function(Request $request, $link){
    return $link;
});

Route::group(['prefix' => 'v1', 'namespace' => '\App\Http\Controllers\Api\V1', 'middleware'=>'auth:sanctum'], function(){



    //Route::group(['middleware'=>'auth:sanctum'], function(){
        Route::get('profile', [UserController::class, 'profile']);
        Route::post('logout', [UserController::class, 'logout']);

        Route::apiResource('invites', InviteController::class);
        Route::apiResource('invite-timing', InviteTimingController::class);
        Route::apiResource('invite-group', InviteGroupController::class);
        Route::apiResource('invite-guest', InviteGuestController::class);
        Route::post('invite-photo/{id}', [InviteController::class, 'uploadPhoto'], function(Request $request, $id){
            return $id;
        });
        Route::delete('invite-photo/{id}', [InviteController::class, 'deletePhoto'], function(Request $request, $id){
            return $id;
        });
        Route::post('invite-groups', [InviteController::class, 'changeGuests']);
        Route::post('invite-willbe', [InviteController::class, 'updateWillbe']);
        Route::post('invite-willbeon', [InviteController::class, 'updateWillbeOn']);
        /*
        Route::get('invites', [InviteController::class, 'index']);
        Route::post('invites', [InviteController::class, 'store']);
        Route::get('invites/{id}', [InviteController::class, 'index'], function(integer $id){
            return $id;
        })->where('id', '[0-9]+');
        Route::put('invites/{id}', [InviteController::class, 'update'], function(integer $id){
            return $id;
        })->where('id', '[0-9]+');
        Route::patch('invites/{id}', [InviteController::class, 'update'], function(integer $id){
            return $id;
        })->where('id', '[0-9]+');
        */
    //});

});
