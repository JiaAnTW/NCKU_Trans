<?php

use Illuminate\Database\Schema\Blueprint;

use App\BaseMigration;

class CreateDepartmentTable extends BaseMigration
{
    public function __construct(){
        parent::setTableName('department');
        parent::setCols([
            'id' => function (Blueprint $table) { $table->increments('id'); },
            'name' => function (Blueprint $table) { $table->text('name'); },
            'college' => function (Blueprint $table) { $table->text('college'); },
        ]);
    }
}
