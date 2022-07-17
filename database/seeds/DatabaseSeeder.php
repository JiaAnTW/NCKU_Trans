<?php

use Illuminate\Database\Seeder;

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
        $this->call('CollegeTableSeeder');
        $this->call('DepartmentTableSeeder');
        $this->call('CommentTableSeeder');
        $this->call('StatisticManageTableSeeder');
        $this->call('CategoryManageTableSeeder');
        $this->call('StudyTableSeeder');
    }
}
