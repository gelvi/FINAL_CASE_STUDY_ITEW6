<?php

namespace Database\Factories;

use App\Models\Patient;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Patient>
 */
class PatientFactory extends Factory
{
    protected $model = Patient::class;

    public function definition()
    {
        return [
            'user_id' => \App\Models\User::factory(),
            'firstname' => $this->faker->firstName,
            'lastname' => $this->faker->lastName,
            'email' => fake()->unique()->safeEmail(),
            'date_of_birth' => $this->faker->date,
            'gender' => $this->faker->randomElement(['Male', 'Female']),
            'address' => $this->faker->address,
            'phone' => $this->faker->phoneNumber,
            'medical_history' => $this->faker->sentence,
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        ];
    }
}
