<template lang="html">
    <div class="body-box">
       <div class="carousel-box">
          <mt-swipe :show-indicators="false">
              <mt-swipe-item>
                 <img class="img-item" src="../../assets/img/carousel-1.png">
              </mt-swipe-item>
              <mt-swipe-item>
                 <img class="img-item" src="../../assets/img/carousel-1.png">
              </mt-swipe-item>
          </mt-swipe>
          <div class="welcome">江楠，欢迎您！</div>
       </div>
       <div class="menu-box menu-tree">
           <div class="menu-nav">
              <div class="title bd-bottom-1"><i class="person-icon"></i>人事统计</div>
              <div class="menu-list clearfix">
                 <mt-cell title="审批" @click.native="goRouter('/kq/approval')" is-link>
                    <img slot="icon" src="../../assets/img/11_icon.png" width="24" height="24">
                 </mt-cell>
                 <mt-cell title="异常处理" @click.native="goRouter('/kq/exception')" is-link>
                    <img slot="icon" src="../../assets/img/5_icon.png" width="24" height="24">
                 </mt-cell>
              </div>
           </div>
           <div class="menu-nav">
              <div class="title"><i class="leave-icon"></i>发起申请</div>
              <div class="menu-list clearfix">
                 <mt-cell title="请假" @click.native="goRouter('/kq/leave')" is-link>
                    <img slot="icon" src="../../assets/img/3_icon.png" width="24" height="24">
                 </mt-cell>
                 <mt-cell title="年休假" @click.native="goRouter('/kq/yearLeave')" is-link>
                    <img slot="icon" src="../../assets/img/4_icon.png" width="24" height="24">
                 </mt-cell>
                 <mt-cell title="申请记录" @click.native="goRouter('/kq/leaveQuery')" is-link>
                    <img slot="icon" src="../../assets/img/12_icon.png" width="24" height="24">
                 </mt-cell>
              </div>
           </div>
           <div class="menu-nav">
              <div class="title"><i class="query-icon"></i>相关查询</div>
              <div class="menu-list clearfix">
                 <mt-cell title="原始刷卡记录" @click.native="goRouter('/kq/cardRecord')" is-link>
                    <img slot="icon" src="../../assets/img/13_icon.png" width="24" height="24">
                 </mt-cell>
                 <mt-cell title="考勤日历" @click.native="goRouter('/kq/calendar')" is-link>
                    <img slot="icon" src="../../assets/img/6_icon.png" width="24" height="24">
                 </mt-cell>
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
    methods:{
        goRouter(url){
            this.$router.push(url);
        }
    }
}
</script>
<style lang="css" scoped>
    .person-icon{
        background-image: url("../../assets/img/person-icon.png");
    }
    .leave-icon{
        background-image: url("../../assets/img/leave-icon.png");
    }
    .query-icon{
        background-image: url("../../assets/img/query-icon.png");
    }
    .menu-tree .menu-nav .title {
        line-height: 0.7rem;
        color: #999999;
    }
    .menu-list {
        padding: 0 0 0 0.4rem;
        overflow: hidden;
    }
    .mint-cell:last-child {
        background-image: none;
    }
</style>
