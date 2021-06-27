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
        $data=$request->only(["category","rank_1","rank_2","year","score","out_maj","in_maj","comment"]);
        $rank_1=$data["rank_1"];
        $rank_2=$data["rank_2"];
        $category = $data["category"];
        $year=$data["year"];
        $score = $data["score"];
        $out_maj = $data["out_maj"];
        $in_maj = $data["in_maj"];
        $comment = $data["comment"];

        $webhookurl = env('DISCORD_WEBHOOK');
        error_log($webhookurl);
        try{
            $timestamp = date("c", strtotime("now"));
            $json_data = json_encode([
                "content" => "<@&857153250213756928> 有一則新的心得需要你審查歐!",      
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
                        "color" => hexdec( "3366ff" ),
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
            error_log("Response: ".$response);
            error_log("Error: ".$curl_err);
            // If you need to debug, or find out why you can't send message uncomment line below, and execute script.
            curl_close( $ch );
            
        }catch(Exception $e){
            echo 'Caught exception: ',  $e->getMessage(),'<br>';  
        }
        
               
        return $next($request);
    }
}
