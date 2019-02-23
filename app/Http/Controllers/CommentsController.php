<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Comments;
use Illuminate\Support\Facades\DB;

class CommentsController extends Controller
{
    //顯示所有資料
    public function index()
    {
        $data=Comments::all();
        return $data;
        //
    }
    //新增一筆資料
    public function create(Request $request)
    {
        $data=$request->only(["trans_type","year","out_maj","in_maj","comment"]);
        $id=1+DB::table('entry')->where('id', DB::raw("(select max(`id`) from entry)"))->value('id');
        $type=$data["trans_type"];
        $year=(int) $data["year"];
        $out_maj = $data["out_maj"];
        $in_maj = $data["in_maj"];
        $comment = $data["comment"];
        DB::insert("INSERT INTO entry VALUES('$id','$type', '$year', '$out_maj','$in_maj','$comment')") or die('MySQL query error');
        
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
    public function update(Request $request, $id)
    {
        //
    }

    //刪除一筆資料
    public function destroy($id)
    {
        //
    }
}

