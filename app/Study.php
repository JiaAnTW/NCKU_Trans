<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Study extends Model
{
    protected $table = 'Study';
    protected $keyType = 'string';

    public $increamenting = false;
    public $timestamps = false;

    public function categories()
    {
        return $this->hasMany(Category::class);
    }

    public function statistics()
    {
        return $this->hasMany(Statistic::class);
    }

    public function otherStatistic()
    {
        return $this->hasMany(OtherStatistic::class);
    }
}
