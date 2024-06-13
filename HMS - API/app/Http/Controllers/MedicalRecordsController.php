<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MedicalRecord;

class MedicalRecordsController extends Controller
{
    public function index()
    {
        $medical_records = MedicalRecord::with(['patient', 'doctor', ])->orderBy('created_at', 'desc')->get();
        return response()->json($medical_records);
    }

    // Create a new medical records
    public function store(Request $request){
        $medical_records = MedicalRecord::create([
            'patient_id' => $request->patient_id,
            'doctor_id' => $request->doctor_id,
            'patient_name' => $request->patient_name,
            'doctor_name' => $request->doctor_name,
            'diagnosis' => $request->diagnosis,
            'treatment' => $request->treatment,
            'prescription' => $request->prescription,
        ]);

        return response()->json($medical_records, 201);
    }

     // Fetch a single product by ID
     public function show($id){
        $medical_records = MedicalRecord::find($id);
        // if (!$product) {
        //     return response()->json(['message' => 'Product not found'], 404);
        // }
        return response()->json($medical_records, 200);
    }

    // Update an existing product
    public function update(Request $request, $id)
    {
        $medical_records = MedicalRecord::find($id);
        $medical_records->update([
            'patient_id' => $request->patient_id,
            'doctor_id' => $request->doctor_id,
            'patient_name' => $request->patient_name,
            'doctor_name' => $request->doctor_name,
            'diagnosis' => $request->diagnosis,
            'treatment' => $request->treatment,
            'presciption' => $request->presciption,
            'user_id' => $request->user_id
        ]);
        return response()->json($medical_records, 200);
    }

    public function search($name){
        $medical_records = MedicalRecord::with('patient')->where('diagnosis', 'like', '%' . $name . '%')->get();
        return response()->json($medical_records, 200);        
    }

    // Delete a product
    public function destroy($id)
    {
        $medical_records = MedicalRecord::find($id);
        $medical_records->delete();
        return response()->json(null, 204);
    }
}
