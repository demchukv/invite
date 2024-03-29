<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Invite;
use App\Http\Requests\V1\StoreInviteRequest;
use App\Http\Requests\V1\UpdateInviteRequest;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\V1\InviteResource;
use App\Http\Resources\V1\InviteCollection;


class InviteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
     public function index(Request $request, $id = null)
    {
        $user =  auth('sanctum')->user();
        if(!isset($user -> id)){
            return [];
        }

        $invite = Invite::where('user_id', $user->id);

        if(isset($id)){
            $invite = $invite -> where('id', $id);
        }
        $invite = $invite -> with('inviteTimings') -> with('invitePhotos') -> with('inviteGroups.inviteGuests');
        return new InviteCollection($invite->get());
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreInviteRequest $request)
    {
        return new InviteResource(Invite::create($request->all()));
    }

    /**
     * Display the specified resource.
     */
    public function show(Invite $invite)
    {
        return new InviteResource($invite);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Invite $invite)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateInviteRequest $request, Invite $invite)
    {
        $invite -> update($request->all());
        return $invite;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Invite $invite)
    {
        $record = Invite::find($invite->id);

        if($record){
            $record -> delete();
            return response() -> json([
                "status" => true,
                "message" => "Invitation deleted"
            ], 200);
        }else{
            return response() -> json([
                "status" => false,
                "message" => "Invitation not found!"
            ], 401);
        }
    }
}
