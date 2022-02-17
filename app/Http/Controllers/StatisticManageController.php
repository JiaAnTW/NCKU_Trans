<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;

//for uuid
use Illuminate\Support\Str;

use App\StatisticManage;

class StatisticManageController extends Controller
{
    public function show()
    {
        $statistic = StatisticManage::all();

        return $statistic;
    }

    //create different table base on data type
    private function createTable($dataType, $max, $min, $id)
    {
        if( strcmp($dataType, "float") == 0)
        {
            Schema::create($id, function (Blueprint $table) {
                $table->float('value', 10, 3);
                $table->uuid('study_uuid');
            });
        }
        if( strcmp($dataType, "int") == 0)
        {
            Schema::create($id, function (Blueprint $table) {
                $table->integer('value');
                $table->uuid('study_uuid');
            });
        }
        if( strcmp($dataType, "string") == 0)
        {
            Schema::create($id, function (Blueprint $table) {
                $table->string('value', 10);
                $table->uuid('study_uuid');
            });
        }
    }

    public function create(Request $request)
    {
        //check if there is same name in database
        $stat = StatisticManage::where('name', '=', $request->name)->first();
        if ($stat === null) 
        {
            $statistic = new StatisticManage;
            $uuid = Str::uuid()->toString();
            $statistic->id = $uuid;
            $statistic->name = $request->name;
            $statistic->dataType = $request->dataType;
            if( strcmp($request->dataType, "string") != 0)
            {
                $statistic->max = $request->max;
                $statistic->min = $request->min;
            }
            else{
                $statistic->max = 0;
                $statistic->min = 0;
            }

            $this->createTable($request->dataType, $request->max, $request->min, $uuid);

            $statistic->save();
            return array(["status"=>"success"]);
        } 
        else 
        {
            return array(["status"=>"fail"]);
        }

    }

    //not allow to update dataType
    public function update(Request $request)
    {
        try
        {
            $statistic = StatisticManage::findOrFail($request->id);
        }
        catch(Exception $e){
            error_log("Error:".$e);
            return array('status' => "fail");
        }
        //check if there is same name in database
        $stat = StatisticManage::where('name', '=', $request->name)->first();
        if ($stat != null)
        {
            return array(["status"=>"fail"]);
        }
        $statistic->name = $request->name;
        if( strcmp($request->dataType, "string") != 0)
        {
            $statistic->max = $request->max;
            $statistic->min = $request->min;
        }
        else{
            $statistic->max = 0;
            $statistic->min = 0;
        }

        $statistic->save();
    }

    public function destroy(Request $request)
    {
        try
        {
            $statistic = StatisticManage::findOrFail($request->id);
        }
        catch(Exception $e){
            error_log("Error:".$e);
            return array('status' => "fail");
        }
        Schema::drop($statistic->id);
        $statistic->delete();
        return array('status' => "success");
    }


}
