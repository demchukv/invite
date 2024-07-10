<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\V1\InviteGuestResource;

class InviteGroupResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this -> id,
            'inviteId' => $this -> invite_id,
            'w1' => $this -> w1,
            'w2' => $this -> w2,
            'transfer' => $this -> transfer,
            'link' => $this -> link,
            'inviteGuests' => InviteGuestResource::collection($this->whenLoaded('inviteGuests')),
        ];
    }
}
