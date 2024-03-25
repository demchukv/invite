<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InvitePhotoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this -> id,
            "inviteId" => $this -> invite_id,
            "photoName" => $this -> photo_name,
            "createdAt" => $this -> created_at,
            "updatedAt" => $this -> updated_at
        ];
    }
}
