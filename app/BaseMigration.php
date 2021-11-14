<?php

namespace App;

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

abstract class BaseMigration extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    private $cols = [];
    private $tableName = null;

    protected function setCols($cols){
        $this->cols = $cols;
    }

    protected function setTableName($tableName){
        $this->tableName = $tableName;
    }

    public function up()
    {
        if (Schema::hasTable($this->tableName)) {
            $this -> createNotExistCols($this-> cols);
            return;
        }
        $this -> createTable($this-> cols);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists($this->tableName);
    }


    private function createTable($cols){
        Schema::create($this->tableName, function (Blueprint $table) use($cols) {
            foreach($cols as $generateCol) {
                $generateCol($table);
            }
        });      
    }

    private function createNotExistCols($cols){
        foreach($cols as $colName => $generateCol) {
            if(Schema::hasColumn($this->tableName, $colName))
                continue;

            Schema::table($this->tableName, function (Blueprint $table) use($generateCol){
                $generateCol($table);
            });
        }    
    }
}
