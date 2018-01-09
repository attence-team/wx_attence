<template>
    <!--异常处理-->
    <div class="body-box">
        <TimeTool @selectTime="selectTime"></TimeTool>
        <div class="application-list-box">
            <div class="application-type-box bd-bottom-1">
                <div class="application-type nnsubmitted">未提交</div>
                <div class="application-type submitted">已提交</div>
                <div class="application-type approved">已审批</div>
                <div class="application-type confirmed">已确认</div>
                <div class="application-type retreated">已退回</div>
            </div>
            <ul class="application-list">
                <li class="application-list-cell">

                    <div class="icon"></div>
                    <div class="application-list-info bd-bottom-1">
                        <p class="application-title-date">
                            <span class="application-title">张三的工作餐申请<span class="submitted">（已提交）</span></span>
                            <span class="application-date">2017-08-08</span>
                        </p>
                        <p class="eat-type">就餐类别：自助餐</p>
                    </div>
                </li>
                <li class="application-list-cell">
                    <div class="icon"></div>
                    <div class="application-list-info bd-bottom-1">
                        <p class="application-title-date">
                            <span class="application-title">张三的工作餐申请<span class="approved">（已审批）</span></span>
                            <span class="application-date">2017-08-08</span>
                        </p>
                        <p class="eat-type">就餐类别：自助餐</p>
                    </div>
                </li>
                <li class="application-list-cell">
                    <div class="icon"></div>
                    <div class="application-list-info bd-bottom-1">
                        <p class="application-title-date">
                            <span class="application-title">张三的工作餐申请<span class="retreated">（已退回）</span></span>
                            <span class="application-date">2017-08-08</span>
                        </p>
                        <p class="eat-type">就餐类别：自助餐</p>
                    </div>
                </li>
                <li class="application-list-cell">
                    <div class="icon"></div>
                    <div class="application-list-info bd-bottom-1">
                        <p class="application-title-date">
                            <span class="application-title">张三的工作餐申请<span class="nnsubmitted">（未提交）</span></span>
                            <span class="application-date">2017-08-08</span>
                        </p>
                        <p class="eat-type">就餐类别：自助餐</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import TimeTool from "@/components/query/timetool";
    export default {
        name: 'workLunchApply',
        components:{TimeTool},
        data(){
            return {
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
    .mint-cell-wrapper {
        padding: 0;
    }
    .application-list-box{
        padding: 0 0.3rem;
        background-color: #fff;
    }
    .application-type-box {
        display: flex;
        padding: 0.4rem 0;
    }
    .application-type-box .application-type {
        flex:1;
        color: #fff;
        font-size: 14px;
        padding: 0.2rem 0;
        border-radius: 5px;
        text-align: center;
        margin-left: 0.3rem;
        background-color: #aaa;
    }
    .application-type-box .nnsubmitted {
        background-color: #ff8922;
    }
    .application-type-box .approved {
        background-color: #11bf84;
    }
    .application-type-box .retreated {
        background-color: #f3725f;
    }
    .application-type-box .application-type:first-child {
        margin-left: 0;
    }

    .application-list-box .application-list{
    }
    .application-list .application-list-cell {
        display: flex;
        align-items: center;
    }
    .application-list .icon {
        width: 0.7rem;
        height: 0.7rem;
        border-radius: 5px;
        background-color: #bbb;
        background-image: url('../../assets/img/workLunch-icon.png');
        background-repeat: no-repeat;
        background-size: 65%;
        background-position: center;
    }
    .application-list .application-list-info {
        flex: 1;
        font-size: 14px;
        padding: 0.35rem 0;
        margin-left: 0.3rem;
    }
    .application-list .application-title-date {
        margin-bottom: 0.3rem;
    }
    .application-list .application-title {
        color: #000;
        font-size: 16px;
    }
    .application-list .application-date {
        color: #666;
        float: right;
        line-height: 21px;
    }
    .application-list .eat-type {
        color: #999;
    }
    .application-list .application-title span {
        color: #aaa;
    }
    .application-list .application-title .nnsubmitted {
        color: #ff8922;
    }
    .application-list .application-title .approved {
        color: #11bf84;
    }
    .application-list .application-title .retreated {
        color: #f3725f;
    }

    .application-list .application-list-cell:last-child .bd-bottom-1:before {
        border-bottom:0;
    }

    @media screen and (max-width: 320px) {
        .application-type-box .application-type {
            font-size: 12px
        }
        .application-list .application-list-info {
            font-size: 12px;
        }
        .application-list .application-title {
            color: #000;
            font-size: 14px;
        }
        .application-list .application-date {
            line-height: 19px;
        }
    }
</style>
