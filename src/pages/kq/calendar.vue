<template>
    <!--<div>考勤日历</div>-->
    <div class="body-box">
        <TimetoolComps @selectTime="selectTime"></TimetoolComps>
        <div class="calendar-box">
            <CalendarComps :curTime="curTime" @clickDate="clickDate"></CalendarComps>
        </div>
        <div class="day-box">
            <div class="title">2017-10-19具体事宜</div>
            <div class="days">
                <div class="day-item"><span class="bd-bottom-1">正常（09:04）</span></div>
                <div class="day-item"><span class="bd-bottom-1">正常（12:34）</span></div>
                <div class="day-item warn"><span class="bd-bottom-1">未刷卡（13:00）</span></div>
                <div class="day-item"><span>正常（18:04）</span></div>
            </div>
        </div>
    </div>
</template>
<script>
    import TimetoolComps from "@/components/calendar/timetool";
    import CalendarComps from "@/components/calendar/calendarComps";
    export default {
        name: 'calendar',
        components:{ CalendarComps,TimetoolComps },
        data(){
            return {
                curTime: new Date().Format2String('yyyy-MM-dd'),
            }
        },
        activated(){
            setTitle('考勤日历');
        },
        methods:{
            clickDate(selectTime){
                console.log('点击了时间：'+selectTime)
            },
            selectTime(startTime,endTime){
                this.sdate = startTime.Format2String('yyyyMMdd');
                this.edate = endTime.Format2String('yyyyMMdd');
                console.log('sdate:'+startTime);
                console.log('edate:'+endTime);
            }
        }
    }
</script>
<style lang="css" scoped>
    .calendar-box{
        /*height: 43vh;*/
        background-color: #fff;
    }
    .day-box{
        background-color: #fff;
        width: calc(100% - 0.5rem);
        margin: .25rem auto 0 auto;
        overflow: hidden;
        border-radius: 5px;
        box-shadow: 0 0 2px #ddd;
    }
    .day-box .title{
        line-height: .9rem;
        text-align: center;
        color: #fff;
        font-size: 16px;
        background:-webkit-gradient(linear, 0% 0%, 0% 100%,from(#ff8922), to(#ffc695));
    }
    .days{
        /*border: solid 1px #ddd;*/
        border-top: none;
        box-sizing: border-box;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
    }
    .days .day-item{
        line-height: .9rem;
    }
    .days .day-item:before{
        content: "";
        display: inline-block;
        width: .1rem;
        height: .1rem;
        border-radius: 50%;
        background-color: #ddd;
        margin-right: 0.2rem;
        margin-left: 0.2rem;
    }
    .days .day-item span{
        display: inline-block;
        width: calc(100% - 0.1rem - 2*0.2rem);
        float: right;
    }
    .days .day-item.warn{
        color: #ff6054;
    }
    .days .day-item.warn:before{
        background-color: #ff6054;
    }
    .tool{
        background-color: #fff;
        margin-bottom: 0.25rem;
        padding: 0.15rem 0;
    }
    .tool .time-box{
        width: 86%;
        margin: 0 auto;
        font-size: 0;
        height: 0.8rem;
        overflow: hidden;
    }
    .time-box span{
        display: inline-block;
        font-size: 16px;
    }
    .time-box span:nth-child(1),.time-box span:nth-child(3){
        width: 24%;
    }
    .time-box span:nth-child(1){
        color: #999999;
    }
    .time-box span:nth-child(2){
        width: 52%;
    }
    .time-box span:nth-child(3){
        text-align: right;
        color: #3497f5;
    }
    .rect-icon{
        position: relative;
        top: 0.16rem;
        display: inline-block;
        border: solid 1px #3497f5;
        height: 0.4rem;
        width: 0.2rem;
        padding: 2px 4px;
        border-radius: 3px;
    }
    .rect-icon .iconfont{
        position: absolute;
        top: 0.118rem;
        left: 0.05rem;
        font-size: 0.8em;
    }
    .time-box .iconfont{
        display: inline-block;
        color: #3497f5;
        font-weight: 800;
    }
    .right-arrow{
        position: relative;
        transform:rotate(180deg);
        z-index: 11;
    }
    .time-box .time-text{
        position: relative;
        top: 0.24rem;
        display: inline-block;
        width: calc(100% - 0.4rem - 20px);
        text-align: center;
        color: #333;
    }
    .time-box .time-text input{
        position: absolute;
        left: 0;top: -2px;
        width: 60%;
        opacity: 0;
        z-index: 10;
    }
    .time-box .time-text span{
        display: block;
    }
    @media screen and (max-width: 320px) {
        .time-box span{
            font-size: 14px;
        }
        .time-box .time-text{
            top: 0.26rem;
        }
    }
</style>