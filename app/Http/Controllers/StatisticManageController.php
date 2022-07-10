<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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
        $name = $request->input('name');
        $dataType = $request->input('dataType');
        if (!$name)
            return array(['status' => 'fail', 'msg' => 'Empty name is inavailable.']);
        if (!$dataType)
            return array(['status' => 'fail', 'msg' => 'Empty dataType is inavailable.']);

        // check if there is same name in database
        $collision = StatisticManage::where('name', '=', $name)->first();
        if ($collision)
            return array(['status' => 'fail', 'msg' => 'Same name in database.']);

        $statisticManage = new StatisticManage;
        $uuid = Str::uuid()->toString();
        $statisticManage->id = $uuid;
        $statisticManage->name = $name;
        $statisticManage->dataType = $dataType;

        // check valid dataType
        if (strcmp($dataType, 'string') && strcmp($dataType, 'int') && strcmp($dataType, 'float'))
            return array(['status' => 'fail', 'msg' => 'Invalid dataType.']);

        if (strcmp($dataType, 'string')) {
            $statisticManage->max = $request->input('max') ?: 0;
            $statisticManage->min = $request->input('min') ?: 0;
        }
        $statisticManage->save();

        return array('status' => 'success', 'id' => $uuid);
    }

    public function update(Request $request)
    {
        try {
            $statisticManage = StatisticManage::findOrFail($request->id);
        } catch (Exception $e) {
            error_log('Error:' . $e);
            return array('status' => 'fail');
        }

        $name = $request->input('name');
        $dataType = $request->input('dataType');
        if (!$name)
            return array(['status' => 'fail', 'msg' => 'Empty name is inavailable.']);
        if (!$dataType)
            return array(['status' => 'fail', 'msg' => 'Empty dataType is inavailable.']);

        // check if there is same name in database
        $collision = StatisticManage::where('name', '=', $name)->first();
        if ($collision)
            return array(['status' => 'fail', 'msg' => 'Same name in database.']);

        // check valid dataType
        if (strcmp($dataType, 'string') && strcmp($dataType, 'int') && strcmp($dataType, 'float'))
            return array(['status' => 'fail', 'msg' => 'Invalid dataType.']);

        $statisticManage->name = $name;
        $statisticManage->dataType = $dataType;

        if (strcmp($request->dataType, 'string')) {
            $statisticManage->max = $request->input('max') ?: 0;
            $statisticManage->min = $request->input('min') ?: 0;
        } else {
            $statisticManage->max = 0;
            $statisticManage->min = 0;
        }
        $statisticManage->save();

        return array('status' => 'success');
    }

    public function destroy(Request $request)
    {
        try {
            $statisticManage = StatisticManage::findOrFail($request->id);
        } catch (Exception $e) {
            error_log('Error:' . $e);
            return array('status' => 'fail');
        }

        $statisticManage->statistics()->delete();
        $statisticManage->delete();

        return array('status' => 'success');
    }
}
