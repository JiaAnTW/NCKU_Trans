<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateTableCharset extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $this->migrateCharsetTo('utf8mb4', 'utf8mb4_general_ci');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $this->migrateCharsetTo('utf8', 'utf8_general_ci');
    }

    protected function migrateCharsetTo($charset, $collation)
    {
        $defaultConnection = config('database.default');
        $databaseName = config("database.connections.{$defaultConnection}.database");

        // Change default charset and collation
        DB::unprepared("ALTER SCHEMA {$databaseName} DEFAULT CHARACTER SET {$charset} DEFAULT COLLATE {$collation};");

        // Get the list of all tables
        $tableNames = DB::table('information_schema.tables')
            ->where('table_schema', $databaseName)->get(['TABLE_NAME'])->pluck('TABLE_NAME');

        // Iterate through the list and alter each table
        foreach ($tableNames as $tableName) {
            DB::unprepared("ALTER TABLE {$tableName} CONVERT TO CHARACTER SET {$charset} COLLATE {$collation};");

        }

        // Get the list of all columns that have a collation
        $columns = DB::table('information_schema.columns')
            ->where('table_schema', $databaseName)
            ->whereNotNull('COLLATION_NAME')
            ->get();

        // Iterate through the list and alter each column
        foreach ($columns as $column) {
            $tableName = $column->TABLE_NAME;
            $columnName = $column->COLUMN_NAME;
            $columnType = $column->COLUMN_TYPE;

            $null = 'DEFAULT NULL';
            if ($column->IS_NULLABLE == 'NO') {
                $null = 'NOT NULL';
            }

            $sql = "ALTER TABLE {$tableName}
                    CHANGE `{$columnName}` `{$columnName}`
                    {$columnType}
                    CHARACTER SET {$charset}
                    COLLATE {$collation}
                    {$null}";
            DB::unprepared($sql);
        }
    }
}
