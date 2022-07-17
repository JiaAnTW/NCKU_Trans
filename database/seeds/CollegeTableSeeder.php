<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

use App\College;

class CollegeTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        try {
            $colleges = [
                '文學院',
                '理學院',
                '工學院',
                '管理學院',
                '醫學院',
                '社會科學院',
                '電資學院',
                '規設院',
                '生科院',
                '其他'
            ];

            foreach ($colleges as $college) {
                College::create([
                    'name' => $college,
                ]);
            }
        } catch(Exception $e){
            error_log($e->getMessage());
        }
    }
}
