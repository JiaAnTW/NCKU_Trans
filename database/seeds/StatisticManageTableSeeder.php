<?php

use Illuminate\Database\Seeder;

use App\Http\Controllers\StatisticManageController;
use Illuminate\Http\Request;

class StatisticManageTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        try {
            $controller = new StatisticManageController;
            $controller->create(new Request([
                "name" => "GPA4.0",
                "dataType" => "float",
                "max" => 4.0,
                "min" => 0.0,
            ]));
            $controller->create(new Request([
                "name" => "GPA4.3",
                "dataType" => "float",
                "max" => 4.3,
                "min" => 0.0,
            ]));
            $controller->create(new Request([
                "name" => "TOEIC",
                "dataType" => "int",
                "max" => 990,
                "min" => 0,
            ]));
            $controller->create(new Request([
                "name" => "IELTS",
                "dataType" => "float",
                "max" => 9.0,
                "min" => 0.0,
            ]));
            $controller->create(new Request([
                "name" => "JLPT",
                "dataType" => "string",
            ]));
            $controller->create(new Request([
                "name" => "學年成績",
                "dataType" => "float",
                "max" => 100.0,
                "min" => 0.0,
            ]));
            $controller->create(new Request([
                "name" => "TOFEL iBT",
                "dataType" => "int",
                "max" => 990,
                "min" => 0,
            ]));
            $controller->create(new Request([
                "name" => "LEVEL",
                "dataType" => "int",
                "max" => 5,
                "min" => 1,
            ]));
            $controller->create(new Request([
                "name" => "等第",
                "dataType" => "string",
            ]));
        } catch (Exception $e) {
            error_log($e->getMessage());
        }
    }
}
