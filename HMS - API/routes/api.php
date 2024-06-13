<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\MedicalRecordsController;

Route::middleware('auth:sanctum')->get('/doctor/details', [DoctorController::class, 'details']);

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// Routes for managing doctors
Route::get('/doctors', [DoctorController::class, 'index']);
Route::post('/newdoctors', [DoctorController::class, 'store']);
Route::get('/doctor/{id}', [DoctorController::class, 'show']);
Route::put('/updatedoctor/{id}', [DoctorController::class, 'update']);
Route::delete('/deletedoctor/{id}', [DoctorController::class, 'destroy']);
Route::get('/searchdoctor/{query}', [DoctorController::class, 'search']);

// Routes for managing patients 
Route::get('/patients', [PatientController::class, 'index']);
Route::post('/newpatients', [PatientController::class, 'store']);
Route::get('/patient/{id}', [PatientController::class, 'show']);
Route::put('/updatepatient/{id}', [PatientController::class, 'update']);
Route::delete('/deletepatient/{id}', [PatientController::class, 'destroy']);
Route::get('/searchpatient/{query}', [PatientController::class, 'search']);

// Routes for managing appointments
Route::get('/appointments', [AppointmentController::class, 'index']);
Route::post('/newappointments', [AppointmentController::class, 'store']);
Route::get('/appointment/{id}', [AppointmentController::class, 'show']);
Route::put('/updateappointment/{id}', [AppointmentController::class, 'update']);
Route::delete('/deleteappointment/{id}', [AppointmentController::class, 'destroy']);
Route::get('/searchappointment/{query}', [AppointmentController::class, 'search']);

// Routes for managing medical records
Route::get('/medicalrecords', [MedicalRecordsController::class, 'index']);
Route::post('/newmedicalrecords', [MedicalRecordsController::class, 'store']);
Route::get('/medicalrecord/{id}', [MedicalRecordsController::class, 'show']);
Route::put('/updatemedicalrecord/{id}', [MedicalRecordsController::class, 'update']);
Route::delete('/deletemedicalrecords/{id}', [MedicalRecordsController::class, 'destroy']);
Route::get('/searchmedicalrecord/{query}', [MedicalRecordsController::class, 'search']);
