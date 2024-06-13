<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Patient;
use App\Models\Doctor;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'firstname' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => [
                'required',
                'string',
                'min:8',
                'confirmed',
                'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/'
            ],
            'role' => 'required|string',
            // Additional rules for Doctor
            'specialization' => 'required_if:role,Doctor|string|max:255',
            'license_number' => 'required_if:role,Doctor|string|max:255',
            'years_of_experience' => 'required_if:role,Doctor|integer|min:0',
            // Additional rules for Patient
            'date_of_birth' => 'required_if:role,Patient|date',
            'gender' => 'required_if:role,Patient|string|in:Male,Female',
            'address' => 'required_if:role,Patient|string|max:255',
            'phone' => 'required_if:role,Patient|string|max:15',
        ], [
            'email.unique' => 'The email has already been taken.',
            'password.min' => 'The password must be at least 8 characters.',
            'password.confirmed' => 'The password confirmation does not match.',
            'password.regex' => 'The password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $user = User::where('email', $request->email)->first();

        if ($user) {
            return response()->json(['message' => 'Email already exists'], 400);
        }

        // Proceed with registration based on the selected role
        switch ($request->role) {
            case 'Admin':
                    $user = User::create([
                    'firstname' => $request->firstname,
                    'lastname' => $request->lastname,
                    'email' => $request->email,
                 
                    'password' => Hash::make($request->password),
                    'role' => $request->role,
                    'remember_token' => Str::random(10),
                ]);
                break;
            case 'Doctor':
                $user = User::create([
                    'firstname' => $request->firstname,
                    'lastname' => $request->lastname,
                    'email' => $request->email,
                   
                    'password' => Hash::make($request->password),
                    'role' => $request->role,
                    'remember_token' => Str::random(10),
                ]);
            
                Doctor::create([
                    'user_id' => $user->id,
                    'firstname' => $user->firstname, // Retrieve from User model
                    'lastname' => $user->lastname, // Retrieve from User model
                    'email' => $request->email,
                    'specialization' => $request->specialization,
                    'license_number' => $request->license_number,
                    'years_of_experience' => $request->years_of_experience,
                    'password' => Hash::make($request->password),
                ]);
                break;
            case 'Patient':
                $user = User::create([
                    'firstname' => $request->firstname,
                    'lastname' => $request->lastname,
                    'email' => $request->email,
                 
                    'password' => Hash::make($request->password),
                    'role' => $request->role,
                    'remember_token' => Str::random(10),
                ]);
            
                Patient::create([
                    'user_id' => $user->id,
                    'firstname' => $user->firstname, // Retrieve from User model
                    'lastname' => $user->lastname, // Retrieve from User model
                    'email' => $request->email,
                    'password' => Hash::make($request->password),
                    'date_of_birth' => $request->date_of_birth,
                    'gender' => $request->gender,
                    'address' => $request->address,
                    'phone' => $request->phone,
                    'medical_history' => $request->medical_history,
                ]);
                break;
            default:
                // Handle invalid role
                return response()->json(['message' => 'Invalid role selected'], 400);
        }

        return response()->json(['message' => 'User registered successfully'], 201);
    }

    public function login(Request $request)
{
    $request->validate([
        'email' => 'required|email',
        'password' => 'required|string',
    ]);

    if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
        $user = Auth::user();
        $tokenName = $user->firstname . ' ' . $user->lastname; // Construct the name
        $token = $user->createToken($tokenName)->plainTextToken;

        // Determine the redirection path based on the user's role
        $redirectPath = match ($user->role) {
            'Admin' => '/admin',
            'Doctor' => '/doctordashboard',
            'Patient' => '/patientdashboard',
            default => '/',
        };

        return response()->json(['token' => $token, 'user_id' => $user->id, 'role' => $user->role, 'redirect' => $redirectPath], 200);
    }

    return response()->json(['message' => 'Invalid email or password'], 401);
}


}