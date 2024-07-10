<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\InviteGroup;
use App\Models\InvitePhoto;
use App\Models\InviteTiming;

class Invite extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'user_id',
        // 'theme_id',
        'name_one',
        'name_two',
        'end_point',
        'place_one',
        'map_url_one',
        'place_two',
        'map_url_two',
        'invitation',
        'postinvite',
        'deadline',
        'thankyou',
        'timerphoto',
        'addition',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function inviteGroups()
    {
        return $this->hasMany(InviteGroup::class);
    }

    public function invitePhotos()
    {
        return $this->hasMany(InvitePhoto::class);
    }

    public function inviteTimings()
    {
        return $this->hasMany(InviteTiming::class);
    }
}
