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
        return StatisticManage::where('confirm', '=', 1)->get();
    }

    public function index()
    {
        return StatisticManage::all();
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
        $statisticManage->confirm = 1;

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
        $statisticManage->confirm = $request->input('confirm', 0);

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

    public function merge(Request $request)
    {
        $src_id = $request->input('id');
        $dest_id = $request->input('dest');
        if (!$src_id || !$dest_id)
            return array(['status' => 'fail', 'msg' => 'Error, expecting two arguments.']);

        try {
            $src_manage = StatisticManage::findOrFail($src_id);
        } catch (Exception $e) {
            error_log('Error:' . $e);
            return array('status' => 'fail');
        }
        try {
            $dest_manage = StatisticManage::findOrFail($dest_id);
        } catch (Exception $e) {
            error_log('Error:' . $e);
            return array('status' => 'fail');
        }

        if (strcmp($src_manage->dataType, $dest_manage->dataType))
            return array(['status' => 'fail', 'msg' => 'Error, dataType is incompatible.']);

        $src_manage->statistics()->update(['id' => $dest_id]);
        $src_manage->delete();

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
