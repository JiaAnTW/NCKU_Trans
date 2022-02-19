<?php

use Illuminate\Database\Seeder;

use App\Http\Controllers\StudyController;
use Illuminate\Http\Request;


class StudyTableSeeder extends Seeder
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
            $controller = new StudyController;
            $categories = array(["name" => "出國交換"]);
            array_push($categories, array("name" => "QA"));
            $statistics = array(["name" => "TOEIC","value" => "110"]);
            array_push($statistics, array("name" => "GPA4.3","value" => "4.0"));
            array_push($statistics, array("name" => "GPA4.0","value" => "3.9"));
            $request = new Request([
                "title" => "心得1",
                "content" => "test",
                "category" => $categories,
                "statistic" => $statistics,
                "confirm" => "false"
            ]);
            $request->setMethod('POST');
            $controller->create($request);

            $categories = array(["name" => "實習"]);
            array_push($categories, array("name" => "某公司"));
            $statistics = array(["name" => "TOEIC","value" => "550"]);
            array_push($statistics, array("name" => "GPA4.3","value" => "3.7"));
            array_push($statistics, array("name" => "GPA4.0","value" => "3.5"));
            $request = new Request([
                "title" => "某公司實習心得",
                "content" => "在某公司實習後，覺得不賴，推薦其他人應徵",
                "category" => $categories,
                "statistic" => $statistics,
                "confirm" => "false"
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
