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
                <router-link to="workLunchDetails">
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
                </router-link>
                    <router-link to="workLunchDetails">
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
                </router-link>
                    <router-link to="workLunchDetails">
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
                </router-link>
                    <router-link to="workLunchDetails">
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
                </router-link>
            </ul>
        </div>
    </div>
</template>
<script>
    import TimeTool from "@/components/query/timetool";
    export default {
        name: 'workLunchQuery',
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
</style>
