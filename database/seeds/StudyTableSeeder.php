<?php

use App\Category;
use App\CategoryManage;
use App\Http\Controllers\CategoryManageController;
use App\StatisticManage;
use Illuminate\Database\Seeder;

use App\Http\Controllers\StudyController;
use App\Study;
use Illuminate\Http\Request;


class StudyTableSeeder extends Seeder
{
    private function genByType($statistics)
    {
        if (!strcmp($statistics["dataType"], "int") || !strcmp($statistics["dataType"], "float"))
            $value = rand($statistics["min"], $statistics["max"]);
        else
            $value = array_random(["甲", "乙", "丙", "丁", "戊", "己"]);
        return array('id' => $statistics["id"], 'value' => $value);
    }
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        try {
            $categories = CategoryManage::all()->toArray();
            $statistics = StatisticManage::all()->toArray();
            $controller = new StudyController;
            // $otherstat = array(["name" => "TOEFL","value" => "100"]);
            // array_push($otherstat, array("name" => "PET","value" => "pass"));
            // array_push($otherstat, array("name" => "IELTS","value" => "5.5"));
            $controller->create(new Request([
                "title" => "轉系後的學分抵免和選課",
                "content" => "Q: 轉系後的學分抵免怎麼運作的?<br>A:  要關注轉入系的公告，照公告寫的方式處理。以108年資訊系為例:使用學校的轉系生學分抵免線上系統，照以下方式操作:<br>1. 抵免轉入系的本系選必修 =>點選要拿來抵跟被抵的課後，附上課綱。<br>2. 抵免轉入系的外系選修=>點選「以原科目名稱抵免」<br>3.申請轉通識=>點選「申請通識中心抵免」<br><br>如果忘記申請或是填錯的話建議去系辦問一下，如果不是跟轉入系選必修同名字，通常非通識會全部轉成外系選修。<br><br>============================<br><br>Q: 選課一階在轉系名單公布前，轉系後選不到必修怎麼辦?<br>A: 如果是系上必修，三階的時候會有個給轉系/轉學生的特別時段，直接去找系辦人工加選就可以了。理論上因為早晚都要修，轉系生不會受名額限制，系上都會給加選。<br><br>但是，一階在選通識的時候如果想預先照轉過去的課表選，但跟原系的必修衝突的時候，就只能賭自己會轉過然後退原系必修。不過為了補償這件事，轉系生在2階選課的時候可以跟新生一起抽通識，要特別注意這點。<br><br>另外，轉系通過後，原系必修不會從自己的課表上消失，如果有想回去修的課可以留著。<br><br>============================<br><br>Q: 原系修的OO課可以抵免之後想轉入系的OO課嗎?<br>A: 每個系通常會有「等同課程表」(一般會公布在該系的網站)，如果有寫在上面的就能抵。不過要注意的是:<br>1. 不見得同名字的課程就一定會承認。<br>2. 同一門課，不見得承認(一)就會承認(二)，甚至有承認(二)不承認(一)的狀況。<br><br>如果找不到等同課程表或是有其他不清楚的問題，要去想轉入系的系辦詢問承辦人員",
                "year" => 108,
                "major" => "其他",
                "category" => array_map(function ($key) use ($categories) {
                    return ($categories[$key]);
                }, array_rand($categories, rand(2, 3))),
                "statistic" => [],
                "confirm" => 1,
                // "otherStatistic" => []
            ]));
            sleep(2);
            $controller->create(new Request([
                "title" => "心得1",
                "content" => "test1",
                "year" => 110,
                "major" => "台文系",
                "category" => array_map(function ($key) use ($categories) {
                    return ($categories[$key]);
                }, array_rand($categories, rand(2, 3))),
                "statistic" => array_map(function ($key) use ($statistics) {
                    return $this->genByType($statistics[$key]);
                }, array_rand($categories, rand(2, 3))),
                "confirm" => 1,
                // "otherStatistic" => $otherstat
            ]));
            sleep(2);
            $controller->create(new Request([
                "title" => "心得2",
                "content" => "test2",
                "year" => 109,
                "major" => "機械系",
                "category" => array_map(function ($key) use ($categories) {
                    return $categories[$key];
                }, array_rand($categories, rand(2, 3))),
                "statistic" => array_map(function ($key) use ($statistics) {
                    return $this->genByType($statistics[$key]);
                }, array_rand($categories, rand(2, 3))),
                "confirm" => 0,
                // "otherStatistic" => $otherstat
            ]));
            sleep(2);
            $controller->create(new Request([
                "title" => "心得3",
                "content" => "test3",
                "year" => 110,
                "major" => "化工系",
                "category" => array_map(function ($key) use ($categories) {
                    return $categories[$key];
                }, array_rand($categories, rand(2, 3))),
                "statistic" => array_map(function ($key) use ($statistics) {
                    return $this->genByType($statistics[$key]);
                }, array_rand($categories, rand(2, 3))),
                "confirm" => 1,
                // "otherStatistic" => $otherstat
            ]));
            sleep(2);
            $controller->create(new Request([
                "title" => "某公司實習心得",
                "content" => "在某公司實習後，覺得不賴，推薦其他人應徵",
                "year" => 109,
                "major" => "電資學院",
                "category" => array_map(function ($key) use ($categories) {
                    return $categories[$key];
                }, array_rand($categories, rand(2, 3))),
                "statistic" => array_map(function ($key) use ($statistics) {
                    return $this->genByType($statistics[$key]);
                }, array_rand($categories, rand(2, 3))),
                "confirm" => 0,
                // "otherStatistic" => $otherstat
            ]));
        } catch (Exception $e) {
            error_log($e->getMessage());
        }
    }
}
