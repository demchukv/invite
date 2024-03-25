<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\InviteTiming;
use App\Http\Requests\StoreInviteTimingRequest;
use App\Http\Requests\UpdateInviteTimingRequest;
use App\Http\Controllers\Controller;
use App\Http\Resources\V1\InviteTimingResource;
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(InviteTiming $inviteTiming)
    {
        //return new InviteTimingResource($inviteTiming);
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(InviteTiming $inviteTiming)
    {
        //
    }
}
