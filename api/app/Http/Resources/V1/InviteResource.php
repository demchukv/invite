<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\V1\InviteGroupResource;
use App\Http\Resources\V1\InviteTimingResource;
use App\Http\Resources\V1\InvitePhotoResource;

class InviteResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'userId' => $this->user_id,
            'themeId' => $this->theme_id,
            'nameOne' => $this->name_one,
            'nameTwo' => $this->name_two,
            'endPoint' => $this->end_point,
            'photo' => $this->photo,
            'placeOne' => $this->place_one,
            'mapUrlOne' => $this->map_url_one,
            'placeTwo' => $this->place_two,
            'mapUrlTwo' => $this->map_url_two,
            'invitation' => $this->invitation,
            'postinvite' => $this->postinvite,
            'deadline' => $this->deadline,
            'thankyou' => $this->thankyou,
            'timerphoto' => $this->timerphoto,
            'addition' => $this->addition,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
            'inviteGroups' => InviteGroupResource::collection($this->whenLoaded('inviteGroups')),
            'inviteTimings' => InviteTimingResource::collection($this->whenLoaded('inviteTimings')),
            'invitePhotos' => InvitePhotoResource::collection($this->whenLoaded('invitePhotos')),
        ];
    }
}
