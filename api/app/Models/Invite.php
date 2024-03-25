<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\InviteGroup;
use App\Models\InvitePhoto;
use App\Models\InviteTiming;
use App\Models\InviteGuest;

class Invite extends Model
{
    use HasFactory;

    public function user(){
        return $this -> belongsTo(User::class);
    }

    public function inviteGroups()
    {
        return $this -> hasMany(InviteGroup::class);
    }

    public function invitePhotos(){
        return $this -> hasMany(InvitePhoto::class);
    }

    public function inviteTimings(){
        return $this -> hasMany(InviteTiming::class);
    }


}
