<?php

use Illuminate\Database\Seeder;
use App\User;

class UserTableSeeder extends Seeder {

    public function run()
    {
        DB::table('users')->delete();

        User::create([
            'id' => 0,
            'name' => 'nckutrans',
            'email'    => 'nckutrans@gmail.com',
            'password' => Hash::make('nckutrans001'),
        ]);
    }
}