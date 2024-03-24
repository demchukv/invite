<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Invite;
use App\Http\Requests\StoreInviteRequest;
use App\Http\Requests\UpdateInviteRequest;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Resource\V1\InviteResource;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InviteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
     public function index()
    {
        return Invite::all();
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
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Invite $invite)
    {
        //
    }
}
