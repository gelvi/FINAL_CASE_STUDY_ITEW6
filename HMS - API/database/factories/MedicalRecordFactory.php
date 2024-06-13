<?php

namespace Database\Factories;

use App\Models\MedicalRecord;
use App\Models\Patient;
use App\Models\Doctor;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MedicalRecord>
 */
class MedicalRecordFactory extends Factory
{
    protected $model = MedicalRecord::class;
    
    public function definition()
    {

        // Retrieve a random patient and doctor
        $patient = Patient::inRandomOrder()->first();
        $doctor = Doctor::inRandomOrder()->first();

        return [
            'patient_id' => \App\Models\Patient::factory(),
            'doctor_id' => \App\Models\Doctor::factory(),
            'patient_name' => $patient->firstname . ' ' . $patient->lastname,
            'doctor_name' => $doctor->firstname . ' ' . $doctor->lastname,
            'diagnosis' => $this->faker->sentence,
            'treatment' => $this->faker->sentence,
            'prescription' => $this->faker->sentence,
        ];
    }
}
