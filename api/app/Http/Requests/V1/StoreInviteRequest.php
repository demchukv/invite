<?php

namespace App\Http\Requests\V1;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreInviteRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $user =  auth('sanctum')->user();
        if(isset($user -> id)){
            return true;
        }else{
            return false;
        }
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'userId' => [],
            'themeId' => [],
            'nameOne' => ['required'],
            'nameTwo' => ['required'],
            'endPoint' => ['required'],
            'photo' => [],
            'placeOne' => [],
            'mapUrlOne' => [],
            'placeTwo' => [],
            'mapUrlTwo' => [],
            'invitation' => [],
            'postinvite' => [],
            'deadline' => [],
            'thankyou' => [],
            'addition' => [],
        ];
    }

    protected function prepareForValidation()
    {
        $this -> merge([
            'user_id' => auth('sanctum')->user()->id,
            'theme_id' => $this -> themeId,
            'name_one' => $this -> nameOne,
            'name_two' => $this -> nameTwo,
            'end_point' => $this -> endPoint,
            'place_one' => $this -> placeOne,
            'map_url_one' => $this -> mapUrlOne,
            'place_two' => $this -> placeTwo,
            'map_url_two' => $this -> mapUrlTwo,
        ]);
    }
}
