<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StatisticManage extends Model
{
    protected $table = 'StatisticManage';
    protected $keyType = 'string';

    public $increamenting = false;
    public $timestamps = false;

    public function statistics()
    {
        return $this->hasMany(Statistic::class, 'id');
    }
}
