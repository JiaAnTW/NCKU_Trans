<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    //
    protected $table='Category';
    public $timestamps = false;

    // prevent laravel casting id to integer
    protected $casts = [
        'id' => 'string'
      ];

    public function study()
    {
        return $this->belongsTo('App\Study', 'study_id');
    }
    
    public function category_manage()
    {
        return $this->belongsTo('App\CategoryManage', 'id');
    }
}
