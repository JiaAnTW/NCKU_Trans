<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class InitializeStudy extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('CategoryManage', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name', 64);
        });

        Schema::create('StatisticManage', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name', 64);
            $table->string('dataType', 16);
            $table->float('max')->default(0);
            $table->float('min')->default(0);
        });

        Schema::create('Study', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('title', 128);
            $table->string('major', 64);
            $table->year('year');
            $table->tinyInteger('confirm');
            $table->timestamps();
            $table->text('content');
        });

        Schema::create('Category', function (Blueprint $table) {
            $table->uuid('Study_id');
            $table->uuid('id');
        });

        Schema::create('Statistic', function (Blueprint $table) {
            $table->uuid('Study_id');
            $table->uuid('id');
            $table->string('value', 16);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('Category');
        Schema::drop('Statistic');
        Schema::drop('CategoryManage');
        Schema::drop('StatisticManage');
        Schema::drop('Study');
    }
}
