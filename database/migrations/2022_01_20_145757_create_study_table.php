<?php

use Illuminate\Database\Schema\Blueprint;

use App\BaseMigration;

class CreateStudyTable extends BaseMigration
{
    public function __construct()
    {
        parent::setTableName('Study');
        parent::setCols([
            'id' => function (Blueprint $table) {
                $table->uuid('id')->primary();
            },
            'title' => function (Blueprint $table) {
                $table->string('title', 1024);
            },
            'major' => function (Blueprint $table) {
                $table->string('major', 128);
            },
            'year' => function (Blueprint $table) {
                $table->string('year', 8);
            },
            'content' => function (Blueprint $table) {
                $table->text('content');
            },
            'confirm' => function (Blueprint $table) {
                $table->string('confirm', 16);
            },
            'timestamp' => function (Blueprint $table) {
                $table->timestamps();
            },
        ]);
    }
}
