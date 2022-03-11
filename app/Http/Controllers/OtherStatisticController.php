<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

//for uuid
use Illuminate\Support\Str;

use App\StatisticManage;
use App\OtherStatistic;

class OtherStatisticController extends Controller
{
    //

    public function show()
    {
        return OtherStatistic::all();
    }

    public function create(Request $request)
    {
        $otherStat = new OtherStatistic;
        $uuid = Str::uuid()->toString();
        $otherStat->uuid = $uuid;
        $otherStat->name = $request->name;
        $otherStat->value = $request->value;

    }

    public function transform(Request $request)
    {

        try
        {
            $otherStat = OtherStatistic::findOrFail($request->id);
        }
        catch(Exception $e){
            error_log("Error:".$e);
            return array('status' => "fail");
        }

        $stat = StatisticManage::where('name', '=', $request->transformStudyStat)->first();
        if($stat != null)
        {
            
            //for string data type
            $value = $otherStat->value;

            //check if there is same study_id in statistic table
            $checkSameName = DB::table($stat['id'])->where("study_uuid", "=", $otherStat->study_id)->first();
            if($checkSameName != null)
            {
                return array("status" => "fail", "msg" => "Having duplicated study_id with different value in DB.");
            }

            //transform data type 
            //check value is bounded by max and min
            
            if(!is_numeric($otherStat->value)){
                return array('status' => "fail", "msg" => "invalid data type");
            }

            if(strcmp($stat['dataType'],"int") == 0)
            {   
                $value = intval($otherStat->value);
            }

            if(strcmp($stat['dataType'],"float") == 0)
            {   
                $value = floatval($otherStat->value);
            }

            if($stat["max"] < $value or $stat["min"] > $value)
            {
                return array('status' => "fail", "msg" => "out of range");
            }

            DB::table($stat['id'])->insert(
                [ "value" => $value,
                    "study_uuid" => $otherStat->study_id ]
            );
            //if success, delete the entry in otherStat
            $otherStat->delete();

            return array('status' => "success");
        }
        else
        {
            return array('status' => "fail",
             'msg' => 'There is none of studyStat, please check if 
                        the name is correct or this studyStat is created');
        }
    }

    
}
