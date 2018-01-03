<template lang="html">
    <div class="body-box">
       <mt-button type="primary" icon="back" @click="goBack()">返回</mt-button>
       <div class="welcome">欢迎您：江楠</div>
       <div class="menu-nav">
          <div class="title">人事统计</div>
          <div class="menu-list clearfix">
             <div class="item">
                <router-link to="/kq/approval">
                  <mt-badge size="small">3</mt-badge>
                  <img src="../../assets/img/3.png"><span>审批</span>
                </router-link>
             </div>
             <div class="item">
                <router-link to="/kq/exception">
                  <img src="../../assets/img/3.png"><span>异常处理</span>
                </router-link>
             </div>
          </div>
       </div>
       <div class="menu-nav">
          <div class="title">发起申请</div>
          <div class="menu-list clearfix">
             <div class="item">
                <router-link to="/kq/leave">
                  <img src="../../assets/img/3.png"><span>请假</span>
                </router-link>
             </div>
             <div class="item">
                <router-link to="/kq/yearLeave">
                  <img src="../../assets/img/3.png"><span>年休假</span>
                </router-link>
             </div>
             <div class="item">
                <router-link to="/kq/leaveQuery">
                  <img src="../../assets/img/3.png"><span>申请记录</span>
                </router-link>
             </div>
          </div>
       </div>
       <div class="menu-nav">
          <div class="title">相关查询</div>
          <div class="menu-list clearfix">
             <div class="item">
                <router-link to="/kq/cardRecord">
                  <img src="../../assets/img/3.png"><span>原始刷卡记录</span>
                </router-link>
             </div>
             <div class="item">
                <router-link to="/kq/calendar">
                  <img src="../../assets/img/3.png"><span>考勤日历</span>
                </router-link>
             </div>
             <div class="item">
                <router-link to="/kq/bill">
                  <img src="../../assets/img/3.png"><span>考勤单据</span>
                </router-link>
             </div>
          </div>
       </div>
    </div>
</template>
<script>
import { Badge } from 'mint-ui';
export default {
    name:'kq',
    components:{Badge},
    data(){
        return {}
    },
    methods:{}
}
</script>

<style lang="css" scoped>
   .welcome{
       text-align: right;
       border-right: solid 0.2rem transparent;
       padding: 0.15rem 0;
       background-color: #F0F0F0;
   }
</style>
