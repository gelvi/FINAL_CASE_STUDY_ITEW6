<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Patient;
use App\Models\Doctor;
use App\Models\Appointment;
use App\Models\MedicalRecord;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // Seed users
        User::factory()->count(10)->create();
        Patient::factory()->count(10)->create();
        Doctor::factory()->count(5)->create();
        Appointment::factory()->count(20)->create();
        MedicalRecord::factory()->count(30)->create();
    }
}
