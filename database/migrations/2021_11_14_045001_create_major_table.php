<?php

use Illuminate\Database\Schema\Blueprint;

use App\BaseMigration;

class CreateMajorTable extends BaseMigration
{
    public function __construct(){
        parent::setTableName('major');
        parent::setCols([
            'id' => function (Blueprint $table) { $table->increments('id'); },
            'category' => function (Blueprint $table) { $table->string('category', 256); },
            'rank_1' => function (Blueprint $table) { $table->text('rank_1'); },
            'rank_2' => function (Blueprint $table) { $table->text('rank_2'); },
            'year' => function (Blueprint $table) { $table->integer('year')->unsigned(); },
            'score' => function (Blueprint $table) { $table->float('score'); },
            'isPass' => function (Blueprint $table) { $table->string('isPass', 10); },
            'out_maj' => function (Blueprint $table) { $table->text('out_maj'); },
            'in_maj' => function (Blueprint $table) { $table->text('in_maj'); },
            'department' => function (Blueprint $table) { $table->text('department'); },
            'confirm' => function (Blueprint $table) { $table->string('confirm', 7); }
        ]);
    }
}
