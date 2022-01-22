<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Comments;
use App\Department;
use Illuminate\Support\Facades\DB;

class CommentsController extends Controller
{
    //顯示所有資料
    public function show()
    {
        $data=Comments::where('confirm',"true")->get();
        return $data;
        //
    }

    static public function showById(Request $request)
    {
        try{
            $id = $request->input('id');
            if(!$id) {
                return null;
            }

            $data = Comments::where('id', $id)-> firstOrFail();
            return $data;
        } catch(Exception $e){
            return null;
        }
    }

    public function index()
    {
        $data=Comments::all();
        return $data;
        //
    }

    //新增一筆資料
    public function create(Request $request)
    {
        $data=$request->only(["category","rank_1","rank_2","year","score","out_maj","in_maj","comment","isPass"]);
        $id= 1 + Comments::where('id', DB::raw("(select max(`id`) from major)"))->value('id');
        $rank_1=$data["rank_1"] == '' ? '?' : $data["rank_1"];
        $rank_2=$data["rank_2"] == '' ? '?' : $data["rank_2"];
        $category = $data["category"];
        $year=(int) $data["year"];
        $score = $data["score"];
        $out_maj = $data["out_maj"];
        $in_maj = $data["in_maj"];
        $department= $this->defineDepartment($data["in_maj"]);
        $comment = $data["comment"];
        if($comment==""||$comment==null){
            $comment="這篇心得沒有留下內文歐";
        }
        $confirm = "false";
        $isPass = $data["isPass"] == 'true' ? 'true' : 'false';
        Comments::insert(array(
            'id'=>$id,
            'category' => $category,
            'rank_1'=>$rank_1,
            'rank_2'=>$rank_2,
            'year'=>$year,
            'score'=>$score,
            'out_maj'=>$out_maj,
            'in_maj'=>$in_maj,
            'department'=>$department,
            'comment'=>$comment,
            'confirm'=>$confirm,
            'isPass'=>$isPass
        )) or die('MySQL query error');
        return array('status' => "success");
    }

    //更新一筆資料
    public function update(Request $request, $id)
    {
        $data=$request->only(["category","id","rank_1","rank_2","year","score","out_maj","in_maj","comment","confirm","isPass"]);
        $new_id=$data["id"];
        $category = $data["category"];
        $rank_1=$data["rank_1"] == '' ? '?' : $data["rank_1"];
        $rank_2=$data["rank_2"] == '' ? '?' : $data["rank_2"];
        $year=(int) $data["year"];
        $score = $data["score"];
        $out_maj = $data["out_maj"];
        $in_maj = $data["in_maj"];
        $department= $this->defineDepartment($data["in_maj"]);
        $comment = $data["comment"];
        $confirm =  $data["confirm"];
        $isPass = $data["isPass"] == 'true' ? 'true' : 'false';
        Comments::where('id',$id)->update(array('id'=>$new_id, 'category' => $category, 'rank_1'=>$rank_1,'rank_2'=>$rank_2,'year'=>$year,'score'=>$score,'out_maj'=>$out_maj,'in_maj'=>$in_maj,'department'=>$department,'comment'=>$comment,'confirm'=>$confirm, 'isPass'=>$isPass))or die('MySQL query error');
        return array('status' => "success");
    }

     //更新一筆資料的確認
    public function confirm(Request $request)
    {
        $data=$request->only(["id","confirm"]);
        $id=$data["id"];
        $confirm =  $data["confirm"];
        Comments::where('id',$id)->update(['confirm'=>$confirm])or die('MySQL query error');
        return array('status' => "success");
    }

    //刪除一筆資料
    public function destroy($id)
    {
        Comments::where('id',$id)->delete();
        return array('status' => "success");
    }

    private function defineDepartment($in_maj){
        try{
            $data = Department::select('college') -> where('name', $in_maj) -> firstOrFail();
            return $data['college'];
        } catch(Exception $e) {
            error_log("Error: ".$e);
            $college = '其他';
           return $college;
        }
    }

}

