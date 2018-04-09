<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Request;

class wxAppController extends BaseController
{
//    保存code和session
    public function saveCode(Request $request)
    {
        $code = $request->input('code');
        $url = getenv("GET_USER_SESSION_KEY");
        $url = $url . "js_code=" . $code . '&grant_type=authorization_code';
        $data = json_decode($this->curlGet($url));
        if (isset($data->openid)) {
            $data_save = array(
                'code' => $code,
                'openId' => $data->openid,
                'sessionKey' => $data->session_key,
                'time' => time()
            );
            $temp_find = DB::table('wx_user_session')->where('openId', $data->openid)->first();
            if ($temp_find) {
//                已经存在直接更新
                DB::table('wx_user_session')->where('id', $temp_find->id)->update($data_save);
            } else {
                DB::table('wx_user_session')->insert($data_save);
            }

        } else {
            return $this->dataFormat(1, '用户登录错误', ['code' => $data->code]);
        }

        return $this->dataFormat(0, '获取成功', ['openId' => $data->openid]);
    }

    /***
     * 这个是接收用户资料的地方
     */
    public function saveUserData(Request $request)
    {

        $user_status = $request->input('status');
        $openId = $request->input('userOpenId');
        if ($user_status == 1) {
//        用户同意的情况
            $save_data=array(
              'userData'=>json_encode($request->input('userInfo'),JSON_UNESCAPED_UNICODE),
                'openId'=>$openId
            );
        } elseif ($user_status == 2) {
            //        用户不同意的情况
            $save_data=array(
                'openId'=>$openId
            );
        }else{
            return $this->dataFormat(1,'参数错误');
        }
        if(DB::table('wx_user_data')->where($save_data)->first()){
            return $this->dataFormat(0,'登录成功');
        }else{
            if(DB::table('wx_user_data')->insert($save_data)){
                return $this->dataFormat(0,'登录成功');
            }else{
                return $this->dataFormat(1,'出现问题');
            }
        }

    }
    /**
     * 用户微信的反馈收集
     */
    public function userFeedback(Request $request){
        $openId = $request->input('openId');
        if($openId){
            $save_data=[
                'text'=>$request->input('text'),
                'email'=>$request->input('email'),
                'openId'=>$openId
            ];
            DB::table('user_feedback')->insert($save_data);
            return $this->dataFormat(0,'反馈成功');
        }else{
            return $this->dataFormat(1,'您的数据错误');
        }
    }
}