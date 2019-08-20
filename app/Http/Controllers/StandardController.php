<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Standard;
use Illuminate\Support\Facades\DB;

class StandardController extends Controller
{
    //顯示所有資料

    public function index()
    {
        $data=Standard::all();
        return $data;
        //
    }
    //新增一筆資料
    public function create(Request $request)
    {
        $data=$request->only(["year","link"]);
        $id=1+DB::table('standard')->where('id', DB::raw("(select max(`id`) from standard)"))->value('id');
        $year=$data["year"];
        $link=$data["link"];
        DB::insert("INSERT INTO standard VALUES('$id','$year', '$link')") or die('MySQL query error');
        
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
        $data=$request->only(["year","link"]);
        $year=$data["year"];
        $link=$data["link"];
        DB::table('standard')->where('id',$id)->update(array('id'=>$id,'year' => $year,'link'=>$link))or die('MySQL query error');
    }

    //刪除一筆資料
    public function destroy($id)
    {
        DB::table('standard')->where('id',$id)->delete();
    }
}

