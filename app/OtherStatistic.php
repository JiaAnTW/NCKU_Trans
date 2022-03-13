<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OtherStatistic extends Model
{
    protected $table='OtherStatistic';
    public $timestamps = false;

    // prevent laravel casting id to integer
    protected $casts = [
        'id' => 'string'
      ];

    public function study()
    {
        return $this->belongsTo('App\Study');
    }
}
