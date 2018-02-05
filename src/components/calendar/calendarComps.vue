<template>
    <div class="calendar">
        <ul class="clearfix">
            <li :class="time.type" @click="clickDay(idx)" v-for="(time,idx) in dateList">
                <span>{{time.value}}</span>
            </li>
        </ul>
    </div>
</template>
<script>
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
    export default {
        name: 'calendar',
        data(){
            return {
                time: new Date(),
                dateList:[],
                recordList:[]
            }
        },
        props: {
            curTime: {
                type: String,
                default: ((new Date()).Format2String('yyyy-MM-dd'))
            },
            dataList:{
               type:Array,
               default:[]
            }
        },
        watch:{
            curTime(curVal,oldVal){
                this.time = new Date(curVal);
                this.initCalendar();
                this.setDateSelect(new Date().Format2String('yyyy-MM-dd'),'active');
                this.$emit('clickDate',new Date().Format2String('yyyy-MM-dd'));
            },
            dataList(curVal,oldVal){
               this.recordList = curVal;
               this.setDateSelectList();
            }
        },
        activated(){
           //this.initCalendar();
           this.setDateSelect(new Date().Format2String('yyyy-MM-dd'),'active');
        },
        mounted(){
//            this.setDateSelect('2018-01-08','warn');
//            this.setDateSelect('2018-01-05','warn');
//            this.setDateSelect('2018-01-04','normal');
//            this.setDateSelect('2018-01-03','normal');
//            this.setDateSelect('2018-01-02','normal');
//            this.setDateSelect('2018-01-01','normal');
//            this.setDateSelect('2017-12-31','diabled normal');
        },
        methods:{
            clickDay(idx){
                if(this.dateList[idx].time){
                    this.setDateSelect(this.dateList[idx].time,'active');
                    this.$emit('clickDate',this.dateList[idx].time);
                }
            },
            setDateSelectList(){
                //2:迟到, 3:早退, 4:请假, 9:休息日, 5:未刷卡
                for(let i=0;i<this.recordList.length;i++){
                   let record = this.recordList[i];
                   if(record.bursh_mark==2||record.bursh_mark==3||record.bursh_mark==5){
                     this.setDateSelect(record.year_month,'warn');
                   }else if(record.bursh_mark==4){
                     this.setDateSelect(record.year_month,'normal');
                   }
                }
            },
            initCalendar(){
                this.dateList = [
                    {value:'日',type:''}, {value:'一',type:''}, {value:'二',type:''},
                  {value:'三',type:''}, {value:'四',type:''}, {value:'五',type:''}, {value:'六',type:''}
                ];
                let monthDay = this.time.getMonthDay();
                let upMonthDay = new Date(getPreMonth(this.time.Format2String('yyyy-MM-dd'))).getMonthDay();
                let week = new Date(this.time.Format2String('yyyy-MM')+'-01').getDay();
                let monthCount = 1;
                let upMonthCount = 1;
                for(let i=1;i<=35;i++){
                    let day = {};
                    if(week!=6&&(week - i)>=0){ /* 上个月时间 */
                        day = {
                            type:'diabled',
                            value: (upMonthDay - (week - i))
                        };
                    }else if(monthCount<=monthDay){
                        let time = monthCount<10?('0'+monthCount):(''+monthCount);
                        day = {
                            type:'',
                            time:this.time.Format2String('yyyy-MM-')+time,
                            value: monthCount++
                        };
                    }else{
                        day = {
                            type:'diabled',
                            value: upMonthCount++
                        };
                    }
                    this.dateList.push(day)
                }
            },
            setDateSelect(date,type){
                if(type=='active'){
                    for(let i=8;i<this.dateList.length;i++){
                       if(this.dateList[i].type=='active'){
                         this.dateList[i].type = '';
                       }
                    }
                }
                let idx = this.getDateIdx(date);
                if(idx<0) return;
                this.dateList[idx].type = type;
            },
            getDateIdx(date){
                for(let i=8;i<this.dateList.length;i++){
                   if(this.dateList[i].time == date){
                       return i;
                   }
                }
                return -1;
            }
        }
    }
</script>
<style lang="css" scoped>
    .calendar{
       background-color: #fff;
    }
   .calendar li{
       width: 14.28%;
       float: left;
       text-align: center;
       line-height: 0.9rem;
       font-size: 0.24rem;
   }
    .calendar li:nth-child(1),
    .calendar li:nth-child(2),
    .calendar li:nth-child(3),
    .calendar li:nth-child(4),
    .calendar li:nth-child(5),
    .calendar li:nth-child(6),
    .calendar li:nth-child(7)
    {
        font-weight: bold;
    }
    .diabled,
    .calendar li:nth-child(1),
    .calendar li:nth-child(7),
    .calendar li:nth-child(8),
    .calendar li:nth-child(14),
    .calendar li:nth-child(15),
    .calendar li:nth-child(21),
    .calendar li:nth-child(22),
    .calendar li:nth-child(28),
    .calendar li:nth-child(29),
    .calendar li:nth-child(35),
    .calendar li:nth-child(36),
    .calendar li:nth-child(42)
    {
        color: #999999;
    }
    .calendar li span{
      transition: background-color .3s,color .3s;
    }
    .active span{
        display: inline-block;
        margin: 0 auto;
        width: 0.88rem;
        height: 0.88rem;
        border-radius: 50%;
        background-color: #ff6054;
        color: #fff;
    }
    .calendar .diabled{
        opacity: 0.6;
    }
    .calendar li.warn{
        color: #ff6054;
    }
    .calendar li.normal{
        color: #3497f5;
    }
</style>
