<template>
  <div class="search-page">
    <div class="search-box bd-bottom-1">
      <div class="search-input">
        <i class="iconfont icon-search"></i>
        <input v-model="searchInput" placeholder="搜索"/>
      </div>
    </div>
    <div class="person-list scroll">
      <div class="scroll-box" v-if="cellList&&cellList.length>0">
        <mt-cell v-for="cell in cellList" :title="cell.dept_name" :value="cell.name" is-link></mt-cell>
      </div>
      <div v-else class="noneData">请输入内容进行检索</div>
    </div>
  </div>
</template>
<script>
  import {KqHttp} from '@/api/kqHttp';
  export default {
    name: 'search',
    data(){
      return {
        searchInput:'',
        timeOut:0,
        cellList:[]
      }
    },
    props: {
      searchShow: {
        type: Boolean,
        default: false
      }
    },
    watch:{
      searchShow(newVal,oldVal){
         if(newVal){
           this.queryPerson();
         }
      },
      searchInput(newVal,oldVal) {
          if(this.timeOut) return;
          this.timeOut = setTimeout(()=>{
             clearTimeout(this.timeOut);
             this.timeOut = 0;
             this.queryPerson();
          },100);
      }
    },
    methods:{
      queryPerson(){
        let params = {
          //staff_obj:this.searchInput,
          dept_num:1011,
          currPage:1,
          pageLength:100
        };
        KqHttp.queryPersonByParams(params).then((res)=>{
            this.cellList = res.data.pageData;
        })
      }
    }
  }
</script>

<style lang="css">
  .search-page .mint-cell-value.is-link {
    margin-right: 30px;
  }
</style>
<style lang="css" scoped>
  .search-page{
     height: 100vh;
     width: 100vw;
  }
  .search-page .search-box{
     position: relative;
     height: 0.8rem;
     background-color: #ddd;
  }
  .search-page .search-input{
     position: absolute;
     width: calc(100% - 0.5rem);
     height: 0.5rem;
     line-height: 0.5rem;
     margin: auto;
     top: 0;bottom: 0;left: 0;right: 0;
  }
  .search-input input{
     width: 100%;
     height: 100%;
     line-height: 0.3rem;
     padding: 0 .2rem 0 .5rem;
     color: #333;
  }
  .search-input .icon-search{
     display: block;
     position: absolute;
     top: 0.026rem;
     left: 0.1rem;
  }
  .person-list{
     height: calc(100vh - 0.8rem);
     margin-left: 0.25rem;
  }
</style>
