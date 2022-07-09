<?php

use Illuminate\Database\Schema\Blueprint;

use App\BaseMigration;

class CreateAnnouncementTable extends BaseMigration
{
    public function __construct(){
        parent::setTableName('announcement');
        parent::setCols([
            'id' => function (Blueprint $table) { $table->increments('id'); },
            'msg' => function (Blueprint $table) { $table->string('msg', 256); },
            'isShow' => function (Blueprint $table) { $table->string('isShow', 10); },
            'created_at' => function (Blueprint $table) { $table->timestamps(); },
        ]);
    }
}
