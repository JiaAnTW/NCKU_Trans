<?php

use Illuminate\Database\Seeder;
//use Illuminate\Database\Seeder\UserTableSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call('UserTableSeeder');
        //$this->call(UsersTableSeeder::class);
    }
}
