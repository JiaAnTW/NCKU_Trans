<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\College;
use App\Comments;
use App\Department;
use App\Study;
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
        $id=1+Department::where('id', DB::raw("(select max(`id`) from department)"))->value('id');
        $name= $data['name'];
        $college= $data['college'];

        Department::insert(array(
            'id' => $id,
            'name' => $name,
            'college' => $college,
        ))or die('MySQL query error');

        //DB::insert("INSERT INTO college VALUES('$id','$name')") or die('MySQL query error');
        return array(
            'status' => "success",
            'dataInfo' => array(
                'id' => $id,
                'name' => $name,
                'college' => $college,
            )
        );
        
    }

    public function createCollege(Request $request)
    {
        $data=$request->only(["name"]);
        $id=1+College::where('id', DB::raw("(select max(`id`) from college)"))->value('id');
        $name= $data['name'];
        College::insert(array(
            'id' => $id,
            'name' => $name
        ))or die('MySQL query error');

        //DB::insert("INSERT INTO college VALUES('$id','$name')") or die('MySQL query error');
        return array(
            'status' => "success",
            'dataInfo' => array(
                'id' => $id,
                'name' => $name
            )
        );
    }

    //更新一筆資料
    public function updateCollege(Request $request, $id)
    {
        $data=$request->only(["id","name","english"]);
        $id=(int)$data["id"];
        $new_id=(int)$data["id"];
        $name= $data['name'];
        $name_old = College::select('name') -> where('id', $id) -> value('name'); 
        College::where('id',$id)->update(array('id'=>$new_id,'name' => $name))or die('MySQL query error');
        Department::where('college', $name_old) -> update(array('college'=> $name));
        Comments::where('out_maj', $name_old) -> update(array('out_maj'=> $name));
        Comments::where('department', $name_old) -> update(array('department'=> $name));
        Study::where('major', $name_old) -> update(array('major'=> $name));
        return array('status' => "success");
    }

    public function updateDepartment(Request $request, $id)
    {
        $data=$request->only(["id","name","college"]);
        $id=(int)$data["id"];
        $new_id=(int)$data["id"];
        $name= $data['name'];
        $college= $data['college'];
        $name_old = Department::select('name') -> where('id', $id) -> value('name'); 
        Department::where('id',$id)->update(array('id'=>$new_id,'name' => $name,'college'=>$college)) or die('MySQL query error');
        Comments::where('in_maj', $name_old) -> update(array('in_maj'=> $name, 'college'=>$college));
        Comments::where('out_maj', $name_old) -> update(array('out_maj'=> $name));
        Study::where('major', $name_old) -> update(array('major'=> $name));
        return array('status' => "success");
    }


    //刪除一筆資料
    public function destroyCollege($id)
    {
        College::where('id',$id)->delete();
        return array('status' => "success");
    }
    public function destroyDepartment($id)
    {
        Department::where('id',$id)->delete();
        return array('status' => "success");
    }
}

