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
                'status' => 1,
                'del'=>0
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
            'del'=>0
        ];
//        这里做一个服务器的筛选，当用户做查询时对于所有的数据进行foreach，更新状态
        $db=DB::table('events_status');
        $data=$db->where($find_array)->get();
        foreach($data as $k=>$v){
            if($v->endTime<=time()&&$v->status==1){
                $db->where('id',$v->id)->update(['status'=>2]);
                $data[$k]->status=2;
            }
        }
        return $this->dataFormat(0,'',$data);
    }
    /**
     * 删除清空用户的任务(暂时全部删除)
     */
    public function delPlans(Request $request){
        $openId = $request->input('openId');
        $find_array=[
            'openId'=>$openId,
        ];
        $data=DB::table('events_status')->where($find_array)->update(['del'=>1]);
        return $this->dataFormat(0,'清除成功',$data);
    }
    /**
     * notice所有的通知
     */
    public function notice(){
        $data=DB::table('wx_notice')->orderBy('id','desc')->first();
        return $this->dataFormat(0,'',$data);
    }
}