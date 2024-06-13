<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    // Fetch all appointments
    public function index()
    {
        $appointments = Appointment::with(['patient', 'doctor'])->orderBy('created_at', 'desc')->get();
        return response()->json($appointments);
    }

    public function store(Request $request)
    {
        $request->validate([
            'patient_id' => 'required|exists:patients,id',
            'doctor_id' => 'required|exists:doctors,id',
            'patient_name' => 'required|string',
            'doctor_name' => 'required|string',
            'appointment_date' => 'required|date',
            'reason' => 'required|string',
            'status' => 'required|string|in:Scheduled,Completed,Cancelled',
            'user_id' => 'required|exists:users,id',
        ]);

        $appointment = Appointment::create([
            'patient_id' => $request->patient_id,
            'doctor_id' => $request->doctor_id,
            'patient_name' => $request->patient_name,
            'doctor_name' => $request->doctor_name,
            'appointment_date' => $request->appointment_date,
            'reason' => $request->reason,
            'status' => $request->status,
            'user_id' => $request->user_id
        ]);

        return response()->json($appointment, 201);
    }


    // Fetch a single appointment by ID
    public function show($id)
    {
        $appointment = Appointment::with(['patient', 'doctor'])->find($id);
        // if (!$appointment) {
        //     return response()->json(['message' => 'Appointment not found'], 404);
        // }
        return response()->json($appointment, 200);
    }

    // Update an existing appointment
    public function update(Request $request, $id)
    {
        $appointment = Appointment::find($id);
        // if (!$appointment) {
        //     return response()->json(['message' => 'Appointment not found'], 404);
        // }

        $appointment->update([
            'patient_id' => $request->patient_id,
            'doctor_id' => $request->doctor_id,
            'patient_name' => $request->patient_name,
            'doctor_name' => $request->doctor_name,
            'appointment_date' => $request->appointment_date,
            'reason' => $request->reason,
            'status' => $request->status,
            'user_id' => $request->user_id,
        ]);

        return response()->json($appointment, 200);
    }

    // Search appointments by patient or doctor name
    public function search($name)
    {
        $appointments = Appointment::with(['patient', 'doctor'])
            ->whereHas('patient', function($query) use ($name) {
                $query->where('firstname', 'like', '%' . $name . '%')
                    ->orWhere('lastname', 'like', '%' . $name . '%');
            })
            ->orWhereHas('doctor', function($query) use ($name) {
                $query->where('firstname', 'like', '%' . $name . '%')
                    ->orWhere('lastname', 'like', '%' . $name . '%');
            })
            ->get();

        return response()->json($appointments, 200);
    }


    // public function search($name)
    // {
    //     $appointments = Appointment::with(['patient', 'doctor'])
    //         ->where('patient_name', 'like', '%' . $name . '%')
    //         ->orWhere('doctor_name', 'like', '%' . $name . '%')
    //         ->get();

    //     return response()->json($appointments, 200);
    // }

    // Delete an appointment
    public function destroy($id)
    {
        $appointment = Appointment::find($id);
        // if (!$appointment) {
        //     return response()->json(['message' => 'Appointment not found'], 404);
        // }
        $appointment->delete();
        return response()->json(null, 204);
    }
}
