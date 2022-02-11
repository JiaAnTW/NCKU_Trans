<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CategoryManage extends Model
{
    //
    protected $table='CategoryManage';
    public $timestamps = false;

    // prevent laravel casting id to integer
    protected $casts = [
        'id' => 'string'
      ];
}
