<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Invite;

class InviteTiming extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'invite_id',
        'event_time',
        'event_desc'
    ];

    public function invites(){
        return $this -> belongsTo(Invite::class);
    }
}

