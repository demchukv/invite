<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;

use App\Models\InviteTiming;
use App\Http\Requests\V1\StoreInviteTimingRequest;
use App\Http\Requests\V1\UpdateInviteTimingRequest;
use App\Http\Resources\V1\InviteTimingCollection;


class InviteTimingController extends Controller
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
    public function store(StoreInviteTimingRequest $request)
    {
        //return new InviteTimingResource(InviteTiming::create($request->all()));
    }

    /**
     * Display the specified resource.
     */
    public function show(InviteTiming $inviteTiming)
    {
            $inviteTiming = $inviteTiming -> where('id', $inviteTiming->id);
            return new InviteTimingCollection($inviteTiming->get());
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(InviteTiming $inviteTiming)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateInviteTimingRequest $request, InviteTiming $inviteTiming)
    {
        //$inviteTiming -> update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(InviteTiming $inviteTiming)
    {
        $record = InviteTiming::find($inviteTiming->id);

        if($record){
            $record -> delete();
            return response() -> json([
                "status" => true,
                "message" => "Invitation timing deleted"
            ], 200);
        }else{
            return response() -> json([
                "status" => false,
                "message" => "Invitation timing not found!"
            ], 401);
        }

    }
}
