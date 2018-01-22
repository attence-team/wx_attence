<template>
  <div class="leftMenu">
    <!--<div class="bg-shadow" @click="menuShow=false"></div>-->
    <div class="menu-box">
      <div class="title">
         <img src="../../assets/img/setting-icon.png">
         <span>系统入口</span>
      </div>
      <div>
        <a class="menu-cell" v-for="data in dataList" @click="clkItem(data)">
          <i class="menu-item-icon mywork-icon" :style="{backgroundImage: 'url('+data.resicon+')'}"></i>
          <span class="menu-cell-content">{{data.resname}}</span>
          <i class="iconfont icon-arrow-right-copy"></i>
        </a>
        <!--<a class="menu-cell" @click="clkItem('我的工作')">-->
          <!--<i class="menu-item-icon mywork-icon"></i>-->
          <!--<span class="menu-cell-content">我的工作</span>-->
          <!--<i class="iconfont icon-arrow-right-copy"></i>-->
        <!--</a>-->
        <!--<a class="menu-cell" @click="clkItem('考勤管理')">-->
          <!--<i class="menu-item-icon mywork-icon"></i>-->
          <!--<span class="menu-cell-content">考勤管理</span>-->
          <!--<i class="iconfont icon-arrow-right-copy"></i>-->
        <!--</a>-->
        <!--<a class="menu-cell" @click="clkItem('办公管理')">-->
          <!--<i class="menu-item-icon mywork-icon"></i>-->
          <!--<span class="menu-cell-content">办公管理</span>-->
          <!--<i class="iconfont icon-arrow-right-copy"></i>-->
        <!--</a>-->
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'leftMenu',
    data(){
      return {}
    },
    props: {
      dataList: {
        type: Array,
        default: []
      }
    },
    methods:{
      clkItem(item){
         this.$emit('selectLink',item.resurl+'?resid='+item.resid);
      }
    }
  }
</script>
<style lang="css" scoped>
   .leftMenu{
      height: 100vh;
      width: 60vw;
      margin-top: -1px;
   }
   .menu-box{
     height: 100%;
     width: 100%;
     background-color: #fff;
   }
   .menu-box .title{
     height: 1.8rem;
     /*background-color: #eff0f2;*/
     background-image: url("../../assets/img/sys-setting-bg.png");
     background-size: cover;
   }
   .menu-box .title img{
      position: relative;
      top: 0.4rem;
      left: 0.4rem;
      height: 1rem;
      width: 1rem;
   }
   .menu-box .title span{
      line-height:1.8rem;
      padding-left: 0.6rem;
      color: #666;
      font-size: 0.32rem;
   }
   .menu-box .menu-item-icon{
     display: inline-block;
     width: 0.36rem;
     height: 0.36rem;
     background-size: cover;
     vertical-align: -0.06rem;
   }
   .menu-cell{
      position: relative;
      display: block;
      height: 1rem;
      line-height: 1rem;
      padding: 0 0.4rem;
   }
   .menu-cell .menu-cell-content{
      padding-left: 0.2rem;
      font-size: 0.32rem;
      color: #333;
   }
   .menu-cell:before{
     content: "";
     position: absolute;
     left: 0;  right: 0;
     bottom: 0;
     border-bottom: 1px solid #dddddd;
     transform: scaleY(.5);
     -webkit-transform: scaleY(.5);
     -webkit-transform-origin: 0 0;
   }
   .menu-cell:active{
      background-color: #eff0f2;
   }
   .menu-cell .icon-arrow-right-copy{
      float: right;
      color: #aaa;
   }
   .mywork-icon{
      background-image: url("../../assets/img/work-icon.png");
   }
</style>
