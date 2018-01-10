/**
 * 存放处理公共事情的js 2017/7/25.
 */

let common={};
/*
*给html设置font-size
* */
window.onload = function(){
  let uiWidth = 750;
  document.documentElement.style.fontSize =
      document.documentElement.clientWidth * 100/uiWidth  + 'px';
};
global.setTitle = function (str) {
    document.getElementById('titleId').innerText = str;
};
global.setUserInfo = function (user) {
    sessionStorage.setItem('KEY_USER',JSON.stringify(user));
};
global.getUserInfo = function () {
    return JSON.parse(sessionStorage.getItem('KEY_USER'));
};
/* 上个月 */
global.getPreMonth = function(date) {
    var arr = date.split('-');
    var year = arr[0]; //获取当前日期的年份
    var month = arr[1]; //获取当前日期的月份
    var day = arr[2]; //获取当前日期的日
    var days = new Date(year, month, 0);
    days = days.getDate(); //获取当前日期中月的天数
    var year2 = year;
    var month2 = parseInt(month) - 1;
    if (month2 == 0) {
        year2 = parseInt(year2) - 1;
        month2 = 12;
    }
    var day2 = day;
    var days2 = new Date(year2, month2, 0);
    days2 = days2.getDate();
    if (day2 > days2) {
        day2 = days2;
    }
    if (month2 < 10) {
        month2 = '0' + month2;
    }
    var t2 = year2 + '/' + month2 + '/' + day2;
    return t2;
};
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
/**
 * 获取日期月份有多少天
 * @returns {number}
 */
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



