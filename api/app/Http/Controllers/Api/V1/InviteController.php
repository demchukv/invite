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

use Intervention\Image\Facades\Image;
use Illuminate\Support\Str;


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

            $tfile = $record->timerphoto;
            $name = pathinfo($tfile);
            Storage::delete('public/timers/'.$name['basename']);

            $photos = DB::table('invite_photos')
            ->where('invite_id', $invite->id)
            ->get();
            foreach($photos as $photo){
                $gfile = $photo->photo_name;
                $name = pathinfo($gfile);
                Storage::delete('public/gallery/'.$invite->id.'/'.$name['basename']);
            }
            Storage::deleteDirectory('public/gallery/'.$invite->id);

            $record -> delete();

            return response() -> json([
                "status" => true,
                "message" => "Запрошення видалено!"
            ], 200);

        }else{

            return response() -> json([
                "status" => false,
                "message" => "Запрошення не знайдено!"
            ], 404);

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
            $filename = $id.".". $file->extension();

            Image::make($file->getRealPath())
            ->resize(800, null, function ($constraint) {
                $constraint->aspectRatio();
            })
            ->save(storage_path('app/public/photos/').$filename);

            $url = Storage::disk('local')->url('photos/'.$filename);

            DB::table('invites')
            ->where('id', $id)
            ->update([
                'photo'=>$url
            ]);
            return response() -> json([
                'status'=>'true',
                'photo'=>public_path(),
                'url'=>$url,
                'inviteId'=>$id
            ], 200);
        }

        if($request->file('timerphoto') !== null){

            $file = $request->file('timerphoto');
            $filename = $id.".". $file->extension();

            Image::make($file->getRealPath())
            ->resize(800, null, function ($constraint) {
                $constraint->aspectRatio();
            })
            ->save(storage_path('app/public/timers/').$filename);

            $url = Storage::disk('local')->url('timers/'.$filename);

            DB::table('invites')
            ->where('id', $id)
            ->update([
                'timerphoto'=>$url
            ]);
            return response() -> json([
                'status'=>'true',
                'timerphoto'=>public_path(),
                'url'=>$url,
                'inviteId'=>$id
            ], 200);
            }

            if($request->file('gallery') !== null){

                $file = $request->file('gallery');
                $filename = $id."_".Str::random(8).".". $file->extension();

                Storage::makeDirectory('public/gallery');
                Storage::makeDirectory('public/gallery/'.$id);

                Image::make($file->getRealPath())
                ->resize(600, null, function ($constraint) {
                    $constraint->aspectRatio();
                })
                ->save(storage_path('app/public/gallery/'.$id.'/').$filename);

                $url = Storage::disk('local')->url('gallery/'.$id.'/'.$filename);

                DB::table('invite_photos')
                ->insert([
                    'invite_id'=>$id,
                    'photo_name'=>$url
                ]);

                $photos = DB::table('invite_photos')
                ->where('invite_id', $id)
                ->get();
                $invitePhotos = array();
                foreach($photos as $photo){
                    $invitePhotos[] =
                        [
                            'id'=>$photo->id,
                            'inviteId'=>$photo->invite_id,
                            'photoName'=>$photo->photo_name,
                            'createdAt'=>null,
                            'updatedAt'=>null
                        ];
                }

                return response() -> json([
                    'status'=>'true',
                    'gallery'=>public_path(),
                    'url'=>$url,
                    'inviteId'=>$id,
                    'message'=>'Фото успішно додано!',
                    'invitePhotos'=>$invitePhotos
                ], 200);
                }

    }

    public function deletePhoto($id, $type){
        $res = DB::table('invites')
            ->where('id', $id)
            ->first();
        if($type === "photo"){
            $photo = $res->photo;
            $name = pathinfo($photo);
            Storage::delete('public/photos/'.$name['basename']);

            $result = DB::table('invites')
            ->where('id', $id)
            ->update([
                'photo'=>""
            ]);
        }

        if($type === "timerphoto"){
            $photo = $res->photo;
            $name = pathinfo($photo);
            Storage::delete('public/timers/'.$name['basename']);

            $result = DB::table('invites')
            ->where('id', $id)
            ->update([
                'timerphoto'=>""
            ]);
        }

        if($type === "gallery"){
            $photo = DB::table('invite_photos')
            ->where('id', $id)
            ->first();

            if(!$photo){
                return response() -> json([
                    'status'=>'false',
                    'message'=>'Photo not found!'
                ], 404);
            }

            $name = pathinfo($photo->photo_name);
            Storage::delete('public/gallery/'.$photo->invite_id.'/'.$name['basename']);

            $result = DB::table('invite_photos')
             ->where('id', '=', $id)
             ->delete();
        }

        return response() -> json([
            'status'=>'true',
            'type'=>$type,
            'message'=>"Photo deleted!",
            'inviteId'=>$id,
            'id'=>$id,
            'file'=>$photo,
            'basename'=>$name['basename']
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

    public function fetchOneInviteById($id){
        $group = DB::table('invite_groups')
            ->where('invite_id', $id)
            ->where('link', '!=', '')
            ->first();

        if(!$group){
            return response() -> json([
                'status'=>"false",
                'message'=>'Додайте хоча б одного гостя до списку',
            ],404);
        }
        if($group->link === "" || $group->link === null){
            return response() -> json([
                'status'=>"false",
                'message'=>'Помилка. Відсутнє посилання на запрошення.',
            ],404);
        }
        return $this->fetchOneInviteByLink($group->link);
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

        /** select invitation theme */
        if($invite -> theme_id === null){
            $invite -> theme_id = 1;
        }
        $theme = DB::table('invite_themes')
        ->where('id', $invite -> theme_id)
        ->first();
        $invite -> inviteTheme = $theme;

        return response() -> json([
            'invite'=>$invite,
            'theme'=>$theme,
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

    public function updateGuestTransfer(Request $request){
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

    public function changeInvitationTheme(Request $request){

        $theme = DB::table('invite_themes')
        ->where('css', $request->css)
        ->first();

        DB::table('invites')
        ->where('id', $request->invite_id)
        ->update([
            'theme_id'=> $theme->id
        ]);

        return response() -> json([
            'status'=>"true",
            'message'=>'Тему запрошення успішно змінено!',
            'inviteTheme'=>$theme,
            'theme_id'=>$theme->id,
        ], 200);
    }
}

