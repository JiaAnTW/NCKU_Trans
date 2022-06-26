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
    static public function showById(Request $request)
    {
        try{
            $id = $request->input('id');
            if(!$id) {
                return null;
            }
            $data = Study::select('id','title','content')->where('id', $id)-> firstOrFail();
            if($data -> confirm == "false")
                return null;
            return $data;
        } catch(Exception $e){
            return null;
        }
    }

    private function join_statistic_study($studies)
    {
        for($i = 0; $i < count($studies); $i++) 
        {
            //get statistic 
            $stats = StatisticManage::all();
            $statistics = array();
            foreach($stats as $stat){
                $value = DB::table($stat['id'])->where('study_uuid', '=', $studies[$i]->id)->select('value')->value('value');
                if($value != null)
                {
                    array_push($statistics, array("name" => $stat['name'], "value" => $value, "id" => $stat['id'], "isOther" => false));
                }
            }

            $otherStatArray = OtherStatistic::select('id','name', 'value')->where('study_id', '=', $studies[$i]->id)->get();
            foreach($otherStatArray as $otherStat){
                array_push($statistics, array("name" => $otherStat->name, "value" => $otherStat->value, "id" => $otherStat->id, "isOther" => true));
            }
            
            $studies[$i] = [
                "id" => $studies[$i]->id,
                "title" => $studies[$i]->title,
                "content" => $studies[$i]->content,
                "year" => $studies[$i]->year,
                "major" => $studies[$i]->major,
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
        return $studies;
    }


    public function show(Request $request)
    {
        $p = $request->input('p') ? '%' . $request->input('p') . '%' : '%%';
        try {
            $statFilter = $request->input('statFilter') ? explode(",", $request->input('statFilter')) : [];
            $categoryFilter = $request->input('categoryFilter') ? explode(",", $request->input('categoryFilter')) : [];
            if(count($statFilter) || count($categoryFilter)) {
                $idSet = $this->getIdSetByFilter($request);
                return $this->showByIdSet($request, $idSet, "true");
            }
        } catch(Exception $e) {
            error_log("Error:".$e);
            return array('status' => "fail");
        }

        //find some of studies created before target study
        if(strcmp($request->from, "")==0)
        {
            $studies = Study::select('id','title','content','year','major','created_at', 'confirm')->where('confirm','true')-> where(function ($query) use($p) {
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
            //find those studies created before target study
            $date = Carbon::parse($study->created_at)->format('Y-m-d H:i:s');
            $studies = Study::select('id','title','content', 'year','major','created_at', 'confirm')->where('confirm','true')-> where(function ($query) use($p) {
                $query->where('title', 'like', $p)->orWhere('content', 'like', $p);
            })->where('created_at', '<=', $date)->orderBy('created_at', 'desc')->take($request->num)->get();
        }
        
        $studies = $this->join_statistic_study($studies);
        
        return $studies;
        
    }

    public function showByIdSet(Request $request, $idArr, $confirm)
    {
        $p = $request->input('p') ? '%' . $request->input('p') . '%' : '%%';

        //find some of studies created before target study
        if(strcmp($request->from, "")==0)
        {
            $studies = Study::select('id','title','content','year','major','created_at', 'confirm')-> whereIn('id', $idArr)-> where(function ($query) use($p) {
                $query->where('title', 'like', $p)->orWhere('content', 'like', $p);
            }) ->orderBy('created_at', 'desc')->take($request->num);

            $studies = $confirm ? $studies ->where('confirm', $confirm)->get() : $studies->get();
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
            //find those studies created before target study
            $date = Carbon::parse($study->created_at)->format('Y-m-d H:i:s');
            $studies = Study::select('id','title','content', 'year','major','created_at', 'confirm')-> whereIn('id', $idArr)-> where(function ($query) use($p) {
                $query->where('title', 'like', $p)->orWhere('content', 'like', $p);
            })->where('created_at', '<=', $date)->orderBy('created_at', 'desc')->take($request->num);
            $studies = $confirm ? $studies ->where('confirm', $confirm)->get() : $studies->get();
        }

        $studies = $this->join_statistic_study($studies);
        
        return $studies;
    }

    public function getIdSetByFilter(Request $request) {
        $statFilter = $request->input('statFilter') ? explode(",", $request->input('statFilter')) : [];
        $categoryFilter = $request->input('categoryFilter') ? explode(",", $request->input('categoryFilter')) : [];
        $catRes = DB::table('category')->select('study_id')->where(function ($query) use ($categoryFilter){    
            foreach ($categoryFilter as $catId) {
                $query->where('id', '=', $catId);  
            }
        })-> groupBy('study_id') ->get()->map( 
            function($study){
                return $study->study_id;
            }
        )->toArray();

        $statRes = [];
        foreach ($statFilter as $stat) {
            if(count($statRes) == 0) {
                $statRes = DB::table($stat)->select('study_uuid')->get()->map( 
                    function($study){
                        return $study->study_uuid;
                    }
                );
                continue;
            }
            $statRes = array_intersect($statRes->toArray(), DB::table($stat)->select('study_uuid')->get()->map( 
                function($study){
                    return $study->study_uuid;
                }
            )->toArray());
        }

        if(count($categoryFilter)=== 0)
            return $statRes;
        if(count($statFilter)=== 0)
            return $catRes;

        return array_intersect($catRes, $statRes);
    }

    public function index(Request $request)
    {
        $p = $request->input('p') ? '%' . $request->input('p') . '%' : '%%';
        try {
            $statFilter = $request->input('statFilter') ? explode(",", $request->input('statFilter')) : [];
            $categoryFilter = $request->input('categoryFilter') ? explode(",", $request->input('categoryFilter')) : [];
            if(count($statFilter) || count($categoryFilter)) {
                $idSet = $this->getIdSetByFilter($request);
                return $this->showByIdSet($request, $idSet);
            }
        } catch(Exception $e) {
            error_log("Error:".$e);
            return array('status' => "fail");
        }

        //find some of studies created before target study
        if(strcmp($request->from, "")==0)
        {
            $studies = Study::select('id','title','content','year','major','created_at', 'confirm')-> where(function ($query) use($p) {
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
            //find those studies created before target study
            $date = Carbon::parse($study->created_at)->format('Y-m-d H:i:s');
            $studies = Study::select('id','title','content','year', 'major','created_at', 'confirm')-> where(function ($query) use($p) {
                $query->where('title', 'like', $p)->orWhere('content', 'like', $p);
            })->where('created_at', '<=', $date)->orderBy('created_at', 'desc')->take($request->num)->get();
        }

        $studies = $this->join_statistic_study($studies);

        return $studies;
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
        $study->major = $request->major;
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
        $study->major = $request->major;
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

    public function result(Request $request)
    {

        $p = $request->input('p') ? '%' . $request->input('p') . '%' : '%%';
        try {
            $statFilter = $request->input('statFilter') ? explode(",", $request->input('statFilter')) : [];
            $categoryFilter = $request->input('categoryFilter') ? explode(",", $request->input('categoryFilter')) : [];
        } catch(Exception $e) {
            error_log("Error:".$e);
            return array('status' => "fail");
        }


        $studies = Study::select('id','title','content','year','created_at', 'confirm')->where('confirm','true')-> where(function ($query) use($p) {
            $query->where('title', 'like', $p)->orWhere('content', 'like', $p);
        }) ->orderBy('created_at', 'desc')->get();

        $studies = $this->join_statistic_study($studies);

        $studies = $this->filter_study_with_category_stat($studies, $statFilter, $categoryFilter);
        
        $stats = StatisticManage::all();
        $stats_result = array();

        foreach($stats as $stat)
        { 
            $stats_result[$stat["name"]] = array("id" => $stat["id"], "list" => array());
        }

        //store each statistic in list
        foreach($studies as $study){
            foreach($study["statistic"] as $stat)
            {
                if( is_numeric($stat["value"]))
                {
                    array_push($stats_result[$stat["name"]]["list"], $stat["value"]);
                }
            }
        }

        //calculate average and min for each statistic
        $stats_average_min = array();
        foreach($stats_result as $key=>$value){
            if(count($value["list"]) == 0)
            {
                array_push($stats_average_min, array("id" => $value["id"],
                                                    "name" => $key,
                                                    "average" => "",
                                                    "min" => "",
                                                    "count" => 0));
            }
            else
            {
                array_push($stats_average_min, array("id" => $value["id"],
                                                    "name" => $key,
                                                    "average" => round(array_sum($value["list"])/count($value["list"]),2),
                                                    "min" => min($value["list"]),
                                                    "count" => count($value["list"])));
            }
        }
        return $stats_average_min;
    }
}