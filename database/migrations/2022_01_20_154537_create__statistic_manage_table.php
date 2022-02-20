<?php

use Illuminate\Database\Schema\Blueprint;

use App\BaseMigration;

class CreateStatisticManageTable extends BaseMigration
{
    public function __construct(){
        parent::setTableName('StatisticManage');
        parent::setCols([
            'id' => function (Blueprint $table) { $table->uuid('id')->primary(); },
            'name' => function (Blueprint $table) { $table->text('name'); },
            'dataType' => function (Blueprint $table) { $table->string('dataType',10); },
            'max' => function (Blueprint $table) { $table->float('max',10, 2)->default(0); },
            'min' => function (Blueprint $table) { $table->float('min',10, 2)->default(0); },
        ]);
    }
}
