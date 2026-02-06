<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Division;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
      
        User::create([
            'name' => 'Admin Aksamedia',
            'username' => 'admin',
            'email' => 'admin@aksamedia.com',
            'password' => Hash::make('pastibisa'), 
            'phone' => '082325720215',
        ]);

       
        $divisions = [
            'Mobile Apps', 
            'QA', 
            'Full Stack', 
            'Backend', 
            'Frontend', 
            'UI/UX Designer'
        ];

        foreach ($divisions as $name) {
            Division::create([
                'name' => $name
            ]);
        }
    }
}