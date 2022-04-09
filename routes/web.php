<?php

use Illuminate\Http\Request;
use \App\Http\Controllers\CommentsController;
use \App\Http\Controllers\StudyController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/major', function (Request $request) {
    $schoolName = trans('comment.schoolName');
    $websiteTitleShort = trans('comment.websiteTitleShort');

    $description = null;
    $title = null;
    // Try to find target id in DB
    $data = CommentsController::showById($request);
    error_log($data);
    if($data){
        $title = trans('comment.essayTitle', array(
            'websiteTitleShort' => $websiteTitleShort,
            'schoolName' => $schoolName,
            'year' => $data['year'],
            'in_maj' => $data['in_maj'],
            'category' => $data['category']
        ));
        $description = str_replace("<br>","", $data['comment']); 
    }
    // If not found
    if(!$title) $title = trans('comment.websiteTitle', [
        'websiteTitleShort' => $websiteTitleShort,
        'schoolName' => $schoolName,
    ]);

    if(!$description) $description = trans('comment.description');
    
    // Preprocess
    try {
        if(mb_strlen($description) > 85) {
            $description = mb_substr($description, 0, 85) . "......";
        }
    } catch(Exception $e){
        error_log($e);
    }

    return view('index', compact('title', 'description'));
});

Route::get('/{any}', function (Request $request) {
    $schoolName = trans('comment.schoolName');
    $websiteTitleShort = trans('comment.websiteTitleShort'); 
    $title = trans('comment.websiteTitle', [
        'websiteTitleShort' => $websiteTitleShort,
        'schoolName' => $schoolName,
    ]);
    $description = trans('comment.description');

    // For single essay url
    $data = StudyController::showById($request);
    if($data){
        $title = trans('study.essayTitle', array(
            'websiteTitleShort' => $websiteTitleShort,
            'schoolName' => $schoolName,
            'title' => $data['title'],
        ));
        $description = str_replace("<br>","", $data['content']); 
    }
    try {
        if(mb_strlen($description) > 85) {
            $description = mb_substr($description, 0, 85) . "......";
        }
    } catch(Exception $e){
        error_log($e);
    }
    return view('index', compact('title', 'description'));
})->where('any', '^(?!api).*$');


Auth::routes();
