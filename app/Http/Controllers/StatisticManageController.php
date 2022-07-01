<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Exception;

//for uuid
use Illuminate\Support\Str;

use App\StatisticManage;

class StatisticManageController extends Controller
{
    public function show()
    {
        return StatisticManage::all();;
    }

    public function create(Request $request)
    {
        //check if there is same name in database
        $collision = StatisticManage::where('name', '=', $request->name)->first();
        if ($collision) {
            return array(["status" => "fail", "msg" => "Same name in database."]);
        }

        $statisticManage = new StatisticManage;
        $uuid = Str::uuid()->toString();
        $statisticManage->id = $uuid;
        $statisticManage->name = $request->name;
        $statisticManage->dataType = $request->dataType;

        //check valid dataType
        if (strcmp($request->dataType, "string") && strcmp($request->dataType, "int") && strcmp($request->dataType, "float")) {
            return array(["status" => "fail", "msg" => "Invalid dataType."]);
        }

        if (strcmp($request->dataType, "string")) {
            $statisticManage->max = $request->max;
            $statisticManage->min = $request->min;
        } else {
            $statisticManage->max = 0;
            $statisticManage->min = 0;
        }

        $statisticManage->save();
        return array("status" => "success", "id" => $uuid);
    }

    //not allow to update dataType
    public function update(Request $request)
    {
        try {
            $statisticManage = StatisticManage::findOrFail($request->id);
        } catch (Exception $e) {
            error_log("Error:" . $e);
            return array('status' => "fail");
        }
        //check if there is same name in database
        $collision = StatisticManage::where('name', '=', $request->name)->first();
        if ($collision) {
            return array(["status" => "fail", "msg" => "Same name in database."]);
        }

        $statisticManage->name = $request->name;
        if (strcmp($request->dataType, "string")) {
            $statisticManage->max = $request->max;
            $statisticManage->min = $request->min;
        } else {
            $statisticManage->max = 0;
            $statisticManage->min = 0;
        }

        $statisticManage->save();
        return array('status' => "success");
    }

    public function destroy(Request $request)
    {
        try {
            $statisticManage = StatisticManage::findOrFail($request->id);
        } catch (Exception $e) {
            error_log("Error:" . $e);
            return array('status' => "fail");
        }

        $statisticManage->statistics()->delete();
        $statisticManage->delete();

        return array('status' => "success");
    }
}
