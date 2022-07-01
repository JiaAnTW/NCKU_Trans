<?php

use Illuminate\Database\Schema\Blueprint;

use App\BaseMigration;

class CreateStatisticManageTable extends BaseMigration
{
    public function __construct()
    {
        parent::setTableName('StatisticManage');
        parent::setCols([
            'id' => function (Blueprint $table) {
                $table->uuid('id')->primary();
            },
            'name' => function (Blueprint $table) {
                $table->string('name', 128);
            },
            'dataType' => function (Blueprint $table) {
                $table->string('dataType', 32);
            },
            'max' => function (Blueprint $table) {
                $table->float('max')->default(0);
            },
            'min' => function (Blueprint $table) {
                $table->float('min')->default(0);
            },
        ]);
    }
}
