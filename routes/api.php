<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('get/major', 'CommentsController@show');
//Route::post('create/major','CommentsController@create');
Route::middleware('commentNotify')->post('create/major','CommentsController@create');

Route::get('get/major_QA', 'maj_QAController@show');
Route::post('post/major_QA','maj_QAController@create');
//Route::middleware('QANotify')->post('post/major_QA','maj_QAController@create');

Route::get('get/check', 'HomeController@check');

Route::get('get/department','DepartmentCollege@indexDepartment');
Route::get('get/college','DepartmentCollege@indexCollege');

Route::get('get/announcement', 'AnnouncementController@index');

Route::get('get/study', 'StudyController@show');
Route::post('post/study', 'StudyController@create');

Route::get('get/studyType', 'CategoryManageController@show');
Route::post('post/studyType', 'CategoryManageController@create');

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => ['jwt.auth','api-header']], function () {

    // all routes to protected resources are registered here  
    Route::get('get/major/all', 'CommentsController@index');
    Route::put('post/major/{id}','CommentsController@update');
    Route::patch('patch/major/{id}','CommentsController@confirm');
    Route::delete('post/major/{id}','CommentsController@destroy');

    Route::get('get/major_QA/all', 'maj_QAController@index');
    Route::put('post/major_QA/{id}', 'maj_QAController@update');
    Route::delete('post/major_QA/{id}','maj_QAController@destroy');

    Route::post('post/standard','StandardController@create');
    Route::put('post/standard/{id}','StandardController@update');

    Route::post('post/department','DepartmentCollege@createDepartment');
    Route::post('post/college','DepartmentCollege@createCollege');
    Route::put('post/college/{id}','DepartmentCollege@updateCollege');
    Route::put('post/department/{id}','DepartmentCollege@updateDepartment');
    Route::delete('post/college/{id}','DepartmentCollege@destroyCollege');
    Route::delete('post/department/{id}','DepartmentCollege@destroyDepartment');

    Route::put('post/announcement/{id}', 'AnnouncementController@update');

    Route::patch('patch/study', 'StudyController@confirm');
    Route::put('post/study', 'StudyController@update');
    Route::delete('delete/study', 'StudyController@destroy');

    Route::put('post/studyType', 'CategoryManageController@update');
    Route::delete('delete/studyType', 'CategoryManageController@destroy');

    Route::get('get/users/list', function(){
        $users = App\User::all();
        
        $response = ['success'=>true, 'data'=>$users];
        return response()->json($response, 201);
    });
    Route::post('post/user/logout', 'UserController@logout');
    Route::post('post/user/refresh', 'UserController@refresh');
});
Route::group(['middleware' => 'api-header'], function () {
  
    // The registration and login requests doesn't come with tokens 
    // as users at that point have not been authenticated yet
    // Therefore the jwtMiddleware will be exclusive of them
    Route::post('post/user/login', 'UserController@login');
    
    
    Route::post('post/user/register', 'UserController@register');
});