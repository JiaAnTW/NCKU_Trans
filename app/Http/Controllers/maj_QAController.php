<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\maj_QA;
use Illuminate\Support\Facades\DB;

class maj_QAController extends Controller
{
    //顯示所有資料
    public function show()
    {
        $data=maj_QA::where('confirm',"true")->get();
        return $data;
        //
    }

    public function index()
    {
        $data=maj_QA::all();
        return $data;
        //
    }
    //新增一筆資料
    public function create(Request $request)
    {
        $data=$request->only(["question","answer"]);
        $id=1+DB::table('major_qa')->where('id', DB::raw("(select max(`id`) from major_qa)"))->value('id');
        $question=$data["question"];
        $answer=$data["answer"];
        //$tag_array=$data["tags"];
        $tag="";
        $confirm=false;
        DB::insert("INSERT INTO major_qa VALUES('$id','$question', '$answer','$tag','$confirm')") or die('MySQL query error');
        
    }

    //儲存資料
    public function store(Request $request)
    {
        //
    }

    //編輯一筆資料
    public function edit($id)
    {
        //
    }

    //更新一筆資料
    public function update(Request $request, $id)
    {
        $data=$request->only(["id","question","answer","tags","confirm"]);
        $new_id=(int)$data["id"];
        $question=$data["question"];
        $answer=$data["answer"];
        $confirm=$data["confirm"];
        $tag_array=$data["tags"];
        $tag="";
        for($i=0;$i<count($tag_array);$i=$i+1){
            $tag=$tag.$tag_array[$i];
            if($i<count($tag_array)-1)
                $tag=$tag.",";
        }
        DB::table('major_qa')->where('id',$id)->update(array('id'=>$new_id,'question' => $question,'answer'=>$answer,'tag'=>$tag,'confirm'=>$confirm))or die('MySQL query error');
    }

    //刪除一筆資料
    public function destroy($id)
    {
        DB::table('major_qa')->where('id',$id)->delete();
    }
}

