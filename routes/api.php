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

Route::get('get/major', 'CommentsController@index');

Route::post('create/major','CommentsController@create');

Route::put('post/major/{id}','CommentsController@update');

Route::delete('post/major/{id}','CommentsController@destroy');

Route::get('get/major_QA', 'maj_QAController@index');

Route::put('post/major_QA/{id}', 'maj_QAController@update');

Route::delete('post/major_QA/{id}','maj_QAController@destroy');