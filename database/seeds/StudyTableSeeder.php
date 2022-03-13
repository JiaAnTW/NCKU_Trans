<?php

use App\CategoryManage;
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
            $categories = array(["id" => CategoryManage::all(['id'])->pluck('id')[0]]);
            array_push($categories, array("id" => CategoryManage::all(['id'])->pluck('id')[1]));
            $statistics = array(["name" => "TOEIC", "value" => "110"]);
            array_push($statistics, array("name" => "GPA4.3", "value" => "4.0"));
            array_push($statistics, array("name" => "GPA4.0", "value" => "3.9"));
            $otherstat = array(["name" => "TOEFL","value" => "100"]);
            array_push($otherstat, array("name" => "PET","value" => "pass"));
            array_push($otherstat, array("name" => "IELTS","value" => "5.5"));
            $request = new Request([
                "title" => "心得1",
                "content" => "test",
                "year" => 110,
                "category" => $categories,
                "statistic" => $statistics,
                "confirm" => "true",
                "otherStatistic" => $otherstat
            ]);
            $request->setMethod('POST');
            $controller->create($request);

            $categories = array(["id" => CategoryManage::all(['id'])->pluck('id')[1]]);
            array_push($categories, array("id" => CategoryManage::all(['id'])->pluck('id')[2]));
            $statistics = array(["name" => "TOEIC", "value" => "550"]);
            array_push($statistics, array("name" => "GPA4.3", "value" => "3.7"));
            array_push($statistics, array("name" => "GPA4.0", "value" => "3.5"));
            $otherstat = array(["name" => "TOEFL","value" => "10"]);
            array_push($otherstat, array("name" => "PET","value" => "fail"));
            array_push($otherstat, array("name" => "IELTS","value" => "2.0"));
            $request = new Request([
                "title" => "某公司實習心得",
                "content" => "在某公司實習後，覺得不賴，推薦其他人應徵",
                "year" => 109,
                "category" => $categories,
                "statistic" => $statistics,
                "confirm" => "false",
                "otherStatistic" => $otherstat
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
