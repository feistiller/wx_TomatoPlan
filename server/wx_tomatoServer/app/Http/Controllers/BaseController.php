<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class BaseController extends Controller
{

    //    介入机器人
    public function talkToRobot($useropenid, $content)
    {
        $url = getenv('ROBOT_URL');
        $key = getenv('ROBOT_KEY');
        $data = array(
            "key" => $key,
            'info' => $content,
            'userid' => $useropenid
        );
        $return = $this->curlPost($url, $data, 10, 1);
        if ($return['code'] == 100000) {
            return $return['text'];
        } else if ($return['code'] == 200000) {
            return $return['url'];
        } else {
            return "暂未支持";
        }
    }


    //post请求
    public function curlPost($url, $request, $timeout = 5, $status = 0)
    {
        $con = curl_init((string)$url);
        curl_setopt($con, CURLOPT_CUSTOMREQUEST, 'POST');
        curl_setopt($con, CURLOPT_HEADER, false);
        if ($status == 0) {
            curl_setopt($con, CURLOPT_POSTFIELDS, json_encode($request, JSON_UNESCAPED_UNICODE));
        } else {
            curl_setopt($con, CURLOPT_POSTFIELDS, http_build_query($request));
            curl_setopt($con, CURLOPT_HTTPHEADER, array('Content-Type: application/x-www-form-urlencoded'));
            curl_setopt($con, CURLOPT_FOLLOWLOCATION, true);
        }
        $this->log('curl','curl_post', $url, 'This is postURL:');
        $this->log('curl','curl_post', $request, 'This is post:');
        curl_setopt($con, CURLOPT_POST, true);
        curl_setopt($con, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($con, CURLOPT_TIMEOUT, (int)$timeout);
        $output = curl_exec($con);
        $this->log('curl','curl_post', $output, 'This is postReturn:');
        return json_decode($output, true);
    }

    //get请求
    public function curlGet($url, $data = null, $timeout = 5)
    {
        //初始化
        if ($data != null) {
            $url = $url . '?' . http_build_query($data);
        }
        $con = curl_init((string)$url);
        curl_setopt($con, CURLOPT_HEADER, false);
        curl_setopt($con, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($con, CURLOPT_TIMEOUT, (int)$timeout);
        curl_setopt($con, CURLOPT_SSL_VERIFYPEER, false);//这个是https。
        $this->log('curl','curl_get', $url, 'This is get:');
        $output = curl_exec($con);
        $this->log('curl','curl_get', $output, 'This is getReturn:');
        return $output;
    }

//    简单日志方法，其中file
    public function log($file, $name, $data, $data_before = '')
    {
//        判断是否log下属文件夹存在
        if (!is_dir('./log/' . $file)) {
            mkdir('./log/' . $file);
            $this->log('create_file', 'create_file', '建立文件夹'.$file);
        }
        $date = date("Y-m-d", time());
        $time = date("Y-m-d h:i:sa", time());
        file_put_contents('log/' . $file . '/' . $date . $name . '.log', $time . $data_before . json_encode($data, JSON_UNESCAPED_UNICODE) . PHP_EOL, FILE_APPEND);

    }
//    格式化返回Json
public function dataFormat($code,$msg,$data=null){
    $return_data=[
        'code'=>$code,
        'message'=>$msg,
        'data'=>$data
    ];
    return json_encode($return_data);
}

//    error显示页面
    public function error($msg)
    {
        return view('common.error', ['msg' => $msg]);
    }

}