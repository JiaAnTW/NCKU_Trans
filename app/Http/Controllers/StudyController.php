<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
//for datetime parsing
use Carbon\Carbon;

//for uuid
use Illuminate\Support\Str;

use App\Study;
use App\Category;
use App\CategoryManage;
use App\StatisticManage;
use App\OtherStatistic;

class StudyController extends Controller
{

    public function show(Request $request)
    {
        $p = $request->input('p') ? '%' . $request->input('p') . '%' : '%%';
        try {
            $statFilter = $request->input('statFilter') ? explode(",", $request->input('statFilter')) : [];
            $categoryFilter = $request->input('categoryFilter') ? explode(",", $request->input('categoryFilter')) : [];
        } catch(Exception $e) {
            error_log("Error:".$e);
            return array('status' => "fail");
        }

        //find some of studies craeted before target study
        if(strcmp($request->from, "")==0)
        {
            $studies = Study::select('id','title','content','year','created_at', 'confirm')->where('confirm','true')-> where(function ($query) use($p) {
                $query->where('title', 'like', $p)->orWhere('content', 'like', $p);
            }) ->orderBy('created_at', 'desc')->take($request->num)->get();
        }else
        {
            //find the created time of target study 
            try
            {
                $study = Study::findOrFail($request->from);
            }
            //query not found
            catch(Exception $e){
                error_log("Error:".$e);
                return array('status' => "fail");
            }
            //find those studies craeted before target study
            $date = Carbon::parse($study->created_at)->format('Y-m-d H:i:s');
            $studies = Study::select('id','title','content', 'year','created_at', 'confirm')->where('confirm','true')-> where(function ($query) use($p) {
                $query->where('title', 'like', $p)->orWhere('content', 'like', $p);
            })->where('created_at', '<=', $date)->orderBy('created_at', 'desc')->take($request->num)->get();
        }
        
        for($i = 0; $i < count($studies); $i++) 
        {
            //get statistic 
            $stats = StatisticManage::all();
            $statistics = array();
            foreach($stats as $stat){
                $value = DB::table($stat['id'])->where('study_uuid', '=', $studies[$i]->id)->select('value')->value('value');
                if($value != null)
                {
                    array_push($statistics, array("name" => $stat['name'], "value" => $value, "id" => $stat['id']));
                }
            }
            
            $studies[$i] = [
                "id" => $studies[$i]->id,
                "title" => $studies[$i]->title,
                "content" => $studies[$i]->content,
                "year" => $studies[$i]->year,
                "timestamp" => $studies[$i]->created_at,
                "confirm" => $studies[$i]->confirm,
                //select specific columns in Category without showing study_id
                "category" => $studies[$i]->categories->map( 
                    function($category){
                        return CategoryManage::find($category["id"]);
                    }
                ),
                "statistic" => $statistics,
            ];
        }
        
        try {
            // ------ This is workaround for filter feature ------
            // Return data that match all the statistics and category filters from url query params 
            return $studies->filter(function($studyItem) use($statFilter, $categoryFilter) {
                // stat set
                $statArr = $studyItem["statistic"];
                $statArr = array_map(function($stat){
                    return $stat["id"];
                }, $statArr);
                $isInStat = count($statFilter) == 0 ? true : (array_intersect($statFilter, $statArr) == $statFilter);

                // category set
                $categoryArr = $studyItem["category"];
                $categoryArr = array_map(function($cat){
                    return $cat["id"];
                }, $categoryArr->toArray()); // Laravel object isn't array
                $isInCat = count($categoryFilter) == 0 ? true : (array_intersect($categoryFilter, $categoryArr) == $categoryFilter);

                return $isInStat && $isInCat;
            });
        } catch(Exception $e) {
            error_log("Error:".$e);
            return $studies;
        }
    }

    public function index(Request $request)
    {
        $p = $request->input('p') ? '%' . $request->input('p') . '%' : '%%';
        try {
            $statFilter = $request->input('statFilter') ? explode(",", $request->input('statFilter')) : [];
            $categoryFilter = $request->input('categoryFilter') ? explode(",", $request->input('categoryFilter')) : [];
        } catch(Exception $e) {
            error_log("Error:".$e);
            return array('status' => "fail");
        }

        //find some of studies created before target study
        if(strcmp($request->from, "")==0)
        {
            $studies = Study::select('id','title','content','year','created_at', 'confirm')-> where(function ($query) use($p) {
                $query->where('title', 'like', $p)->orWhere('content', 'like', $p);
            })->orderBy('created_at', 'desc')->take($request->num)->get();
        }else
        {
            //find the created time of target study 
            try
            {
                $study = Study::findOrFail($request->from);
            }
            //query not found
            catch(Exception $e){
                error_log("Error:".$e);
                return array('status' => "fail");
            }
            //find those studies craeted before target study
            $date = Carbon::parse($study->created_at)->format('Y-m-d H:i:s');
            $studies = Study::select('id','title','content','year','created_at', 'confirm')-> where(function ($query) use($p) {
                $query->where('title', 'like', $p)->orWhere('content', 'like', $p);
            })->where('created_at', '<=', $date)->orderBy('created_at', 'desc')->take($request->num)->get();
        }

        for($i = 0; $i < count($studies); $i++) 
        {
            //get statistic 
            $stats = StatisticManage::all();
            $statistics = array();
            foreach($stats as $stat){
                $value = DB::table($stat['id'])->where('study_uuid', '=', $studies[$i]->id)->select('value')->value('value');
                if($value != null)
                {
                    array_push($statistics, array("name" => $stat['name'], "value" => $value, "id" => $stat['id']));
                }
            }
            
            $studies[$i] = [
                "id" => $studies[$i]->id,
                "title" => $studies[$i]->title,
                "content" => $studies[$i]->content,
                "year" => $studies[$i]->year,
                "timestamp" => $studies[$i]->created_at,
                "confirm" => $studies[$i]->confirm,
                //select specific columns in Category without showing study_id
                "category" => $studies[$i]->categories->map( 
                    function($category){
                        return CategoryManage::find($category["id"]);
                    }
                ),
                "statistic" => $statistics,
            ];
        }

        try {
            // ------ This is workaround for filter feature ------
            // Return data that match all the statistics and category filters from url query params 
            return $studies->filter(function($studyItem) use($statFilter, $categoryFilter) {
                // stat set
                $statArr = $studyItem["statistic"];
                $statArr = array_map(function($stat){
                    return $stat["id"];
                }, $statArr);
                $isInStat = count($statFilter) == 0 ? true : (array_intersect($statFilter, $statArr) == $statFilter);

                // category set
                $categoryArr = $studyItem["category"];
                $categoryArr = array_map(function($cat){
                    return $cat["id"];
                }, $categoryArr->toArray()); // Laravel object isn't array
                $isInCat = count($categoryFilter) == 0 ? true : (array_intersect($categoryFilter, $categoryArr) == $categoryFilter);

                return $isInStat && $isInCat;
            });
        } catch(Exception $e) {
            error_log("Error:".$e);
            return $studies;
        } 
    }
    //新增一筆資料
    public function create(Request $request)
    {
        $study = new Study;
        $uuid = Str::uuid()->toString();
        $study->id = $uuid;
        $study->title = $request->title;
        $study->content = $request->content;
        $study->year = $request->year;
        $study->confirm = $request->confirm;
        $study->timestamps = true;
        
        foreach ( $request["category"] as $element ) {
            $category = new Category;
            $category->id = $element["id"];
            $study->categories()->save($category);
        }
        //create statistic
        foreach ( $request["statistic"] as $element ) {
            $stat = StatisticManage::where('name', '=', $element['name'])->first();
            if($stat != null)
            {
                //check value is bounded by max and min
                if(strcmp($stat['dataType'],"int") == 0 or strcmp($stat['dataType'],"float") == 0)
                {
                    if($stat["max"] < $element['value'] or $stat["min"] > $element['value'])
                    {
                        $study->categories()->delete();
                        return array('status' => "fail");
                    }
                }

                DB::table($stat['id'])->insert(
                    [ "value" => $element['value'],
                        "study_uuid" => $study->id ]
                );
            }
            else
            {
                $study->categories()->delete();
                return array('status' => "fail");
            }
        }

        //create other statistic
        foreach ( $request["otherStatistic"] as $element ) {
            $otherStat = new OtherStatistic;
            $otherStat->name = $element["name"];
            $otherStat->value = $element["value"];
            $uuid = Str::uuid()->toString();
            $otherStat->id = $uuid;
            $study->otherStatistic()->save($otherStat);
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
        $study->year = $request->year;
        $study->confirm = $request->confirm;

        //update statistic
        foreach ( $request["statistic"] as $element ) {
            $stat = StatisticManage::where('name', '=', $element['name'])->first();
            if($stat != null)
            {
                //check value is bounded by max and min
                if(strcmp($stat['dataType'],"int") == 0 or strcmp($stat['dataType'],"float") == 0)
                {
                    if($stat["max"] < $element['value'] or $stat["min"] > $element['value'])
                    {
                        return array('status' => "fail");
                    }
                }
                DB::table($stat['id'])
                    ->where('study_uuid', '=', $study->id)
                    ->update(['value' => $element["value"]]);
            }
            else
            {
                return array('status' => "fail");
            }
        }

        $study->categories()->delete();
        foreach ( $request["category"] as $element ) {
            $category = new Category;
            $category->id = $element["id"];
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

        //delete statistic
        $stats = StatisticManage::all();
        foreach($stats as $stat){
            $value = DB::table($stat['id'])->where('study_uuid', '=', $study->id)->delete();
        }

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