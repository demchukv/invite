<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\InviteGroup;
use App\Http\Requests\V1\StoreInviteGroupRequest;
use App\Http\Requests\V1\UpdateInviteGroupRequest;
use App\Http\Controllers\Controller;
use App\Http\Resources\V1\InviteGroupResource;
use App\Http\Resources\V1\InviteGroupCollection;

class InviteGroupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(StoreInviteGroupRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(InviteGroup $inviteGroup)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(InviteGroup $inviteGroup)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateInviteGroupRequest $request, InviteGroup $inviteGroup)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(InviteGroup $inviteGroup)
    {
        $record = InviteGroup::find($inviteGroup->id);

        if($record){
            $record -> delete();
            return response() -> json($inviteGroup, 200);
        }else{
            return response() -> json([
                "status" => false,
                "message" => "Group not found!"
            ], 401);
        }

    }
}
