/**
 * 存放处理公共事情的js 2017/7/25.
 */

import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';
let common={};
/*
*给html设置font-size
* */
window.onload = function(){
  let uiWidth = 750;
  document.documentElement.style.fontSize =
      document.documentElement.clientWidth * 100/uiWidth  + 'px';
};
/**
 *  使用axios进行配置，ajax请求
 * */
//axios.defaults.baseURL = 'http://ip:port/';
axios.defaults.baseURL = 'http://mock.eolinker.com/';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
axios.defaults.timeout = 30000;
/**
 * params 请求参数
 * onCallBack 成功之后的回调函数
 */
Vue.prototype.$http = {
    Post: function (params,onCallBack) {
        httpSend('post',params,onCallBack);
    },
    Get : function (params,onCallBack) {
        httpSend('get',params,onCallBack);
    }
};
function httpSend(type,params,onCallBack) {
    let param = '';
    let url = params;
    if(type=='post'){
        param = qs.stringify(params.data);
        url = params.url;
    }
    axios({
        method: type,
        url: url,
        data:param
    }).then(function (response) {
        /* code==0表示成功  */
        if(response.data.code=="0"){
            onCallBack(response.data);
        }else{

        }
    }).catch(function(error){
        throw new Error('网络异常');
    });
}
Date.prototype.Format2String = function (fmt) {
    if(!this) return null;
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
Date.prototype.getMonthDay = function () {
    let curDate = this;
    let curMonth = curDate.getMonth();
    curDate.setMonth(curMonth + 1);
    curDate.setDate(0);
    return curDate.getDate();
};
/***
 * 格式化时间
 * @param fmt yyyy(年)，MM(月)，dd(日)，hh(时)，mm(分)，ss(秒)，S(毫秒)，q(季度)
 * @returns {String}  fmt格式的时间字符串
 * @constructor
 */
String.prototype.Format2String = function (fmt) {
    if(this == '') return null;
    var reg = new RegExp("^[0-9]*$");
    if(reg.test(this)){ // 如果全部是数字
        return new Date(this).Format2String(fmt);
    }
    var result = new Date(this.replace(/-/g,"/"));
    if(result.toString()=='Invalid Date'){
        console.log('时间格式不正确，请使用yyyy-MM-dd hh:MM:ss 或者 yyyy/MM/dd hh:MM:ss');
        return null;
    }
    return result.Format2String(fmt);
};

String.prototype.getMonthDay = function () {
    let curDate = new Date(this);
    let curMonth = curDate.getMonth();
    curDate.setMonth(curMonth + 1);
    curDate.setDate(0);
    return curDate.getDate();
};


