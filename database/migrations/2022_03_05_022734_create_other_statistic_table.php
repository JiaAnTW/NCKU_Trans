<?php

use Illuminate\Database\Schema\Blueprint;

use App\BaseMigration;

class CreateOtherStatisticTable extends BaseMigration
{
    public function __construct(){
        parent::setTableName('OtherStatistic');
        parent::setCols([
            'id' => function (Blueprint $table) { $table->uuid('id')->primary(); },
            'name' => function (Blueprint $table) { $table->string('name',20); },
            'value' => function(Blueprint $table) { $table->string('value', 20); },
            'study_id' => function (Blueprint $table) { $table->uuid('study_id'); },
        ]);
    }
}
