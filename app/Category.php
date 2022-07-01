<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    //
    protected $table = 'Category';
    public $timestamps = false;

    // prevent laravel casting id to integer
    protected $casts = [
        'id' => 'string',
        'study_id' => 'string'
    ];

    public function study()
    {
        return $this->belongsTo(Study::class);
    }

    public function categoryManage()
    {
        return $this->belongsTo(CategoryManage::class, 'id');
    }
}
