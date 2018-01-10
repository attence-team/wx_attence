<template>
    <div class="leave">
        <div class="pert1 pert">
            <div class="table-info">
                <div class="group">
                    <div class="hf-l hf">
                        <label class="th">申请部门：</label>
                        <span class="td">{{info.dept_name}}</span>
                    </div>
                    <div class="hf-r hf">
                        <label class="th">请假人姓名：</label>
                        <span class="td">{{info.name}}</span>
                    </div>
                </div>
                <div class="group">
                    <div class="hf-l hf">
                        <label class="th">申请时间：</label>
                        <span class="td">{{info.sqdate}}</span>
                    </div>
                    <div class="hf-r hf">
                        <label class="th">单据状态：</label>
                        <span class="td">{{info.status}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="pert2 pert">
            <div class="table-info">
                <div class="group bd-bottom-1">
                    <label class="th">请假类型</label>
                    <span class="td td1">
                        <select class="select" v-model="selected" v-on:click="change" dir="rtl">
                            <option v-for="item in typeList" v-bind:value="item.num">{{item.name}}</option>
                        </select>
                    </span>
                </div>
                <div class="group bd-bottom-1">
                    <label class="th">请假起日期</label>
                    <span class="td">
                        <DateComps @setDate="setStartDate"></DateComps>
                        <!--<AmPm></AmPm>-->
                    </span>
                </div>
                <div class="group bd-bottom-1">
                    <label class="th">请假预计止日期</label>
                    <span class="td">
                        <DateComps @setDate="setEndDate"></DateComps>
                        <!--<AmPm></AmPm>-->
                    </span>
                </div>
                <div class="group bd-bottom-1">
                    <label class="th">免打卡次数</label>
                    <span class="td">
                        <input type="number" class="width-min"  placeholder="请输入" v-model="times">
                        <span style="padding-right: .1rem;">次</span>
                    </span>
                </div>
                <!--<div class="group bd-bottom-1">
                    <label class="th">请假天数</label>
                    <span class="td">
                        <input disabled type="number" class="width-min" v-bind:value="leaveDays">
                        <span>天</span>
                    </span>
                </div>-->
                <div class="group bd-bottom-1">
                    <label class="th">事由、备注</label>
                    <span class="td" v-on:click="setDisplay($event)">
                        <input id="resuly" v-model="text" class="text-resuly" :class="resuly" v-on:focus="setValue($event)" v-on:blur="clearValue($event)">
                        <span :class="show">请输入请假事由（必填）</span>
                    </span>
                </div>
            </div>
        </div>
        <div class="pert3 pert group">
            <label class="group-th">审批流程</label>
            <span class="group-td"><span class="circle">雄辉</span></span>
        </div>
        <div class="pert4 pert">
            <button v-on:click="saveLeave">提交</button>
        </div>
    </div>
</template>
<script>
    import {KqHttp} from '@/api/kqHttp';
    import DateComps from "@/components/query/date";
    import { Toast, Indicator } from 'mint-ui';
    /*import AmPm from "@/components/query/AmPm";*/
    export default {
        name: 'leave',
        data(){
            return {
                typeList:[],
                /*ampm:{
                    value: 'am',
                    text: '上午'
                },*/
                //头部信息
                info:{
                    dept_name: getUserInfo().dept_name,
                    name: getUserInfo().name,
                    sqdate: new Date().Format2String('yyyy-MM-dd'),
                    status: '未提交'
                },

                show: 'placeholder',
                resuly: 'resuly-unshow',
                //保存参数

                text: '',//原因、理由
                selected:'',//请假类型
                startDate: new Date().Format2String('yyyyMMdd'),//请假开始时间
                endDate: new Date().Format2String('yyyyMMdd'),//请假预计结束时间
                leaveDays:'',//请假天数
                times: 2//免打卡次数
            }
        },
        created(){
            setTitle('请假');
        },
        methods:{
            setDisplay(event){
                this.show = 'unplaceholder';
                this.resuly = 'resuly-show';
                //console.log(111)
                document.getElementById("resuly").focus();
            },
            setValue(event){
                this.show = 'unplaceholder';
                this.resuly = 'text-resuly1';
            },
            clearValue(event){
                if(this.text == ''){
                    this.show = 'placeholder';
                    this.resuly = 'resuly-unshow';
                }else{
                    this.show = 'unplaceholder';
                    this.resuly = 'resuly-show';
                }
            },
            change(){
                console.log(this.selected)
            },
            setStartDate(date){
                //console.log(date);
                this.startDate = date;
            },
            setEndDate(date){
                //console.log(date);
                this.endDate = date;
            },
            getLeaveType(){
                let _this = this;
                let params = {staff_num: getUserInfo().staff_num};
                KqHttp.queryLeaveType(params).then((res)=>{
                    if(res.code == '1'){
                        _this.typeList = [];
                        let data = res.data;
                        data.forEach(function (value, index) {
                            _this.typeList.push({
                                num: value.leave_num,
                                name: value.leave_cause
                            })
                        });
                        _this.selected = data[0].leave_num;
                    }
                });
            },
            saveLeave(){
                let _this = this;
                let params = {
                    leave_num: _this.selected,
                    staff_num: getUserInfo().staff_num,
                    start_date: _this.startDate,
                    intending_date: _this.endDate,
                    times: _this.times,
                    reason: _this.text
                    //sys_idkey:''
                };
                if(!params.leave_num){
                    Toast({
                        message: '请选择请假类型',
                        duration: 1500
                    });
                    return
                }
                if(!params.times){
                    Toast({
                        message: '请输入免打卡次数',
                        duration: 1500
                    });
                    return
                }
                if(!params.reason){
                    Toast({
                        message: '请输入请假事由',
                        duration: 1500
                    });
                    return
                }
                Indicator.open({
                    text: '提交中...',
                    spinnerType: 'fading-circle'
                });
                KqHttp.saveLeave(params).then((res)=>{
                    if(res.code == '1'){
                        Indicator.close();
                        Toast({
                            message: '提交成功',
                            duration: 1500,
                            iconClass: 'icon icon-success'
                        });
                    }
                }).catch(res => {
                    console.log(res);
                })
            }
        },
        mounted(){
            this.getLeaveType();
        },
        components:{DateComps/*,AmPm*/}
    }
</script>

<style lang="css" scoped>
    .leave{

    }
    .pert{
        padding: .3rem .32rem;
    }
    .pert2{
        padding: .3rem 0 .3rem .32rem;
    }
    .pert1, .pert2, .pert3 {
        border-bottom: .25rem solid #F2F2F2;
    }
    .table-info{
        width: 100%;
    }
    .table-info .th,
    .table-info .td{
        font-size: .30rem;
        line-height: 30px;
        text-align: left;
    }
    .table-info .th{
        color: #333;
        /*font-weight: 600;*/
    }
    .table-info .td{
        color: #999;
    }
    .table-info .group{
        position: relative;
        text-align: left;
        overflow: hidden;
    }
    .table-info .hf{
        width: 50%;
        float: left;
    }
    .table-info .hf-l{
    }
    .table-info .hf-r{
    }
    .pert2 .table-info .group{
        overflow: hidden;
        padding-right:.32rem;
    }
    .pert2 .table-info .th{
        font-size: .31rem;
        line-height: 1rem;
        text-align: left;
        float: left;
    }
    .pert2 .table-info .td{
        font-size: .30rem;
        line-height: 1rem;
        height: 1rem;
        text-align: right;
        float: right;
    }
    .pert2 .table-info .group:nth-child(1) .th{
        width: 1.5rem;
    }
    .pert2 .table-info .group:nth-child(1) .td{
        width: calc(100% - 1.5rem)
    }
    .pert2 .table-info .group:nth-child(4) .th{
        width: 1.7rem;
    }
    .pert2 .table-info .group:nth-child(4) .td{
        width: calc(100% - 1.7rem)
    }
    .pert2 .table-info .group:nth-child(5) .th{
        width: 1.7rem;
    }
    .pert2 .table-info .group:nth-child(5) .td{
        width: calc(100% - 1.7rem)
    }
    .pert2 .table-info .group:last-child .th{
        width: 1.7rem;
    }
    .pert2 .table-info .group:last-child .td{
        width: calc(100% - 1.7rem);
        text-align: right;
    }
    .pert2 .table-info .td select{
        width: 100%;
        border: solid 1px #3497F5;
        border-radius: 4px;
        height: .6rem;
        line-height: .6rem;
        text-align: right;
    }
    .pert2 .table-info .td select:focus {
        border: solid 1px #3497F5;
        border-radius: 4px;
    }
    .pert2 .table-info .td input.text-resuly{
        padding: 0 .15rem;
        width: 100%;
        border: none;
        color: #999;
        text-align: right;
        height: 1rem;
        line-height: 1rem;
    }
    .pert2 .table-info .td input.resuly-unshow{
        z-index: 9;
        opacity: 0;
    }
    .pert2 .table-info .td input.resuly-show{
        opacity: 1;
    }
    .unplaceholder{
        display: none;
    }
    .placeholder{
        color: #ff6054;
        /*padding: 0 .15rem;*/
        width: 100%;
        border: none;
        text-align: right;
        height: .9rem;
        line-height: .9rem;
        position: absolute;
        top:0;
        right: .25rem;

    }
    .pert2 .table-info .td input.text-resuly:focus{
        border: none;
        border-radius: 10px;
        height: 4.5vh;
        line-height: 4.5vh;
        color: #999;;
    }
    .pert2 .table-info .td input.width-min{
        text-align: right;
        padding:0 0 0 .1rem;
        border:none;
        height: 1rem;
        line-height: 1rem;
        color: #999;
    }
    .group .group-th{
        font-size: .31rem;
        line-height: .8rem;
        text-align: left;
        width:2.33rem;
        color: #333;
        /*font-weight: 700;*/
    }
    .group .group-td{
        font-size: 14px;
        line-height: .8rem;
        text-align: right;
        color: #999;
    }
    .group .group-td .circle{
        font-size: 0.25rem;
        width: .8rem;
        height: .8rem;
        line-height: .8rem;
        text-align: center;
        background-color: #FEA558;
        color: #fff;
        border-radius: 50%;
        display: inline-block;
        margin-left: .15rem;
    }
    .pert4 button{
        width: 100%;
        height: .8rem;
        background-color: #3497F5;
        border-radius: 4px;
        border: 1px solid #3497F5;
        cursor: pointer;
        color: #fff;
        font-size:18px;
    }
    .ampm{
        display: inline-block;
    }
    select{
        padding: 0 2%;
        text-align:right;
    }

    option{
        text-align:right;
    }

    @media screen and (max-width: 320px) {
        .table-info .th,
        .table-info .td{
            font-size: .29rem;
        }
        .pert2 .table-info .th{
            font-size: .30rem;
        }
        .pert2 .table-info .td{
            font-size: .29rem;
        }
        .group .group-th {
            font-size: .30rem;
        }
    }
</style>