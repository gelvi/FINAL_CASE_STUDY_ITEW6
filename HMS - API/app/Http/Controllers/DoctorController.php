<?php

namespace App\Http\Controllers;
use App\Models\Doctor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;


class DoctorController extends Controller
{
      // Fetch all doctors
      public function index(){
          $doctors = Doctor::with('user')->orderBy('created_at', 'desc')->get();
          return response()->json($doctors);
      }

      public function store(Request $request){
        $doctors = Doctor::create([
            
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'email' => $request->email,
            'specialization' => $request->specialization,
            'license_number' => $request->license_number,
            'years_of_experience' => $request->years_of_experience,
            'password' => Hash::make($request->password),
            'user_id' => $request->user_id
    
        ]);

        return response()->json(['message' => 'Doctor created successfully', 'doctors' => $doctors], 201);
        // return response()->json($patient, 201);
    }

    // Fetch a single Doctor by ID
    public function show($id){
        $doctor = Doctor::find($id);
        return response()->json($doctor, 200);
    }

    // Update an existing Doctor
    public function update(Request $request, $id)
    {
        $doctor = Doctor::find($id);
        $doctor->update([
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'email' => $request->email,
            'specialization' => $request->specialization,
            'license_number' => $request->license_number,
            'years_of_experience' => $request->years_of_experience,
            'medical_history' => $request->medical_history,
        ]);
        return response()->json($doctor, 200);
    }

    public function search($query)
    {
        $doctors = Doctor::with('user')
            ->where('firstname', 'like', '%' . $query . '%')
            ->orWhere('lastname', 'like', '%' . $query . '%')
            ->get();

        return response()->json($doctors, 200);
    }

    // Delete a Doctor
    public function destroy($id)
    {
        $doctor = Doctor::find($id);
        $doctor->delete();
        return response()->json(null, 204);
    }

    // Get details of the authenticated doctor
    public function details()
    {
        $doctor = Auth::user(); // Assuming you are using Sanctum or another authentication middleware
        return response()->json($doctor);
    }
}
