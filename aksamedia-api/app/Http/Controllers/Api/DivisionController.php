<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Division;
use Illuminate\Http\Request;

class DivisionController extends Controller
{
    public function index(Request $request)
{

    $name = $request->json('name'); 

    $query = Division::query();

    if ($name) {
        $query->where('name', 'like', '%' . $name . '%');
    }

    $divisions = $query->paginate(10);

    return response()->json([
        'status' => 'success',
        'message' => 'Berhasil mengambil data divisi',
        'data' => [
            'divisions' => $divisions->items(),
        ],
        'pagination' => $divisions
    ]);
}
}