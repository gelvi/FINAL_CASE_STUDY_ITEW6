<?php

namespace App\Http\Controllers;
use App\Models\Patient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class PatientController extends Controller
{
    public function index(){
        $patients = Patient::with('user')->orderBy('created_at', 'desc')->get();
        return response()->json($patients);
    }

    public function store(Request $request){
        $patient = Patient::create([
            
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'email' => $request->email,
            'date_of_birth' => $request->date_of_birth,
            'gender' => $request->gender,
            'address' => $request->address,
            'phone' => $request->phone,
            'medical_history' => $request->medical_history,
            'password' => Hash::make($request->password),
            'user_id' => $request->user_id
    
        ]);

        return response()->json(['message' => 'Patient created successfully', 'patient' => $patient], 201);
        // return response()->json($patient, 201);
    }

    public function show($id){
        $patient = Patient::find($id);
        return response()->json($patient, 200);
    }

    // public function search($title){
    //     $patients = Patient::with('user')->where('title', 'like', '%' . $title . '%')->get();
    //     return response()->json($patients, 200);        
    // }

    public function search($query)
    {
        $patients = Patient::with('user')
            ->where('firstname', 'like', '%' . $query . '%')
            ->orWhere('lastname', 'like', '%' . $query . '%')
            ->get();

        return response()->json($patients, 200);
    }

    public function update(Request $request, $id){
        $patient = Patient::find($id);
        $patient->update([
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'email' => $request->email,
            'date_of_birth' => $request->date_of_birth,
            'gender' => $request->gender,
            'address' => $request->address,
            'phone' => $request->phone,
            'medical_history' => $request->medical_history,
        ]);
        return response()->json($patient, 200);
    }

    public function destroy($id){
        $patient = Patient::find($id);
        $patient->delete();
        return response()->json(null, 204);
    }
}
