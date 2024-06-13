<?php

namespace Database\Factories;

use App\Models\Appointment;
use App\Models\Patient;
use App\Models\Doctor;
use Illuminate\Database\Eloquent\Factories\Factory;

class AppointmentFactory extends Factory
{
    protected $model = Appointment::class;
    
    public function definition()
    {
        // Retrieve a random patient and doctor
        $patient = Patient::inRandomOrder()->first();
        $doctor = Doctor::inRandomOrder()->first();
        
        return [
            'user_id' => \App\Models\User::factory(),
            'patient_id' => $patient->id,
            'doctor_id' => $doctor->id,
            'patient_name' => $patient->firstname . ' ' . $patient->lastname,
            'doctor_name' => $doctor->firstname . ' ' . $doctor->lastname,
            'appointment_date' => $this->faker->dateTimeBetween('+1 week', '+1 month'),
            'reason' => $this->faker->sentence,
            'status' => $this->faker->randomElement(['Scheduled', 'Completed', 'Cancelled']),
        ];
    }
}
