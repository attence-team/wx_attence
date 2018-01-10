<template>
    <div class="tool">
        <div class="time-box">
            <span>{{startTime.substring(0,4)}}年</span>
            <span>
                    <div class="rect-icon fl" @click="minuMonth"><i class="iconfont icon-fanhui"></i></div>
                    <div class="time-text fl" @click="selectTime">
                        <input class="fl" type="date" v-model="startTime">
                        {{startTime|filterMonth}} - {{endTime|filterMonth}}
                        <input class="fr" type="date" v-model="endTime">
                    </div>
                    <div class="rect-icon fr" @click="plusMonth"><i class="iconfont icon-fanhui right-arrow"></i></div>
                </span>
            <span @click="curMonth">返回当月</span>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'timetool',
        data(){
            return {
                startTime: new Date().Format2String('yyyy-MM-dd'),
                time: new Date().Format2String('yyyy-MM-dd'),
                endTime: new Date().Format2String('yyyy-MM-dd')
            }
        },
        filters: {
            filterMonth: function (value) {
                let month = value.Format2String('MM-dd');
                return month;
            }
        },
        watch:{
            startTime(curVal,oldVal){
                this.time = curVal;
                this.selectTime();
            },
            endTime(curVal,oldVal){
                this.selectTime();
            }
        },
        mounted(){
            this.curMonth();
        },
        methods:{
            curMonth(){
                this.startTime = new Date().Format2String('yyyy-MM-dd').substring(0,7)+'-01';
                this.endTime = new Date().Format2String('yyyy-MM-dd').substring(0,7)+'-'+new Date().getMonthDay();
                //this.selectTime();
            },
            minuMonth(){ /* 减1月 */
                this.startTime = getPreMonth(this.startTime).Format2String('yyyy-MM-dd');
                this.endTime = getPreMonth(this.endTime).Format2String('yyyy-MM-dd');
                //this.selectTime();
            },
            plusMonth(){/* 加1月 */
                this.startTime = getNextMonth(this.startTime).Format2String('yyyy-MM-dd');
                this.endTime = getNextMonth(this.endTime).Format2String('yyyy-MM-dd');
                //this.selectTime();
            },
            selectTime(){
                let stime = this.startTime.Format2String('yyyy-MM-dd');
                let etime = this.endTime.Format2String('yyyy-MM-dd');
                this.$emit('selectTime',stime,etime);
            }
        }
    }
</script>
<style lang="css" scoped>
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
        left: 0;top: -0.12rem;
        width: 48%;
        opacity: 0;
        z-index: 10;
        /*background-color: rgba(200,0,0,0.2);*/
    }
    .time-box .time-text input:nth-child(2){
        right: 0 !important;
        left: auto;
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
