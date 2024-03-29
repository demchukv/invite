<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

use App\Models\Invite;
use App\Http\Requests\V1\StoreInviteRequest;
use App\Http\Requests\V1\UpdateInviteRequest;
use App\Http\Resources\V1\InviteResource;
use App\Http\Resources\V1\InviteCollection;

use App\Models\InviteTiming;
use App\Http\Requests\V1\UpdateInviteTimingRequest;
use App\Http\Requests\V1\StoreInviteTimingRequest;
use App\Http\Resources\V1\InviteTimingResource;


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
        $invite = new InviteResource(Invite::create($request->all()));
        $this->changeTiming($request, $invite->id);
        return $invite;
    }

    /**
     * Display the specified resource.
     */
    public function show(Invite $invite)
    {
        //return new InviteResource($invite);
        $invite = $invite -> where('id', $invite->id);
        $invite = $invite -> with('inviteTimings') -> with('invitePhotos') -> with('inviteGroups.inviteGuests');
        return new InviteCollection($invite->get());
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
        // update base inivite info
        $invite -> update($request->all());

        // prepare data for insert or update timings
        $this->changeTiming($request, $invite->id);

        $invite = $invite -> where('id', $invite->id);
        $invite = $invite -> with('inviteTimings') -> with('invitePhotos') -> with('inviteGroups.inviteGuests');


        $data = new InviteCollection($invite->get());
        return $data;
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

    public function changeTiming($request, $invite_id)
    {
        //dd($request);
        foreach($request->inviteTimings as $td){
            if(!isset($td['id'])){
                $users = DB::table('invite_timings')->insert([
                    'invite_id'=>$invite_id,
                    'event_time'=>$td['eventTime'],
                    'event_desc'=>$td['eventDesc']
                ]);
            }else{
                $users = DB::table('invite_timings')
                        ->where('id', $td['id'])
                        ->update([
                            'event_time'=>$td['eventTime'],
                            'event_desc'=>$td['eventDesc']
                        ]);
            }
        }

    }
}
