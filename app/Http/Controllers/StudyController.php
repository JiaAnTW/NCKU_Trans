<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StudyController extends Controller
{

    public function show()
    {
        
    }

    public function index()
    {
        $data = [
            "data" => array([
                "id" => 1,
                "title" => "心得1",
                "content" => "test",
                "timestamp" => time(),
                "category" => array(["id" => 3, "name" => "出國交換"],["id" => 2, "name" => "QA"]),
                "statistic" =>  array(["id" => 1, "name" => "TOEFL" , "value" => "110"], ["id" => 2, "name" => "GPA4.3" , "value" => "4.2"]),
                "confirm" => true,
            ],
            [
                "id" => 2,
                "title" => "心得2",
                "content" => "test",
                "timestamp" => time(),
                "category" => array(["id" => 4, "name" => "實習"],["id" => 2, "name" => "QA"]),
                "statistic" =>  array(["id" => 3, "name" => "TOEIC" , "value" => "700"], ["id" => 3, "name" => "GPA4.3" , "value" => "3.7"]),
                "confirm" => false,
            ],[
                "id" => 3,
                "title" => "心得3",
                "content" => "test",
                "timestamp" => time(),
                "category" => array(["id" => 3, "name" => "出國交換"]),
                "statistic" =>  array(["id" => 3, "name" => "IELTS" , "value" => "5.5"], ["id" => 3, "name" => "GPA4.3" , "value" => "3.5"]),
                "confirm" => true,
            ],[
                "id" => 4,
                "title" => "心得4",
                "content" => "test",
                "timestamp" => time(),
                "category" => array(["id" => 3, "name" => "出國交換"]),
                "statistic" =>  array(["id" => 3, "name" => "TOEIC" , "value" => "730"], ["id" => 3, "name" => "GPA4.3" , "value" => "3.8"]),
                "confirm" => false,
            ],[
                "id" => 5,
                "title" => "心得5",
                "content" => "test",
                "timestamp" => time(),
                "category" => array(["id" => 4, "name" => "實習"]),
                "statistic" =>  array(["id" => 3, "name" => "TOEIC" , "value" => "500"], ["id" => 3, "name" => "GPA4.3" , "value" => "3.0"]),
                "confirm" => false,
            ])
        ];

        return $data;
    }
    //新增一筆資料
    public function create(Request $request)
    {
        
        
    }

    //儲存資料
    public function store(Request $request)
    {
        
    }

    //編輯一筆資料
    public function edit($id)
    {
        
    }

    //更新一筆資料
    public function update(Request $request, $id)
    {
        
    }

    //刪除一筆資料
    public function destroy($id)
    {
        
    }
}