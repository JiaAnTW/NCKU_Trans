<?php

namespace App\Http\Middleware;

use Closure;
use Exception;

use App\StatisticManage;

class NewStudyNotify 
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */

    public function handle($request, Closure $next)
    {    
        $title = $request->title;
        $content = $request->content;
        $year = $request->year;
        $major = $request->major;
        $statistic = $request["statistic"];
        // $otherStatistic = $request["otherStatistic"];

        $basicData = [
            [
                "name" => "申請年",
                "value" => $year,
                "inline" => false
            ],
            [
                "name" => "主修",
                "value" => $major,
                "inline" => false
            ]
        ];

        $statisticData = array_map(function($element) {
            $statistic_name = StatisticManage::select('name')->where('id', $element['id'])->get();
            return array('name' => $statistic_name, 'value' => $element['value'], "inline" => false);
        }, $statistic);

        // $otherStatisticData = array_map(function($element) {
        //     $name = $element['name'];
        //     return array('name' => "[其他數據] {$name}", 'value' => $element['value'], "inline" => false);
        // }, $otherStatistic);

        $basicData = array_merge($basicData, $statisticData);
        // $basicData = array_merge($basicData, $otherStatisticData);
        
        $webhookurl = env('DISCORD_WEBHOOK_STUDY');
        try{
            $timestamp = date("c", strtotime("now"));
            $json_data = json_encode([
                "content" => "<@&857153250213756928> 有一則新的[通用學業心得]需要你審查喔!",      
                "username" => "心得審查通知",
                "tts" => false,
                "embeds" => [
                    [
                        // Embed Title
                        "title" => "{$title}",
                        "type" => "rich",
                        "description" => "{$content}",
                        "url" => "",
                        "timestamp" => $timestamp,
                        "color" => hexdec("feda6a"),
                        "fields" => $basicData
                    ]
                ]
            ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE );


            $ch = curl_init( $webhookurl );
            curl_setopt( $ch, CURLOPT_HTTPHEADER, array('Content-type: application/json'));
            curl_setopt( $ch, CURLOPT_POST, 1);
            curl_setopt( $ch, CURLOPT_POSTFIELDS, $json_data);
            curl_setopt( $ch, CURLOPT_FOLLOWLOCATION, 1);
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
            curl_setopt( $ch, CURLOPT_HEADER, 0);
            curl_setopt( $ch, CURLOPT_RETURNTRANSFER, 1);

            $response = curl_exec( $ch );
            $curl_err = curl_error($ch);
            // If you need to debug, or find out why you can't send message uncomment line below, and execute script.
            curl_close( $ch );
            
        }catch(Exception $e){
            echo 'Caught exception: ',  $e->getMessage(),'<br>';  
        }
        
               
        return $next($request);
    }
}
