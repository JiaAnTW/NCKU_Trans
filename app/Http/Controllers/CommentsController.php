<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Comments;
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

    public function index()
    {
        $data=Comments::all();
        return $data;
        //
    }

    //新增一筆資料
    public function create(Request $request)
    {
        $data=$request->only(["category","rank_1","rank_2","year","score","out_maj","in_maj","comment"]);
        $id=1+DB::table('major')->where('id', DB::raw("(select max(`id`) from major)"))->value('id');
        $rank_1=$data["rank_1"];
        $rank_2=$data["rank_2"];
        $category = $data["category"];
        $year=(int) $data["year"];
        $score = $data["score"];
        $out_maj = $data["out_maj"];
        $in_maj = $data["in_maj"];
        $department= $this->defineDepartment($data["in_maj"]);
        $comment = $data["comment"];
        $confirm = "false";
        //DB::table('major')->insert()
        DB::insert("INSERT INTO major VALUES('$id','$category','$rank_1','$rank_2', '$year','$score', '$out_maj','$in_maj','$department','$comment','$confirm')") or die('MySQL query error');
        return "success";
    }

    //儲存資料
    public function store(Request $request)
    {
        //
    }

    //顯示一筆資料

    //編輯一筆資料
    public function edit($id)
    {
        //
    }

    //更新一筆資料
    public function update(Request $request, $id)
    {
        $data=$request->only(["id","rank_1","rank_2","year","score","out_maj","in_maj","comment","confirm"]);
        $new_id=$data["id"];
        $rank_1=$data["rank_1"];
        $rank_2=$data["rank_2"];
        $year=(int) $data["year"];
        $score = $data["score"];
        $out_maj = $data["out_maj"];
        $in_maj = $data["in_maj"];
        $department= $this->defineDepartment($data["in_maj"]);
        $comment = $data["comment"];
        $confirm =  $data["confirm"];
        DB::table('major')->where('id',$id)->update(array('id'=>$new_id,'rank_1'=>$rank_1,'rank_2'=>$rank_2,'year'=>$year,'score'=>$score,'out_maj'=>$out_maj,'in_maj'=>$in_maj,'department'=>$department,'comment'=>$comment,'confirm'=>$confirm))or die('MySQL query error');
        return "success update!";
    }

     //更新一筆資料的確認
    public function confirm(Request $request)
    {
        $data=$request->only(["id","confirm"]);
        $id=$data["id"];
        $confirm =  $data["confirm"];
        DB::table('major')->where('id',$id)->update(array('confirm'=>$confirm))or die('MySQL query error');
        return "success update confirm!";
    }

    //刪除一筆資料
    public function destroy($id)
    {
        
        DB::table('major')->where('id',$id)->delete();
        return "success delete!";
    }

    private function defineDepartment($in_maj){
        $LIB=["","中文系","外文系","台文系"];
        if($this->FindDepartment($in_maj,$LIB))
            return "文學院";
        //Log::debug($in_maj+" 不是文學院");
        $SCE=["","數學系","物理系","化學系","地科系","光電系"];
        if($this->FindDepartment($in_maj,$SCE))
            return "理學院";
        //Log::debug($in_maj+" 不是理學院");
        $ENG=["","機械系","化工系","材料系","資源系","土木系","水利系","工科系","系統系","航太系","環工系","測量系","醫工系","能源學程"];
        if($this->FindDepartment($in_maj,$ENG))
            return "工學院";
        //Log::debug($in_maj+" 不是工學院");
        $MAN=["","工資系","交管系","企管系","統計系","會計系"];
        if($this->FindDepartment($in_maj,$MAN))
            return "管理學院";
        //Log::debug($in_maj+" 不是管理學院");
        $MC=["","醫學系","醫技系","護理系","職治系","物治系","藥學系", "牙醫系"];
        if($this->FindDepartment($in_maj,$MC))
            return "醫學院";
        //Log::debug($in_maj+" 不是醫學院");
        $SOC=["","政治系","經濟系","法律系","心理系"];
        if($this->FindDepartment($in_maj,$SOC))
            return "社會科學院";
        //Log::debug($in_maj+" 不是社科院");
        $EECS=["","電機系","資訊系"];
        if($this->FindDepartment($in_maj,$EECS))
            return "電資學院";
        //Log::debug($in_maj+" 不是電資學院");
        $CPD=["","建築系","都計系","工設系"];
        if($this->FindDepartment($in_maj,$CPD))
            return "規設院";
        //Log::debug($in_maj+" 不是規設院");
        $BIO=["","生科系","生技系"];
        if($this->FindDepartment($in_maj,$BIO))
            return "生科院";
        //Log::debug($in_maj+" 不是生科院");
            return "其他";
    }
    private function FindDepartment($in_maj,$array){
        return (array_search($in_maj, $array)!=false)?true:false;
    }
}

