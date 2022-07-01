<?php

use Illuminate\Database\Seeder;

use App\Http\Controllers\CategoryManageController;
use Illuminate\Http\Request;

class CategoryManageTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        try {
            $controller = new CategoryManageController;
            $controller->create(new Request([
                "name" => "QA",
            ]));
            $controller->create(new Request([
                "name" => "出國交換",
            ]));
            $controller->create(new Request([
                "name" => "實習",
            ]));
            $controller->create(new Request([
                "name" => "預研",
            ]));
            $controller->create(new Request([
                "name" => "推甄",
            ]));
            $controller->create(new Request([
                "name" => "獎學金",
            ]));
            $controller->create(new Request([
                "name" => "學程",
            ]));
            $controller->create(new Request([
                "name" => "學校行政",
            ]));
        } catch (Exception $e) {
            error_log($e->getMessage());
        }
    }
}
