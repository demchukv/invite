<?php

namespace App\Http\Requests\V1;

use Illuminate\Foundation\Http\FormRequest;

class StoreInviteTimingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'inviteId' => ['required'],
            'eventTime' => ['required'],
            'eventDesc' => ['required'],
        ];
    }

    protected function prepareForValidation()
    {
        $this -> merge([
            'invite_id' => $this -> inviteId,
            'event_time' => $this -> eventTime,
            'event_desc' => $this -> eventDesc,
        ]);
    }
}
