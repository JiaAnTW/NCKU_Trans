<?php

use Illuminate\Database\Schema\Blueprint;

use App\BaseMigration;

class CreateCollegeTable extends BaseMigration
{
    public function __construct(){
        parent::setTableName('college');
        parent::setCols([
            'id' => function (Blueprint $table) { $table->increments('id'); },
            'name' => function (Blueprint $table) { $table->text('name'); },
        ]);
    }
}
