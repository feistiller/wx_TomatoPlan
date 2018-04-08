<?php

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

Route::get('/', function () {
    return view('welcome');
});
//用户存储plan
Route::post('api/savePlan', 'apiPlanController@savePlan');
//获取小程序的openID
Route::get('wx_api/saveCode','wxAppController@saveCode');
Route::post('wx_api/saveUserData','wxAppController@saveUserData');
