<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Statistic extends Model
{
    protected $table = 'Statistic';
    protected $keyType = 'string';

    public $increamenting = false;
    public $timestamps = false;

    public function study()
    {
        return $this->belongsTo(Study::class);
    }

    public function statistiManage()
    {
        return $this->belongsTo(StatisticManage::class, 'id');
    }
}
