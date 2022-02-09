<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Study extends Model
{
    //
    protected $table='Study';
    public $timestamps = false;

    // prevent laravel casting id to integer
    protected $casts = [
        'id' => 'string'
      ];


}
