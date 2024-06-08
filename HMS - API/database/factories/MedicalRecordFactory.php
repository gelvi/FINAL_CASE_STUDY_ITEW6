<?php

namespace Database\Factories;

use App\Models\MedicalRecord;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MedicalRecord>
 */
class MedicalRecordFactory extends Factory
{
    protected $model = MedicalRecord::class;
    
    public function definition()
    {
        return [
            'patient_id' => \App\Models\Patient::factory(),
            'doctor_id' => \App\Models\Doctor::factory(),
            'appointment_id' => \App\Models\Appointment::factory(),
            'diagnosis' => $this->faker->sentence,
            'treatment' => $this->faker->sentence,
            'prescription' => $this->faker->sentence,
        ];
    }
}
