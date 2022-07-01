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
                $table->char('year', 3);
            },
            'content' => function (Blueprint $table) {
                $table->text('content');
            },
            'confirm' => function (Blueprint $table) {
                $table->boolean('confirm');
            },
            'timestamp' => function (Blueprint $table) {
                $table->timestamps();
            },
        ]);
    }
}
