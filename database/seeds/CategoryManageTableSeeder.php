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
        try
        {
            $controller = new CategoryManageController;
            $request = new Request([
                "name" => "學校行政",
            ]);
            $request->setMethod('POST');
            $controller->create($request);
            $request = new Request([
                "name" => "出國交換",
            ]);
            $request->setMethod('POST');
            $request = new Request([
                "name" => "學程",
            ]);
            $request->setMethod('POST');
            $controller->create($request);
            $request = new Request([
                "name" => "實習",
            ]);
            $request->setMethod('POST');
            $controller->create($request);
            $request = new Request([
                "name" => "獎學金",
            ]);
            $request->setMethod('POST');
            $controller->create($request);
        }
        catch(Exception $e)
        {
            error_log($e->getMessage());
        }

    }
}
