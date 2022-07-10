<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $table = 'Category';
    protected $keyType = 'string';

    public $increamenting = false;
    public $timestamps = false;

    public function study()
    {
        return $this->belongsTo(Study::class);
    }

    public function categoryManage()
    {
        return $this->belongsTo(CategoryManage::class, 'id');
    }
}
