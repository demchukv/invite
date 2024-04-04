<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

use App\Models\Invite;
use App\Http\Requests\V1\StoreInviteRequest;
use App\Http\Requests\V1\UpdateInviteRequest;
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
            $file = $record->photo;
            $name = pathinfo($file);
            Storage::delete('public/photos/'.$name['basename']);

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
                $result = DB::table('invite_timings')->insert([
                    'invite_id'=>$invite_id,
                    'event_time'=>$td['eventTime'],
                    'event_desc'=>$td['eventDesc']
                ]);
            }else{
                $result = DB::table('invite_timings')
                        ->where('id', $td['id'])
                        ->update([
                            'event_time'=>$td['eventTime'],
                            'event_desc'=>$td['eventDesc']
                        ]);
            }
        }

    }

    public function uploadPhoto(UpdateInviteRequest $request, $id){

        if($request->file('photo') !== null){
            $file = $request->file('photo');
            $extension = $file->extension();
            $file = $id.".".$extension;
            $path = Storage::putFileAs('public/photos', $request->file('photo'), $file);
            $url = Storage::disk('local')->url('public/photos/'.$file);

            DB::table('invites')
            ->where('id', $id)
            ->update([
                'photo'=>$url
            ]);
            return response() -> json([
                'status'=>'true',
                'photo'=>$path,
                'url'=>$url,
                'inviteId'=>$id
            ], 200);
        }
        if($request->file('timerphoto') !== null){
            $file = $request->file('timerphoto');
            $extension = $file->extension();
            $file = $id.".".$extension;
            $path = Storage::putFileAs('public/timers', $request->file('timerphoto'), $file);
            $url = Storage::disk('local')->url('public/timers/'.$file);
            DB::table('invites')
            ->where('id', $id)
            ->update([
                'timerphoto'=>$url
            ]);
            return response() -> json([
                'status'=>'true',
                'timerphoto'=>$path,
                'url'=>$url,
                'inviteId'=>$id
            ], 200);
            }

    }

    public function deletePhoto($id, $type){
        $res = DB::table('invites')
            ->where('id', $id)
            ->first();
        if($type === "photo"){
            $file = $res->photo;
            $name = pathinfo($file);
            Storage::delete('public/photos/'.$name['basename']);

            $result = DB::table('invites')
            ->where('id', $id)
            ->update([
                'photo'=>""
            ]);
        }

        if($type === "timerphoto"){
            $file = $res->photo;
            $name = pathinfo($file);
            Storage::delete('public/timers/'.$name['basename']);

            $result = DB::table('invites')
            ->where('id', $id)
            ->update([
                'timerphoto'=>""
            ]);
        }

        return response() -> json([
            'status'=>'true',
            'type'=>$type,
            'photo'=>"",
            'timerphoto'=>"",
            'url'=>"",
            'message'=>"Photodeleted",
            'inviteId'=>$id
        ], 200);
    }

    public function changeGuests(Request $request)
    {
        $data = array();

        foreach($request->inviteGroups as $group){
            if(!isset($group['id'])){
                $group_id = DB::table('invite_groups')->insertGetId([
                    'invite_id'=>$request->inviteId,
                    'link'=>$this -> unique_id(),
                ]);
            }else{
                $group_id = $group['id'];
            }
            // insert or update guests
            foreach($group['inviteGuests'] as $guest){
                if(!isset($guest['id'])){
                    $result = DB::table('invite_guests')->insert([
                        'invite_group_id'=>$group_id,
                        'name'=>$guest['name'],
                    ]);

                }else{
                    $result = DB::table('invite_guests')
                    ->where('id', $guest['id'])
                    ->update([
                        'name'=>$guest['name']
                    ]);
                }

            }
    }

    $invite = Invite::where('id', $request->inviteId);
    $invite = $invite -> with('inviteTimings') -> with('invitePhotos') -> with('inviteGroups.inviteGuests');
    $data = new InviteCollection($invite->get());

        return response() -> json(
            $data,
        200);

    }

    public function fetchOneInviteByLink($link){
        $group = DB::table('invite_groups')
            ->where('link', $link)
            ->first();

        if(!$group){
            return response() -> json([
                'status'=>"false",
                'message'=>'Page not found',
            ], 404);
        }

        $invite_id = $group->invite_id;

        $invite = DB::table('invites')
        ->where('id', $invite_id)
        ->first();

        $invite -> inviteGroup = $group;

        $guests = DB::table('invite_guests')
        ->where('invite_group_id', $group->id)
        ->get();
        $willbe = false;
        foreach ($guests as $key=>$guest) {
            $invite -> inviteGuests[$key] = $guest;
            if($guest->willbe == 'y'){
                $willbe = true;
            }
        }
        $invite -> willbe = $willbe;

        $timing = DB::table('invite_timings')
        ->where('invite_id', $invite_id)
        ->get();
        foreach ($timing as $key=>$times) {
            $invite -> inviteTiming[$key] = $times;
        }

        $photos = DB::table('invite_photos')
        ->where('invite_id', $invite_id)
        ->get();
        foreach ($photos as $key=>$photo) {
            $invite -> invitePhotos[$key] = $photo;
        }


        return response() -> json([
            'invite'=>$invite,
        ], 200);

    }

     public function unique_id($l = 16) {
        return substr(md5(uniqid(mt_rand(), true)), 0, $l);
    }

    public function updateGuestAnswer(Request $request){
        $group = DB::table('invite_groups')
        ->where('link', $request->link)
        ->first();

        if(!$group){
            return response() -> json([
                'status'=>"false",
                'message'=>'Forbidden',
            ], 403);
        }
        DB::table('invite_guests')
        ->where('id', $request->guest_id)
        ->update([
            'willbe'=>$request->answer,
        ]);

        $guest = DB::table('invite_guests')
        ->where('id', $request->guest_id)
        ->first();

        $guests = DB::table('invite_guests')
        ->where('invite_group_id', $guest->invite_group_id)
        ->get();
        $willbe = false;
        foreach($guests as $g){
            if($g->willbe == 'y'){
                $willbe = true;
            }
        }
        if($willbe == false){
            DB::table('invite_groups')
            ->where('id', $guest->invite_group_id)
            ->update([
                'w1'=>'n',
                'w2'=>'n',
            ]);
        }


        return response() -> json([
            'status'=>"true",
            'message'=>'Answer updated',
            'guest_id'=>$request->guest_id,
            'willbe'=>$willbe,
            'guest'=>$guest,
        ], 200);
    }

    public function updateGuestSubAnswer(Request $request){
        $group = DB::table('invite_groups')
        ->where('link', $request->link)
        ->first();

        if(!$group){
            return response() -> json([
                'status'=>"false",
                'message'=>'Forbidden',
            ], 403);
        }
        DB::table('invite_groups')
        ->where('id', $group->id)
        ->update([
            $request->field=>$request->val
        ]);

        $ret_group = DB::table('invite_groups')
        ->where('id', $group->id)
        ->first();


        return response() -> json([
            'status'=>"true",
            'message'=>'Answer updated',
            'group_id'=>$group->id,
            'group'=>$ret_group,
        ], 200);
    }

}

