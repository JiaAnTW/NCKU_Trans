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
                "studyType" => "QA",
            ]);
            $request->setMethod('POST');
            $controller->create($request);
            $request = new Request([
                "studyType" => "出國交換",
            ]);
            $request->setMethod('POST');
            $controller->create($request);
            $request = new Request([
                "studyType" => "實習",
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
