<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

//for uuid
use Illuminate\Support\Str;

use App\Study;
use App\Category;
class StudyController extends Controller
{

    public function show()
    {
        $studies = Study::select('id','title','content','created_at', 'confirm')->orderBy('created_at', 'desc')->get();

        for($i = 0; $i < count($studies); $i++) 
        {
            $studies[$i] = [
                "id" => $studies[$i]->id,
                "title" => $studies[$i]->title,
                "content" => $studies[$i]->content,
                "timestamp" => $studies[$i]->created_at,
                "confirm" => $studies[$i]->confirm,
                //select specific columns in Category without showing study_id
                "category" => $studies[$i]->categories->map( 
                    function($category){
                        return $category->only(['id','name']);
                    }
                ),
                "statistic" =>  array(["id" => 1, "name" => "TOEFL" , "value" => "110"], ["id" => 2, "name" => "GPA4.3" , "value" => "4.2"]),
            ];
        }
        return $studies;
    }

    public function index()
    {
        
        
    }
    //新增一筆資料
    public function create(Request $request)
    {
        $study = new Study;
        $uuid = Str::uuid()->toString();
        $study->id = $uuid;
        $study->title = $request->title;
        $study->content = $request->content;
        $study->confirm = $request->confirm;
        $study->timestamps = true;
        
        foreach ( $request["category"] as $element ) {
            $category = new Category;
            $category->name = $element["name"];
            $uuid = Str::uuid()->toString();
            $category->id = $uuid;
            $study->categories()->save($category);
        }
        $study->save();

        return array('status' => "success");
    }


    //更新一筆資料
    public function update(Request $request)
    {
        try
        {
            $study = Study::findOrFail($request->id);
        }
        //query not found
        catch(Exception $e){
            error_log("Error:".$e);
            return array('status' => "fail");
        }
        $study->title = $request->title;
        $study->content = $request->content;
        $study->confirm = $request->confirm;

        $study->categories()->delete();
        foreach ( $request["category"] as $element ) {
            $category = new Category;
            $category->name = $element["name"];
            $uuid = Str::uuid()->toString();
            $category->id = $uuid;
            $study->categories()->save($category);
        }


        $study->save();
        return array('status' => "success");
    }

    //刪除一筆資料
    public function destroy(Request $request)
    {
        try
        {
            $study = Study::findOrFail($request->id);
        }
        //query not found
        catch(Exception $e){
            error_log("Error:".$e);
            return array('status' => "fail");
        }
        $study->categories()->delete();
        $study->delete();
        return array('status' => "success");
    }

    public function confirm(Request $request)
    {
        try
        {
            $study = Study::findOrFail($request->id);
        }
        //query not found
        catch(Exception $e){
            error_log("Error:".$e);
            return array('status' => "fail");
        }

        $study->confirm = $request->confirm;
        $study->save();

        return array('status' => "success");
    }
}