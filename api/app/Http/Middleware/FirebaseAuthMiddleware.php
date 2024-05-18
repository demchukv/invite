<?php

namespace App\Http\Middleware;

use Closure;
use Kreait\Firebase\Auth;
use Illuminate\Http\Request;

class FirebaseAuthMiddleware
{
    protected $firebaseAuth;

    public function __construct(Auth $firebaseAuth)
    {
        $this->firebaseAuth = $firebaseAuth;
    }

    public function handle(Request $request, Closure $next)
    {
        $token = $request->bearerToken();

        if (!$token) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        try {
            $verifiedToken = $this->firebaseAuth->verifyIdToken($token);
            $request->attributes->add(['firebase_user' => $verifiedToken->getClaim('sub')]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $next($request);
    }
}
