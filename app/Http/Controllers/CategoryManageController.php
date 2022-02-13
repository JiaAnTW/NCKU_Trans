<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

//for uuid
use Illuminate\Support\Str;

use App\CategoryManage;

class CategoryManageController extends Controller
{
    //
    public function show()
    {
        $category = CategoryManage::all();

        return $category;
    }

    public function create(Request $request)
    {
        $category = new CategoryManage;
        $uuid = Str::uuid()->toString();
        $category->id = $uuid;
        $category->name = $request->studyType;
        $category->save();

        return array('status' => "success");
    }

    public function update(Request $request)
    {
        try
        {
            $category = CategoryManage::findOrFail($request->id);
        }
        //query not found
        catch(Exception $e){
            error_log("Error:".$e);
            return array('status' => "fail");
        }
        $category->name = $request->studyType;
        $category->save();

        return array('status' => "success");
    }

    public function destroy(Request $request)
    {
        try
        {
            $category = CategoryManage::findOrFail($request->id);
        }
        //query not found
        catch(Exception $e){
            error_log("Error:".$e);
            return array('status' => "fail");
        }
        
        $category->delete();
        return array('status' => "success");
    }

}
