<?php

namespace Database\Factories;

use App\Models\Doctor;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Doctor>
 */
class DoctorFactory extends Factory
{
    protected $model = Doctor::class;
    
    public function definition()
    {
        return [
            'user_id' => \App\Models\User::factory(),
            'firstname' => $this->faker->firstName,
            'lastname' => $this->faker->lastName,
            'email' => fake()->unique()->safeEmail(),
            'specialization' => $this->faker->randomElement(['Cardiology', 'Dermatology', 'Neurology', 'Orthopedics']),
            'license_number' => Str::random(10),
            'years_of_experience' => $this->faker->numberBetween(1, 40),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        ];
    }
}
