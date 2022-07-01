<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Statistic extends Model
{
    //
    protected $table = 'Statistic';
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

    public function statistiManage()
    {
        return $this->belongsTo(StatisticManage::class, 'id');
    }
}
