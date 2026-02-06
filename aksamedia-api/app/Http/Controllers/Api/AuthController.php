<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User; 

class AuthController extends Controller
{
    public function login(Request $request) 
    {

        $request->validate([
            'username' => 'required',
            'password' => 'required',
        ]);


        if (!Auth::attempt($request->only('username', 'password'))) {
            return response()->json([
                'status' => 'error', 
                'message' => 'Username atau password salah'
            ], 401);
        }

        $user = User::where('username', $request->username)->first();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'status' => 'success',
            'message' => 'Login success',
            'data' => [
                'token' => $token,
                'admin' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'username' => $user->username,
                    'phone' => $user->phone,
                    'email' => $user->email,
                ],
            ]
        ]);
    }

   // app/Http/Controllers/Api/AuthController.php

    public function logout(Request $request)
    {
        try {

            $request->user()->currentAccessToken()->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Berhasil logout'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal logout: ' . $e->getMessage()
            ], 500);
        }
    }
}