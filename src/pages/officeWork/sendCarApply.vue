<template>
    <div class="body-box">
        <div class="approved-head">
            <div class="approved-head-row">
                <div class="approved-head-warp">申请部门：<span class="approved-head-info">xxxx部</span></div>
                <div class="approved-head-warp">经办人：<span class="approved-head-info">张三</span></div>
            </div>
            <div class="approved-head-row">
                <div class="approved-head-warp">申请时间：<span class="approved-head-info">2017-08-09</span></div>
                <div class="approved-head-warp">单据状态：<span class="approved-head-info">未提交</span></div>
            </div>
        </div>
        <div class="approved-body">
            <div class="approved-body-row bd-bottom-1 sendCarType">
                <div class="approved-body-warp">
                    派车类型
                    <div class="selectWrap">
                        <select id="sendCarType" class="" name="">
                            <option value="">市区内派车</option>
                            <option value="">正常长途派车</option>
                            <option value="">特殊长途派车</option>
                        </select>
                        <div class="selectBtn"></div>
                    </div>
                    乘车人数：
                    <span class="approved-body-info">
                        <input type="number" id="rideNum" name="" value="3">人
                    </span>
                    <span class="cue">*必填</span>
                </div>
            </div>
            <div class="approved-body-row bd-bottom-1">
                <div class="approved-body-warp">用车事由：
                    <span class="approved-body-info">
                        <input type="text" id="cause" name="cause" value="接公司领导">
                    </span>
                    <span class="cue">请输入用车事由*必填</span>
                </div>
            </div>
            <div class="approved-body-row bd-bottom-1">
                <div class="approved-body-warp">行程路线：
                    <span class="approved-body-info">
                        <input type="text" name="" class="route" value=""> - <input type="text" name="" class="route" value="">
                    </span>
                    <i class="addBtn"></i>
                    <span class="cue">*必填</span>
                </div>
            </div>
            <div class="approved-body-row bd-bottom-1">
                <div class="approved-body-warp">联系人：
                    <span class="approved-body-info">
                        <input type="text" name="" value="张三">
                    </span>
                    <span class="cue">*必填</span>
                </div>
            </div>
            <div class="approved-body-row bd-bottom-1">
                <div class="approved-body-warp">联系电话：
                    <span class="approved-body-info">
                        <input type="tel" name="" value="18888888888">
                    </span>
                    <span class="cue">*必填</span>
                </div>
            </div>
            <div class="approved-body-row bd-bottom-1 sendCarDate">
                <div class="approved-body-warp">
                    用车时段：
                    <span class="approved-body-info">
                        <input type="date" id="sendCarDate" name="sendCarDate" value="">
                    </span>
                    <div class="selectWrap">
                        <select id="sendCarHour" class="" name="">
                            <option v-for="hour in sendCarHour" :value="hour">{{hour}}</option>
                        </select>
                        <div class="selectBtn"></div>
                    </div>
                    时
                    <div class="selectWrap">
                        <select id="sendCarMinute" class="" name="">
                            <option v-for="minute in sendCarMinute" :value="minute">{{minute}}</option>
                        </select>
                        <div class="selectBtn"></div>
                    </div>
                    分
                    <span class="cue">*必填</span>
                </div>
            </div>
            <div class="approved-body-row bd-bottom-1 approvalProcess">
                <div class="approved-body-warp">审批流程：
                    <span class="approved-body-info">
                        <span class="approver">李四</span>
                        <i></i>
                        <span class="approver">雄辉</span>
                    </span>
                    <span class="cue">*必填</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'sendCarApply',
        data(){
            return {
                sendCarHour:['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'],
                sendCarMinute:['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59']
            }
        },
        mounted(){

        },
        methods:{
            selectTime(startTime,endTime){
                console.log(startTime);
                console.log(endTime);
            }
        }
    }
</script>
<style lang="css" scoped>

    .route {
        width: 1.2rem;
        border-radius: 5px;
        padding: 0 0.1rem;
        border: 1px solid #3497f5;
    }
    .sendCarType .selectWrap {
        width: 2.2rem;
    }
    .sendCarDate .selectWrap {
        /* width: 1.1rem; */
    }
    .sendCarType #rideNum {
        width: 0.5rem;
    }
    .sendCarDate #sendCarDate {
        width: 65px;
    }
    #cause {
        width: 2.5rem;
    }
    .sendCarType .selectWrap {
        margin: 0 0.2rem;
    }

    .approved-body {
        margin-top: 0.25rem;
        padding: 0 0.25rem;
        background-color: #fff;
    }
    .approved-body .approved-body-row {
        padding: 10px 0;
        line-height: 30px;
        overflow: hidden;
    }
    .approved-body .bd-bottom-1:last-child:before {
        border-bottom:0;
    }
    .approved-body .cue {
        float: right;
        color: #ff6054;
    }
    .approvalProcess .approver{
        width: 35px;
        height: 35px;
        line-height: 35px;
        color: #fff;
        font-size: 12px;
        text-align: center;
        display: inline-block;
        border-radius: 100%;
        background-color: #fea556;
    }
    .approvalProcess i {
        width: 35px;
        height: 35px;
        line-height: 35px;
        display: inline-block;
        vertical-align: middle;
        background-size: 70%;
        background-position: center;
        background-repeat: no-repeat;
        background-image: url('../../assets/img/icon-arrow.png');
    }
    .body-box {
        font-size: 14px;
    }
    @media screen and (max-width: 320px) {
        .body-box {
            font-size: 12px;
        }
    }
</style>
