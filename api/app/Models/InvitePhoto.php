<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Invite;

class InvitePhoto extends Model
{
    use HasFactory;

    public function invites(){
        return $this -> belongsTo(Invite::class);
    }

}
