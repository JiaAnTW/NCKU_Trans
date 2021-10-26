<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Announcement;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class AnnouncementController extends Controller
{
    //顯示所有資料

    public function index()
    {
        $this -> confirmTableExists();
        $data = Announcement::all();
        return $data;
        //
    }
    //新增一筆資料
    public function create(Request $request)
    {
        
    }

    //更新一筆資料
    public function update(Request $request, $id)
    {
        try{
            $data = $request->only(["id","msg","isShow"]);

            Announcement::where('id',$id)->update(array(
                'msg'=> $data['msg'],
                'isShow'=> $data['isShow'],
            )) or die('MySQL query error');

            return array('status' => "success");

        }catch (Exception $e) {
            return array('status' => "fail");
        }
    }

    //刪除一筆資料
    public function destroy($id)
    {
        Announcement::where('id',$id)->delete();
    }

    public function confirmTableExists(){
        if(Schema::hasTable('announcement'))
            return true;

        Schema::create('announcement', function($table){
            $table->increments('id');
            $table->string('msg', 256);
            $table->string('isShow', 10);
            $table->timestamps();
        });

        $this -> initData();
        return false;
    }

    public function initData(){
        $defaultData = array(
            'msg'=> '',
            'isShow' => 'false'
        );

        Announcement::insert($defaultData) or die('MySQL query error');
    }
}

