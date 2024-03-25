<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Invite;
use App\Models\InviteGroup;

class InviteGuest extends Model
{
    use HasFactory;

    public function inviteGroups(){
        return $this -> belongsTo(InviteGroup::class);
    }
}
