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
                    就餐类别
                    <div class="selectWrap">
                        <select id="sendCarType" class="" name="">
                            <option value="">自助餐</option>
                        </select>
                        <div class="selectBtn"></div>
                    </div>
                </div>
            </div>
            <div class="approved-body-row bd-bottom-1 sendCarType">
                <div class="approved-body-warp">
                    临时卡号
                    <div class="selectWrap">
                        <select id="sendCarType" class="" name="">
                            <option value="">LS001</option>
                        </select>
                        <div class="selectBtn"></div>
                    </div>
                </div>
            </div>
            <div class="approved-body-row bd-bottom-1">
                <div class="approved-body-warp">临时卡名称：
                    <span class="approved-body-info">
                        <input type="text" name="" value="">
                    </span>
                    <span class="cue">*必填</span>
                </div>
            </div>
            <div class="approved-body-row bd-bottom-1">
                <div class="approved-body-warp">来宾单位：
                    <span class="approved-body-info">
                        <input type="text" name="" value="">
                    </span>
                    <span class="cue">请输入来宾单位*必填</span>
                </div>
            </div>
            <div class="approved-body-row bd-bottom-1">
                <div class="approved-body-warp">用餐人数：
                    <span class="approved-body-info">
                        <input type="number" name="" value="">
                    </span>
                    <span class="cue">请输入用餐人数*必填</span>
                </div>
            </div>
            <div class="approved-body-row bd-bottom-1 sendCarDate">
                <div class="approved-body-warp">
                    用餐开始时间：
                    <span class="approved-body-info">
                        <label for="startTime" id="sendCarDateLable">{{startTime}}</label>
                        <input type="date" id="startTime" name="startTime"  v-model="startTime">
                    </span>
                    <span class="cue">*必填</span>
                </div>
            </div>
            <div class="approved-body-row bd-bottom-1 sendCarDate">
                <div class="approved-body-warp">
                    用餐开始时间：
                    <span class="approved-body-info">
                        <label for="endTime" id="sendCarDateLable">{{endTime}}</label>
                        <input type="date" id="endTime" name="endTime"  v-model="endTime">
                    </span>
                    <span class="cue">*必填</span>
                </div>
            </div>
            <div class="approved-body-row bd-bottom-1">
                <div class="approved-body-warp">餐票：
                    <span class="approved-body-info">
                        <input type="number" name="" value="">
                    </span>
                    <span class="cue">*必填</span>
                </div>
            </div>
            <div class="approved-body-row bd-bottom-1">
                <div class="approved-body-warp">餐票明细：
                    <span class="approved-body-info">
                        <input type="text" name="" value="">
                    </span>
                </div>
            </div>
            <div class="approved-body-row bd-bottom-1">
                <div class="approved-body-warp">备注：
                    <span class="approved-body-info">
                        <input type="text" name="" value="">
                    </span>
                </div>
            </div>
            <div class="approved-body-row bd-bottom-1 approvalProcess">
                <div class="approved-body-warp">审批流程：
                    <span class="approved-body-info">
                        <span class="approver">李四</span>
                        <i></i>
                        <span class="approver">雄辉</span>
                    </span>
                </div>
            </div>
            <div class="submit">提交</div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'workLunchApply',
        data(){
            return {
                startTime:"2017-08-09",
                endTime:"2017-08-09",
            }
        },
        mounted(){

        },
        methods:{
        }
    }
</script>
<style lang="css" scoped>
    .approved-body-warp {
        line-height: 30px;
        overflow: hidden;
    }
    .route {
        width: 1.2rem;
        border-radius: 5px;
        padding: 0 0.1rem;
        border: 1px solid #3497f5;
    }
    .approved-body-info input {
        width: 2.5rem;
    }
    .sendCarType .selectWrap {
        float: right;
        margin-right: 0;
        width: 5.2rem;
    }
    .sendCarType #rideNum {
        width: 0.5rem;
    }
    .sendCarDate #sendCarDateLable {
        color: #999;
    }
    .sendCarDate input[type="date"] {
        width: 0;
        height: 0;
    }
    .aboard-place-box {
        display: flex;
    }
    .aboard-place-wrap {
        flex: 1;
    }
    .checkbox-box {
        display: flex;
    }
    .passenger-name .aboard-place-text{
        line-height: 30px;
    }
    .passenger-name input[type="text"] {
        margin-left: 10px;
    }
    .checkbox-box .checkbox-label {
        flex: 1;
    }
    .remarks input[type="text"] {
        width: 80%;
    }
</style>
