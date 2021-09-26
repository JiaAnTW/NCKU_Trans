<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\College;
use App\Department;
use Illuminate\Support\Facades\DB;

class DepartmentCollege extends Controller
{
    //顯示所有資料
    public function indexDepartment()
    {
        $data=Department::all();
        return $data;
        //
    }

    public function indexCollege()
    {
        $data=College::all();
        return $data;
        //
    }

    //新增一筆資料
    public function createDepartment(Request $request)
    {
        $data=$request->only(["name","college"]);
        $id=1+DB::table('department')->where('id', DB::raw("(select max(`id`) from department)"))->value('id');
        $name= $data['name'];
        $college= $data['college'];
        $trans_pass=null;
        DB::insert("INSERT INTO department VALUES('$id','$name', '$college')") or die('MySQL query error');
        return array('status' => "success");
        
    }

    public function createCollege(Request $request)
    {
        $data=$request->only(["name","english"]);
        $id=1+DB::table('college')->where('id', DB::raw("(select max(`id`) from college)"))->value('id');
        $name= $data['name'];
        $english= $data['english'];
        DB::insert("INSERT INTO college VALUES('$id','$name', '$english')") or die('MySQL query error');
        return array('status' => "success");
    }

    //儲存資料
    public function store(Request $request)
    {
        //
    }

    //顯示一筆資料
    public function show($id)
    {
        //
    }

    //編輯一筆資料
    public function edit($id)
    {
        //
    }

    //更新一筆資料
    public function updateCollege(Request $request, $id)
    {
        $data=$request->only(["id","name","english"]);
        $id=(int)$data["id"];
        $new_id=(int)$data["id"];
        $name= $data['name'];
        DB::table('college')->where('id',$id)->update(array('id'=>$new_id,'name' => $name))or die('MySQL query error');
        return array('status' => "success");
    }

    public function updateDepartment(Request $request, $id)
    {
        $data=$request->only(["id","name","college"]);
        $id=(int)$data["id"];
        $new_id=(int)$data["id"];
        $name= $data['name'];
        $college= $data['college'];
        DB::table('department')->where('id',$id)->update(array('id'=>$new_id,'name' => $name,'college'=>$college))or die('MySQL query error');
        return array('status' => "success");
    }


    //刪除一筆資料
    public function destroyCollege($id)
    {
        DB::table('college')->where('id',$id)->delete();
        return array('status' => "success");
    }
    public function destroyDepartment($id)
    {
        DB::table('department')->where('id',$id)->delete();
        return array('status' => "success");
    }
}

