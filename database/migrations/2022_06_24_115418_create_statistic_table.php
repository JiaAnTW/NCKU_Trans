<?php

use Illuminate\Database\Schema\Blueprint;

use App\BaseMigration;

class CreateStatisticTable extends BaseMigration
{
    public function __construct()
    {
        parent::setTableName('Statistic');
        parent::setCols([
            'id' => function (Blueprint $table) {
                $table->uuid('id', 64);
            },
            'value' => function (Blueprint $table) {
                $table->string('value', 16);
            },
            'study_id' => function (Blueprint $table) {
                $table->uuid('study_id');
            },
        ]);
    }
}
