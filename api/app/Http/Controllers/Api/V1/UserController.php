<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserController extends Controller
{
    use HasFactory;

    public function __construct()
    {
        $this->middleware('auth:sanctum', ['except' => ['login', 'register']]);
    }

    /**
     * Display a listing of the invites.
     */

    public function login(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'email' => 'required|email',
                'password' => 'required|string|min:6'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => $validator->errors()->first()
                ], 401);
            }

            $credentials = request(['email', 'password']);
            if (!auth()->attempt($credentials)) {
                return response()->json([
                    'status' => false,
                    'message' => "Unauthorized, check your login credentials"
                ], 401);
            }
            $user = $request->user();
            $token = $user->createToken('Personal access token', ['user'])->plainTextToken;

            return response()->json([
                'status' => true,
                'token' => $token,
                'user' => $user
            ], 200);
        }catch(\Throwable $th){
            return response()->json([
                'status' => false,
                'message' => $th -> getMessage()
            ], 500);
        }
    }

    public function register(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|between:2,100',
                'email' => 'required|string|email|max:100|unique:users',
                'password' => 'required|string|confirmed|min:6'
            ]);
            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => $validator->errors()->first()
                ], 401);
            }
            $user = User::create(array_merge(
                $validator->validated(),
                ['password' => bcrypt($request->password)]
            ));

            $token = $user->createToken('Personal access token', ['user'])->plainTextToken;

            return response()->json([
                'status' => true,
                'message' => "User successfully registered!",
                'token' => $token,
                'user' => $user
            ], 200);
        }catch(\Throwable $th){
            return response()->json([
                'status' => false,
                'message' => $th -> getMessage()
            ], 500);
        }
    }

    public function profile()
    {
        try {
            return response()->json(auth()->user());
        }catch(\Throwable $th){
            return response()->json([
                'status' => false,
                'message' => $th -> getMessage()
            ], 500);
        }
    }

    public function logout(Request $request)
    {
        try {
            $request->user()->currentAccessToken()->delete();
            return response()->json([
                'status' => true,
                'message' => "User successfully logged out!"
            ]);
        }catch(\Throwable $th){
            return response()->json([
                'status' => false,
                'message' => $th -> getMessage()
            ], 500);
        }
    }

}
