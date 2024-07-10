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

Route::get('v1/invitation/id/{id}', [InviteController::class, 'fetchOneInviteById'], function(Request $request, $id){
    return $id;
});

Route::post('v1/invite-answer', [InviteController::class, 'updateGuestAnswer']);
Route::post('v1/invite-subanswer', [InviteController::class, 'updateGuestSubAnswer']);
Route::post('v1/invite-transfer', [InviteController::class, 'updateGuestTransfer']);

Route::group(['prefix' => 'v1', 'namespace' => '\App\Http\Controllers\Api\V1', 'middleware'=>'auth:sanctum'], function(){

        Route::get('profile', [UserController::class, 'profile']);
        Route::post('logout', [UserController::class, 'logout']);

        Route::apiResource('invites', InviteController::class);
        Route::apiResource('invite-timing', InviteTimingController::class);
        Route::apiResource('invite-group', InviteGroupController::class);
        Route::apiResource('invite-guest', InviteGuestController::class);
        Route::post('invite-theme', [InviteController::class, 'changeInvitationTheme']);
        Route::post('invite-photo/{id}', [InviteController::class, 'uploadPhoto'], function(Request $request, $id){
            return $id;
        });
        Route::delete('invite-photo/{id}/{type}', [InviteController::class, 'deletePhoto'], function(Request $request, $id, $type){
            return ['id' => $id, 'type'=>$type];
        });
        Route::post('invite-groups', [InviteController::class, 'changeGuests']);

});
