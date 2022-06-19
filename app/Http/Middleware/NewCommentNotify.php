<?php

namespace App\Http\Middleware;

use Closure;
use Exception;

class NewCommentNotify 
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
        $data=$request->only(["category","rank_1","rank_2","year","score","out_maj","in_maj","comment", "isPass"]);
        $rank_1=$data["rank_1"];
        $rank_2=$data["rank_2"];
        $category = $data["category"];
        $year=$data["year"];
        $score = $data["score"];
        $out_maj = $data["out_maj"];
        $in_maj = $data["in_maj"];
        $comment = $data["comment"];
        $isPass = $data["isPass"] == 'true' ? 'true' : 'false';

        $webhookurl = env('DISCORD_WEBHOOK_MAJOR');
        try{
            $timestamp = date("c", strtotime("now"));
            $json_data = json_encode([
                "content" => "<@&857153250213756928> 有一則新的[轉雙輔系心得]需要你審查喔!",      
                "username" => "心得審查通知",
                "tts" => false,
                "embeds" => [
                    [
                        // Embed Title
                        "title" => "{$category} - $in_maj",
                        "type" => "rich",
                        "description" => "{$comment}",
                        "url" => "",
                        "timestamp" => $timestamp,
                        "color" => hexdec( $isPass == 'true' ? "3366ff" : "d25565" ),
                        "fields" => [
                            [
                                "name" => "申請年",
                                "value" => $year,
                                "inline" => false
                            ],
                            [
                                "name" => "平均分數",
                                "value" => $score,
                                "inline" => false
                            ],
                            [
                                "name" => "排名上/下",
                                "value" => "{$rank_1}/{$rank_2}",
                                "inline" => false
                            ],
                            [
                                "name" => "原主修",
                                "value" => $out_maj,
                                "inline" => false
                            ],
                            [
                                "name" => "申請結果",
                                "value" =>  $isPass == 'true' ? "通過" : "未通過",
                                "inline" => false
                            ]
                        ]
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
