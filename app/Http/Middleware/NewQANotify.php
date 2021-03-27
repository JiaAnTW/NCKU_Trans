<?php

namespace App\Http\Middleware;

use Closure;

class NewQANotify
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
        $access_token = array();
        
        $access_token[]=\config('line_notify.line_notify_token');
        $message="成大轉系平台有一件QA待審核";
        $TargetCount = count($access_token);
           $Push_Content['message'] = $message;
          // $Push_Content['imageThumbnail'] = "https://i.imgur.com/ZxuJGHG.png";
          // $Push_Content['imageFullsize'] = "https://i.imgur.com/ZxuJGHG.png";
          // $Push_Content['stickerPackageId'] = "3";
          // $Push_Content['stickerId'] = "180";
          for ($i=0;$i<$TargetCount;$i++) {
           $ch = curl_init("https://notify-api.line.me/api/notify");
           curl_setopt($ch, CURLOPT_POST, true);
           curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
           curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
           curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
           curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
           curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($Push_Content));
           curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/x-www-form-urlencoded',
            'Authorization: Bearer '.$access_token[$i]
           ));
           $response_json_str = curl_exec($ch);
           curl_close($ch);
        }
        return $next($request);
    }
}
