<template>
    <div class="tool">
        <div class="time-box">
            <span>{{input.substring(0,4)}}年</span>
            <span>
                    <div class="rect-icon fl" @click="minuMonth"><i class="iconfont icon-fanhui"></i></div>
                    <div class="time-text fl" @click="selectTime">
                        <input type="date" v-model="input">
                        {{time|filterMonth}}
                    </div>
                    <div class="rect-icon fl" @click="plusMonth"><i class="iconfont icon-fanhui right-arrow"></i></div>
                </span>
            <span @click="curMonth">月出勤</span>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'timetool',
        data(){
            return {
                input: new Date().Format2String('yyyy-MM-dd'),
                time: new Date().Format2String('yyyy-MM-dd')
            }
        },
        filters: {
            filterMonth: function (value) {
                let month = value.Format2String('MM');
                let monthDay = value.getMonthDay();
                return month+'-01 - '+ month + '-'+monthDay;
            }
        },
        watch:{
            input(curVal,oldVal){
                this.time = curVal;
                this.selectTime();
            }
        },
        mounted(){
            this.selectTime();
        },
        methods:{
            curMonth(){
                this.input = new Date().Format2String('yyyy-MM-dd');
            },
            minuMonth(){ /* 减1月 */
                let now = new Date(this.input);
                this.input = new Date(now.getFullYear(), now.getMonth()-1, now.getDate()).Format2String('yyyy-MM-dd');
            },
            plusMonth(){/* 加1月 */
                let now = new Date(this.input);
                this.input = new Date(now.getFullYear(), now.getMonth()+1, now.getDate()).Format2String('yyyy-MM-dd');
                //this.selectTime();
            },
            selectTime(){
                let month = this.input.Format2String('yyyy-MM');
                this.$emit('selectTime',month+'-01',month+'-'+this.input.getMonthDay());
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
