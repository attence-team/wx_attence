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
          <div class="title"><i></i>我的工作</div>
          <div class="menu-list clearfix">
             <div class="item">
                <router-link to="/work/pending">
                  <img src="../../assets/img/1_icon.png"><span>待办工作</span>
                </router-link>
             </div>
             <div class="item">
                <router-link to="/work/done">
                  <img src="../../assets/img/2_icon.png"><span>已办工作</span>
                </router-link>
             </div>
          </div>
       </div>
       <div class="menu-nav">
          <div class="title"><i></i>考勤管理 <router-link class="more" to="/home/kq">更多</router-link></div>
          <div class="menu-list clearfix">
             <div class="item">
                <router-link to="/kq/leave">
                  <img src="../../assets/img/3_icon.png"><span>请假申请</span>
                </router-link>
             </div>
             <div class="item">
                <router-link to="/kq/yearLeave">
                  <img src="../../assets/img/4_icon.png"><span>年假申请</span>
                </router-link>
             </div>
             <div class="item">
                <router-link to="/kq/exception">
                  <img src="../../assets/img/5_icon.png"><span>异常处理</span>
                </router-link>
             </div>
             <div class="item">
                <router-link to="/kq/calendar">
                  <img src="../../assets/img/6_icon.png"><span>考勤日历</span>
                </router-link>
             </div>
          </div>
       </div>
       <div class="menu-nav">
          <div class="title"><i></i>办公管理</div>
          <div class="menu-list clearfix">
             <div class="item">
                <router-link to="/officework/sendCarApply">
                  <img src="../../assets/img/7_icon.png"><span>派车申请</span>
                </router-link>
             </div>
             <div class="item">
                <router-link to="/officework/workLunchApply">
                  <img src="../../assets/img/8_icon.png"><span>工作餐申请</span>
                </router-link>
             </div>
             <div class="item">
                <router-link to="/officework/sendCarQuery">
                  <img src="../../assets/img/9_icon.png"><span>派车单据查询</span>
                </router-link>
             </div>
              <div class="item">
                <router-link to="/officework/workLunchQuery">
                  <img src="../../assets/img/10_icon.png"><span>工作餐单据查询</span>
                </router-link>
             </div>
          </div>
       </div>
       <!--<div class="scroll-box page1">-->
          <!--<div class="box">-->
              <!--{{msg}},这是page1页面-->
              <!--<br/><br/><br/>-->
              <!--<mt-button @click="change">点击切换</mt-button>-->
               <!--&nbsp;&nbsp;-->
              <!--<mt-button @click="changeTwo">点击切换2</mt-button>-->
          <!--</div>-->
          <!--<div>-->
             <!--<mt-cell v-for="item in list" :title="item.title" :label="item.subTitle" is-link>-->
                <!--<span style="color: green">{{item.content}}</span>-->
             <!--</mt-cell>-->
          <!--</div>-->
       <!--</div>-->
    </div>
</template>
<script>
import { Swipe, SwipeItem } from 'mint-ui';
import {hello} from '@/assets/js/hello';
export default {
    name:'homeInfo',
    components: {Swipe, SwipeItem},
    data(){
        return {
           msg:'',
           urls:[
               {title:'1',imgUrl:'http://www.jq22.com/demo/jquerylbthk201712272345/img/3.jpg'},
               {title:'2',imgUrl:'http://www.jq22.com/demo/jquerylbthk201712272345/img/5.jpg'},
               {title:'3',imgUrl:'http://www.jq22.com/demo/jquerylbthk201712272345/img/3.jpg'}
           ],
           menuList:[],
           list:[]
        }
    },
    created(){
        this.msg = hello('九次方');
        this.queryList();
    },
    methods:{
        changeTwo(){
           this.$router.push({
               path:'/home/anotherPage2'
           });
        },
        queryList(){
            this.$http.Get('ZXF1aEK62a6c81919359967c3fba0fe8cbb83c9e9046f38?uri=mob/query/list',(res)=>{
                this.list = res.data.list;
            });
        }
    }
}
</script>

<style lang="css" scoped>

</style>
