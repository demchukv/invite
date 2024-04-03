<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\InviteGroup;

class InviteGuest extends Model
{
    use HasFactory;

    protected $fillable = [
        'invite_group_id',
        'name',
        'willbe',
    ];

    public function inviteGroups(){
        return $this -> belongsTo(InviteGroup::class);
    }
}
