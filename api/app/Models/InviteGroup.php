<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Invite;
use App\Models\InviteGuest;

class InviteGroup extends Model
{
    use HasFactory;

    protected $fillable = [
        'invite_id',
        'w1',
        'w2',
        'transfer',
        'link'
    ];

    public function invites(){
        return $this -> belongsTo(Invite::class);
    }

    public function inviteGuests(){
        return $this->hasManyThrough(InviteGuest::class, InviteGroup::class, 'id', 'invite_group_id');
    }

}
