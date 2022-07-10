<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OtherStatistic extends Model
{
    protected $table='OtherStatistic';
    protected $keyType = 'string';

    public $increamenting = false;
    public $timestamps = false;

    public function study()
    {
        return $this->belongsTo(Study::class);
    }
}
