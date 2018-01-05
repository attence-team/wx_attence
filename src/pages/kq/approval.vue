<template>
    <div class="body-box">
        <div class="tab-box">
            <div class="tap-wrap" :class="{selected:tabSelected==0}" @click="tabBtn(0)">
                <div class="tap-btn">待我审批的（{{nnapprovedNum}}）</div>
            </div>
            <i></i>
            <div class="tap-wrap" :class="{selected:tabSelected==1}" @click="tabBtn(1)">
              <div class="tap-btn">我已审批的</div>
            </div>
        </div>
        <div class="approval">
            <div class="batch-approval">
                <span class="batch-approval-text">批量审批</span><mt-switch v-model="batchSwitch"></mt-switch>
            </div>
            <ul class="approval-list">
                <li class="approval-list-cell">
                    <router-link to="approvalDetails">
                    <div class="approval-name">江楠</div>
                    <div class="approval-info">
                        <p class="approval-title-date">
                            <span class="approval-title">江楠的外出</span><span class="approval-date">2017-11-12</span>
                        </p>
                        <p class="approval-start-date">开始时间：2017-11-10 10:00</p>
                        <p class="approval-end-date">结束时间：2017-11-13 17:00</p>
                        <p class="approval-state">待审批</p>
                    </div>
                    </router-link>
                </li>
                <li class="approval-list-cell">
                    <router-link to="approvalDetails">
                    <div class="approval-name">江楠</div>
                    <div class="approval-info">
                        <p class="approval-title-date">
                            <span class="approval-title">江楠的外出</span><span class="approval-date">2017-11-12</span>
                        </p>
                        <p class="approval-start-date">开始时间：2017-11-10 10:00</p>
                        <p class="approval-end-date">结束时间：2017-11-13 17:00</p>
                        <p class="approval-state">待审批</p>
                    </div>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import { Switch } from 'mint-ui';
export default {
    name: 'approval',
    components: { Switch },
    data(){
        return {
            nnapprovedNum:5,
            tabSelected:'',
            batchSwitch:false
        }
    },
    created(){
    },
    methods:{
        tabBtn:function(index) {
            this.tabSelected = index;
        }
    }
}
</script>
