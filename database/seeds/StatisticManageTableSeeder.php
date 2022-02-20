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
        try
        {
            $controller = new StatisticManageController;
                
            $request = new Request([
                    "name" => "GPA4.0",
                    "dataType" => "float",
                    "max" => 4.0,
                    "min" => 0.0,
                ]);
            $request->setMethod('POST');
            $controller->create($request);
            $request = new Request([
                "name" => "GPA4.3",
                "dataType" => "float",
                "max" => 4.3,
                "min" => 0.0,
            ]);
            $request->setMethod('POST');
            $controller->create($request);
            $request = new Request([
                "name" => "TOEIC",
                "dataType" => "int",
                "max" => 990,
                "min" => 0,
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
