<template lang="html">
    <div class="body-box">
       <div class="carousel-box">
          <mt-swipe :show-indicators="false">
             <mt-swipe-item v-for="simg in urls">
             <div class="img-item" :style="{backgroundImage: 'url('+simg.imgUrl+')'}"></div>
             </mt-swipe-item>
          </mt-swipe>
          <div class="welcome">江楠，欢迎您！</div>
       </div>
       <div class="menu-nav">
          <div class="title"><i></i>人事统计</div>
          <div class="menu-list clearfix">
             <div class="item">
                <router-link to="/kq/approval">
                  <mt-badge size="small">3</mt-badge>
                  <img src="../../assets/img/11_icon.png"><span>审批</span>
                </router-link>
             </div>
             <div class="item">
                <router-link to="/kq/exception">
                  <img src="../../assets/img/5_icon.png"><span>异常处理</span>
                </router-link>
             </div>
          </div>
       </div>
       <div class="menu-nav">
          <div class="title"><i></i>发起申请</div>
          <div class="menu-list clearfix">
             <div class="item">
                <router-link to="/kq/leave">
                <mt-badge size="small">3</mt-badge>
                  <img src="../../assets/img/3_icon.png"><span>请假</span>
                </router-link>
             </div>
             <div class="item">
                <router-link to="/kq/yearLeave">
                  <img src="../../assets/img/4_icon.png"><span>年休假</span>
                </router-link>
             </div>
             <div class="item">
                <router-link to="/kq/leaveQuery">
                  <img src="../../assets/img/12_icon.png"><span>申请记录</span>
                </router-link>
             </div>
          </div>
       </div>
       <div class="menu-nav">
          <div class="title"><i></i>相关查询</div>
          <div class="menu-list clearfix">
             <div class="item">
                <router-link to="/kq/cardRecord">
                  <img src="../../assets/img/13_icon.png"><span>原始刷卡记录</span>
                </router-link>
             </div>
             <div class="item">
                <router-link to="/kq/calendar">
                  <img src="../../assets/img/6_icon.png"><span>考勤日历</span>
                </router-link>
             </div>
          </div>
       </div>
    </div>
</template>
<script>
import { Swipe, SwipeItem } from 'mint-ui';
import { Badge } from 'mint-ui';
export default {
    name:'kq',
    components:{Badge,Swipe,SwipeItem},
    data(){
        return {
            urls:[
                {title:'1',imgUrl:'http://www.jq22.com/demo/jQuerySlider201712071158/img/a5.png'},
                {title:'2',imgUrl:'http://www.jq22.com/demo/jQuerySlider201712071158/img/a4.png'},
                {title:'3',imgUrl:'http://www.jq22.com/demo/jQuerySlider201712071158/img/a2.png'}
            ]
        }
    },
    methods:{}
}
</script>
<style lang="css" scoped>
    .img-item{
        display: block;
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center center;
    }
</style>
