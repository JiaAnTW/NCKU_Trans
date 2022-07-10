<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CategoryManage extends Model
{
    protected $table = 'CategoryManage';
    protected $keyType = 'string';

    public $increamenting = false;
    public $timestamps = false;

    public function categories()
    {
        return $this->hasMany(Category::class, 'id');
    }
}
