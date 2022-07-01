<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Exception;

//for uuid
use Illuminate\Support\Str;

use App\CategoryManage;

class CategoryManageController extends Controller
{
    public function show()
    {
        return CategoryManage::all();
    }

    public function create(Request $request)
    {
        //check if there is same name in database
        $collision = CategoryManage::where('name', '=', $request->name)->first();
        if ($collision) {
            return array(["status" => "fail", "msg" => "Same name in database."]);
        }

        $category = new CategoryManage;
        $uuid = Str::uuid()->toString();
        $category->id = $uuid;
        $category->name = $request->name;
        $category->save();

        return array('status' => "success", "id" => $uuid);
    }

    public function update(Request $request)
    {
        try {
            $category = CategoryManage::findOrFail($request->id);
        }
        catch (Exception $e) {
            error_log("Error:" . $e);
            return array('status' => "fail");
        }

        //check if there is same name in database
        $collision = CategoryManage::where('name', '=', $request->name)->first();
        if ($collision) {
            return array(["status" => "fail", "msg" => "Same name in database."]);
        }

        $category->name = $request->name;
        $category->save();

        return array('status' => "success");
    }

    public function destroy(Request $request)
    {
        try {
            $categoryManage = CategoryManage::findOrFail($request->id);
        }
        catch (Exception $e) {
            error_log("Error:" . $e);
            return array('status' => "fail");
        }

        $categoryManage->categories()->delete();
        $categoryManage->delete();

        return array('status' => "success");
    }
}
