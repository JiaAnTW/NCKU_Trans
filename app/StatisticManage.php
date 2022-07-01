<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StatisticManage extends Model
{
    //
    protected $table = 'StatisticManage';
    public $timestamps = false;

    // prevent laravel casting id to integer
    protected $casts = [
        'id' => 'string',
        'name' => 'string'
    ];

    public function statistics()
    {
        return $this->hasMany(Statistic::class, 'id');
    }
}
