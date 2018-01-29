<template>
    <!--异常处理-->
    <div class="body-box">
        <TimeTool @selectTime="selectTime"></TimeTool>
        <div class="application-list-box">
            <div class="application-type-box bd-bottom-1">
                <div class="application-type approved">已审批</div>
                <div class="application-type approvaling">审批中</div>
                <div class="application-type retreated">已退回</div>
                <div class="application-type nnsubmitted">未提交</div>
            </div>
            <ul class="application-list">
                <router-link to="sendCarApply">
                <li class="application-list-cell">
                    <div class="icon"></div>
                    <div class="application-list-info bd-bottom-1">
                        <p class="application-title-date">
                            <span class="application-title">张三的派车申请<span class="approved">（已审批）</span></span>
                            <span class="application-date">2017-08-08</span>
                        </p>
                        <p class="eat-type">用车事由：外出办事</p>
                    </div>
                </li>
                </router-link>
                <router-link to="sendCarApply">
                <li class="application-list-cell">
                    <div class="icon"></div>
                    <div class="application-list-info bd-bottom-1">
                        <p class="application-title-date">
                            <span class="application-title">张三的派车申请<span class="approved">（已审批）</span></span>
                            <span class="application-date">2017-08-08</span>
                        </p>
                        <p class="eat-type">用车事由：外出办事</p>
                    </div>
                </li>
                </router-link>
                <router-link to="sendCarApply">
                <li class="application-list-cell">
                    <div class="icon"></div>
                    <div class="application-list-info bd-bottom-1">
                        <p class="application-title-date">
                            <span class="application-title">张三的派车申请<span class="approved">（已审批）</span></span>
                            <span class="application-date">2017-08-08</span>
                        </p>
                        <p class="eat-type">用车事由：外出办事</p>
                    </div>
                </li>
                </router-link>
                <router-link to="sendCarApply">
                <li class="application-list-cell">
                    <div class="icon"></div>
                    <div class="application-list-info bd-bottom-1">
                        <p class="application-title-date">
                            <span class="application-title">张三的派车申请<span class="approved">（已审批）</span></span>
                            <span class="application-date">2017-08-08</span>
                        </p>
                        <p class="eat-type">用车事由：外出办事</p>
                    </div>
                </li>
                </router-link>
                <router-link to="sendCarApply">
                <li class="application-list-cell">
                    <div class="icon"></div>
                    <div class="application-list-info bd-bottom-1">
                        <p class="application-title-date">
                            <span class="application-title">张三的派车申请<span class="approved">（已审批）</span></span>
                            <span class="application-date">2017-08-08</span>
                        </p>
                        <p class="eat-type">用车事由：外出办事</p>
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
        name: 'sendCarQuery',
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
