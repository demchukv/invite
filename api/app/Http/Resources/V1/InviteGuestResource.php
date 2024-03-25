<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InviteGuestResource extends JsonResource
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
            'inviteGroupId' => $this->invite_group_id,
            'name' => $this->name,
            'willbe1' => $this->willbe1,
            'willbe2' => $this->willbe2,
        ];
    }
}
