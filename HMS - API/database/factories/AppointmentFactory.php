<?php

namespace Database\Factories;

use App\Models\Appointment;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Appointment>
 */
class AppointmentFactory extends Factory
{
    protected $model = Appointment::class;
    
    public function definition()
    {
        return [
            'patient_id' => \App\Models\Patient::factory(),
            'doctor_id' => \App\Models\Doctor::factory(),
            'appointment_date' => $this->faker->dateTimeBetween('+1 week', '+1 month'),
            'reason' => $this->faker->sentence,
            'status' => $this->faker->randomElement(['Scheduled', 'Completed', 'Cancelled']),
        ];
    }
}
