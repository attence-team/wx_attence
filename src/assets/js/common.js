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
/**
 * 获取下一个月
 * @date 格式为yyyy-mm-dd的日期，如：2014-01-25
 */
global.getNextMonth = function(date) {
    var arr = date.split('-');
    var year = arr[0]; //获取当前日期的年份
    var month = arr[1]; //获取当前日期的月份
    var day = arr[2]; //获取当前日期的日
    var days = new Date(year, month, 0);
    days = days.getDate(); //获取当前日期中的月的天数
    var year2 = year;
    var month2 = parseInt(month) + 1;
    if (month2 == 13) {
        year2 = parseInt(year2) + 1;
        month2 = 1;
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

    var t2 = year2 + '-' + month2 + '-' + day2;
    return t2;
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
/**
 * 获取日期月份有多少天
 * @returns {number}
 */
Date.prototype.getMonthDay = function () {
  //构造当前日期对象
  var date = this;
  //获取年份
  var year = date.getFullYear();
  //获取当前月份
  var mouth = date.getMonth() + 1;
  //定义当月的天数；
  var days ;
  //当月份为二月时，根据闰年还是非闰年判断天数
  if(mouth == 2){
    days= year % 4 == 0 ? 29 : 28;
  }
  else if(mouth == 1 || mouth == 3 || mouth == 5 || mouth == 7 || mouth == 8 || mouth == 10 || mouth == 12){
    //月份为：1,3,5,7,8,10,12 时，为大月.则天数为31；
    days= 31;
  }
  else{
    //其他月份，天数为：30.
    days= 30;
  }
  return days;
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
    var _this = this;
    if(this.length==8){
        _this = this.substring(0,4)+'/'+this.substring(4,6)+'/'+this.substring(6,8);
    }
    if(reg.test(_this)){ // 如果全部是数字
        return new Date(_this).Format2String(fmt);
    }
    var result = new Date(_this.replace(/-/g,"/"));
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
Array.prototype.remove = function(val) {
  for(let i=0;i<this.length;i++){
     if(this[i].value===val.value){
       this.splice(i, 1);
       break;
     }
  }
};


