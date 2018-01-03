<template lang="html">
    <div class="body-box">
       <div class="carousel-box">
          <mt-swipe :show-indicators="false">
             <mt-swipe-item v-for="simg in urls"><div class="img-item" :style="{backgroundImage: 'url('+simg.imgUrl+')'}" ></div></mt-swipe-item>
          </mt-swipe>
       </div>
       <div class="welcome">江楠，欢迎您！</div>
       <div class="menu-nav">
          <div class="title"><i></i>我的工作</div>
          <div class="menu-list clearfix">
             <div class="item">
                <router-link to="/work/pending">
                  <img src="../../assets/img/3.png"><span>待办工作</span>
                </router-link>
             </div>
             <div class="item">
                <router-link to="/work/done">
                  <img src="../../assets/img/3.png"><span>已办工作</span>
                </router-link>
             </div>
          </div>
       </div>
       <div class="menu-nav">
          <div class="title"><i></i>考勤管理 <router-link class="more" to="/home/kq">更多>></router-link></div>
          <div class="menu-list clearfix">
             <div class="item">
                <router-link to="/kq/leave">
                  <img src="../../assets/img/3.png"><span>请假申请</span>
                </router-link>
             </div>
             <div class="item">
                <router-link to="/kq/yearLeave">
                  <img src="../../assets/img/3.png"><span>年假申请</span>
                </router-link>
             </div>
             <div class="item">
                <router-link to="/kq/exception">
                  <img src="../../assets/img/3.png"><span>异常处理</span>
                </router-link>
             </div>
             <div class="item">
                <router-link to="/kq/calendar">
                  <img src="../../assets/img/3.png"><span>考勤日历</span>
                </router-link>
             </div>
          </div>
       </div>
       <div class="menu-nav">
          <div class="title"><i></i>办公管理</div>
          <div class="menu-list clearfix">
             <div class="item">
                <router-link to="/officework/sendCarApply">
                  <img src="../../assets/img/3.png"><span>派车申请</span>
                </router-link>
             </div>
             <div class="item">
                <router-link to="/officework/workLunchApply">
                  <img src="../../assets/img/3.png"><span>工作餐申请</span>
                </router-link>
             </div>
             <div class="item">
                <router-link to="/officework/sendCarQuery">
                  <img src="../../assets/img/3.png"><span>派车单据查询</span>
                </router-link>
             </div>
              <div class="item">
                <router-link to="/officework/workLunchQuery">
                  <img src="../../assets/img/3.png"><span>工作餐单据查询</span>
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
               {title:'1',imgUrl:'http://www.jq22.com/demo/myscroll201712192341/images/a2.png'},
               {title:'2',imgUrl:'http://www.jq22.com/demo/myscroll201712192341/images/a3.png'},
               {title:'3',imgUrl:'http://www.jq22.com/demo/myscroll201712192341/images/a5.png'}
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
   .scroll-box{
       height: calc(100vh - 120px);
       overflow:hidden;
       overflow-y:auto;
       -webkit-overflow-scrolling: touch;
   }
   .page1{
       padding-left: 0.1rem;
   }
   .box{
       padding: 10px;
   }
   .img-item{
       display: block;
       width: 100%;
       height: 100%;
       background-size: cover;
       background-position: center center;
   }
   .welcome{
       text-align: right;
       border-right: solid 0.2rem transparent;
       padding: 0.15rem 0;
       background-color: #F0F0F0;
   }
</style>
