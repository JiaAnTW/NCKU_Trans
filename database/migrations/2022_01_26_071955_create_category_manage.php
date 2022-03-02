<?php

use Illuminate\Database\Schema\Blueprint;

use App\BaseMigration;

class CreateCategoryManage extends BaseMigration
{
    public function __construct(){
        parent::setTableName('CategoryManage');
        parent::setCols([
            'id' => function (Blueprint $table) { $table->uuid('id')->primary(); },
            'name' => function (Blueprint $table) { $table->string('name',20); },
        ]);
    }
}
