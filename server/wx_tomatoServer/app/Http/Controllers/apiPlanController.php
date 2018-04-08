<?php
/**
 * Created by PhpStorm.
 * User: fs
 * Date: 2018/4/8
 * Time: 18:34
 */
namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Request;

class apiPlanController extends BaseController
{
//    存储用户的计划
    public function savePlan(Request $request)
    {
        $openId = $request->input('openId');
        $startTime = (int)$request->input('startTime');
        $endTime = $startTime+ $request->input('needTime') * 60;
        $eventTitle = $request->input('name');
        if ($openId && $startTime && $endTime && $eventTitle) {
            $save_data = [
                'openId' => $openId,
                'startTime' => $startTime,
                'endTime' => $endTime,
                'eventTitle' => $eventTitle,
                'status' => 1
            ];
            if(DB::table('events_status')->insert($save_data)){
                return $this->dataFormat(0,'增加成功');
            }else{
                return $this->dataFormat(1, '意料外的错误');
            }
        } else {
            return $this->dataFormat(1, '您的格式有问题');
        }
    }

    /**
     * 更新显示用户的任务状态
     */
    public function showPlans(Request $request){
        $openId = $request->input('openId');
        $find_array=[
            'openId'=>$openId,
            'status'=>1
        ];
        $data=DB::table('events_status')->where($find_array)->find();
        return $this->dataFormat(0,'',$data);

    }
    /**
     * 删除清空用户的任务(暂时全部删除)
     */
    public function delPlans(Request $request){
        $openId = $request->input('openId');
        $find_array=[
            'openId'=>$openId,
            'status'=>1
        ];
        $data=DB::table('events_status')->where($find_array)->update('status',2);
        if($data){
            return $this->dataFormat(0,'',$data);
        }else{
            return $this->dataFormat(1,'不知道什么错误');
        }
    }
}