<?php

use Illuminate\Database\Schema\Blueprint;

use App\BaseMigration;

class CreateCategoryTable extends BaseMigration
{
    public function __construct(){
        parent::setTableName('Category');
        parent::setCols([
            'id' => function (Blueprint $table) { $table->uuid('id')->primary(); },
            'name' => function (Blueprint $table) { $table->string('name',20); },
            'study_id' => function (Blueprint $table) { $table->uuid('study_id'); },
        ]);
    }
}
