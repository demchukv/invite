<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\InviteGuest;
use App\Http\Requests\StoreInviteGuestRequest;
use App\Http\Requests\UpdateInviteGuestRequest;
use App\Http\Controllers\Controller;


class InviteGuestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //return new InviteGuestCollection(InviteGuest::all());

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
    public function store(StoreInviteGuestRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(InviteGuest $inviteGuest)
    {
        //return new InviteGuestResource($inviteGuest);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(InviteGuest $inviteGuest)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateInviteGuestRequest $request, InviteGuest $inviteGuest)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(InviteGuest $inviteGuest)
    {
        $record = InviteGuest::find($inviteGuest->id);

        if($record){
            $record -> delete();
            return response() -> json($inviteGuest, 200);
        }else{
            return response() -> json([
                "status" => false,
                "message" => "Guest not found!"
            ], 401);
        }

    }
}
