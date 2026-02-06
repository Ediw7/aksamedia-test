<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class EmployeeController extends Controller
{
    // Tugas 3: Get All Employees
    public function index(Request $request)
    {
        $name = $request->json('name');
        $division_id = $request->json('division_id');

        $query = Employee::with('division');

        $query->when($name, function ($q) use ($name) {
            return $q->where('name', 'like', '%' . $name . '%');
        });

        $query->when($division_id, function ($q) use ($division_id) {
            return $q->where('division_id', $division_id);
        });
    
        $employees = $query->paginate(10);
    
        return response()->json([
            'status' => 'success',
            'message' => 'Berhasil mengambil data karyawan',
            'data' => [
                'employees' => $employees->map(function ($emp) {
                    return [
                        'id' => $emp->id,
                        'image' => asset('storage/' . $emp->image),
                        'name' => $emp->name,
                        'phone' => $emp->phone,
                        'division' => [
                            'id' => $emp->division->id,
                            'name' => $emp->division->name
                        ],
                        'position' => $emp->position,
                    ];
                }),
            ],
            'pagination' => $employees
        ]);
    }

    // Tugas 4: Create Employee
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'name' => 'required',
            'phone' => 'required',
            'division' => 'required|exists:divisions,id',
            'position' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'message' => $validator->errors()->first()], 422);
        }

        $imagePath = $request->file('image')->store('employees', 'public');

        Employee::create([
            'image' => $imagePath,
            'name' => $request->name,
            'phone' => $request->phone,
            'division_id' => $request->division,
            'position' => $request->position,
        ]);

        return response()->json(['status' => 'success', 'message' => 'Employee created successfully']);
    }

    // Tugas 5: Update Employee
    public function update(Request $request, $id)
    {
        $employee = Employee::findOrFail($id);

    
        $request->validate([
            'name'     => 'required|string',
            'phone'    => 'required|string',
            'division' => 'required|exists:divisions,id',
            'position' => 'required|string',
        ]);

        
        $employee->update([
            'name'        => $request->name,
            'phone'       => $request->phone,
            'division_id' => $request->division,
            'position'    => $request->position,
        ]);

        return response()->json([
            'status'  => 'success',
            'message' => 'Data karyawan berhasil diperbarui',
        ]);
    }
    // Tugas 6: Delete Employee

    public function destroy($id)
    {
        try {
        
            $employee = Employee::findOrFail($id);

        
            if ($employee->image) {
                Storage::disk('public')->delete($employee->image);
            }


            $employee->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Employee deleted successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal menghapus data: ' . $e->getMessage()
            ], 500);
        }
    }
}