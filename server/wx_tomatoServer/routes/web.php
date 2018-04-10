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
//用户显示plan
Route::post('api/showPlans', 'apiPlanController@showPlans');
//文字通知
Route::get('api/notice','apiPlanController@notice');
//用户删除plan
Route::post('api/delPlans', 'apiPlanController@delPlans');
//获取小程序的openID
Route::get('wx_api/saveCode','wxAppController@saveCode');
Route::post('wx_api/saveUserData','wxAppController@saveUserData');

//反馈收集
Route::post('wx_api/userFeedback','wxAppController@userFeedback');

