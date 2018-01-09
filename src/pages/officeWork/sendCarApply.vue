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
                    派车类型：
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
                        <input type="text" name="" value="接公司领导">
                    </span>
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
        </div>
    </div>
</template>
<script>
    export default {
        name: 'sendCarApply'
    }
</script>
<style lang="css" scoped>
    /* 自定义select,input样式 */
    input,select {
        color: #999;
        border: 0;
        height: 0.6rem;
        line-height: 0.6rem;
        outline:none;
        background-color: #fff;
        box-sizing: border-box;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
    }
    input {
        border:0;
        font-size: 16px;
    }
    .selectWrap {
        position: relative;
        line-height: normal;
        display: inline-block;
        border-radius: 5px;
        border: 1px solid #3497f5;
    }
    .selectWrap select {
        width: 100%;
        padding: 0 0.6rem 0 0.2rem;
        border-radius: 5px;
    }
    .selectBtn {
        width: 0.4rem;
        border-radius: 0 5px 5px 0;
        position: absolute;
        top: -1px;
        bottom: -1px;
        right: -1px;
        overflow: hidden;
        background-color: #3497f5;
    }
    .selectBtn::before,.selectBtn::after {
        content: "";
        width: 100%;
        height: 50%;
        display: inline-block;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 50%;
        background-image: url('../../assets/img/select-icon.png');
        position: absolute;
    }
    .selectBtn::before {
        top: 0;
        right: 0;
        transform: rotate(180deg);
    }
    .selectBtn::after {
        bottom: 0;
        right: 0;
    }
    /* 自定义select样式 end*/
    .sendCarType .selectWrap {
        width: 2.2rem;
    }
    .sendCarType #rideNum {

    }
    .body-box {
        font-size: 14px;
    }
    .approved-head {
        padding: 0.3rem;
        background-color: #fff;
    }
    .approved-head .approved-head-row {
        color: #333;
        width: 100%;
        margin-bottom: 0.25rem;
        overflow: hidden;
    }
    .approved-head .approved-head-row:last-child {
        margin-bottom: 0;
    }
    .approved-head .approved-head-warp {
        width: 50%;
        float: left;
    }
    .approved-head .approved-head-info {
        color: #999;
    }

    .approved-body {
        margin-top: 0.25rem;
        padding: 0 0.3rem;
        background-color: #fff;
    }
    .approved-body .approved-body-row {
        height: 1rem;
        line-height: 1rem;
        overflow: hidden;
    }
    .approved-body .bd-bottom-1:before {
        border-bottom:0;
    }
    .approved-body .cue {
        float: right;
        color: #ff6054;
    }
</style>
