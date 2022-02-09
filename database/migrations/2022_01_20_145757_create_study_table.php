<?php

use Illuminate\Database\Schema\Blueprint;

use App\BaseMigration;

class CreateStudyTable extends BaseMigration
{
    public function __construct(){
        parent::setTableName('Study');
        parent::setCols([
            'id' => function (Blueprint $table) { $table->uuid('id')->primary(); },
            'title' => function (Blueprint $table) { $table->text('title'); },
            'content' => function (Blueprint $table) { $table->text('content'); },
            'timestamp' => function (Blueprint $table) { $table->timestamps(); },
            'confirm' => function (Blueprint $table) { $table->string('confirm', 10); },
        ]);
    }
}
