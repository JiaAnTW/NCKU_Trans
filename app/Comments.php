<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
class Comments extends Model
{
    protected $table='major';
    public function inser($data){
        $type=$data["trans_type"];
        $year=$data["year"];
        $out_maj = $data["out_maj"];
        $in_maj = $data["in_maj"];
        $comment = $data["comment"];
        DB::insert('INSERT INTO entry VALUES("$type", "$year", "$out_maj","$in_maj","$comment")');
    }
}
