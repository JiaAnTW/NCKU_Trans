<?php

use Illuminate\Database\Schema\Blueprint;

use App\BaseMigration;

class CreateCategoryTable extends BaseMigration
{
    public function __construct(){
        parent::setTableName('Category');
        parent::setCols([
            'id' => function (Blueprint $table) { $table->uuid('id'); },
            'study_id' => function (Blueprint $table) { $table->uuid('study_id'); },
        ]);
    }
}
