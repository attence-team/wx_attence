<template>
  <div class="search-page">
    <div class="search-box bd-bottom-1">
      <div class="search-input">
        <i class="iconfont icon-search"></i>
        <input v-model="searchInput" placeholder="搜索"/>
      </div>
    </div>
    <div class="person-list scroll">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
        <div class="scroll-box" v-if="cellList&&cellList.length>0">
           <template v-if="queryType=='depart'">
             <mt-cell v-for="cell in cellList"
                      :title="cell.dept_name"
                      @click.native="clickCell(cell)"
                      is-link></mt-cell>
           </template>
           <template v-if="queryType=='person'">
             <mt-cell v-for="cell in cellList"
                      :title="cell.name"
                      :value="cell.dept_name"
                      @click.native="clickCell(cell)"
                      is-link></mt-cell>
           </template>
        </div>
        <!--<div v-else class="noneData">请输入内容进行检索</div>-->
      </mt-loadmore>
    </div>
  </div>
</template>
<script>
  import { Loadmore } from 'mint-ui';
  import {KqHttp} from '@/api/kqHttp';
  export default {
    name: 'search',
    components:{Loadmore},
    data(){
      return {
        searchInput:'',
        timeOut:0,
        cellList:[],
        allLoaded:false,
        currPage:1,
        pageLength:50
      }
    },
    props: {
      searchShow: {
        type: Boolean,
        default: false
      },
      deptNum: {
        type: String,
        default: ''
      },
      queryType:{
        type: String,
        default: 'person'
      }
    },
    watch:{
      queryType(newVal,oldVal){
         this.currPage = 1;
      },
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
      clickCell(item){
         this.$emit('selectCell',item);
      },
      loadTop() {
        this.$refs.loadmore.onTopLoaded();
        this.currPage = 1;
        this.queryPerson();
      },
      loadBottom() {
        this.currPage=this.currPage+1;
        this.queryPerson();
      },
      queryPerson(){
        if(this.queryType=='person'){ //人员查询
            KqHttp.queryPersonByParams({
              staff_obj:this.searchInput,
              dept_num:this.deptNum,
              currPage:this.currPage,
              pageLength:this.pageLength
            }).then((res)=>{
              if(this.currPage==1){
                this.cellList = res.data.pageData;
              }else{
                this.cellList = this.cellList.concat(res.data.pageData);
              }
              this.allLoaded = (this.currPage == res.data.pageCount);
              this.$refs.loadmore.onBottomLoaded();
            })
        }else{ //部门查询
            KqHttp.queryDepartByParams({
              dept_obj:this.searchInput,
              currPage:this.currPage,
              pageLength:this.pageLength
            }).then((res)=>{
//              debugger
              if(this.currPage==1){
                this.cellList = res.data.pageData;
              }else{
                this.cellList = this.cellList.concat(res.data.pageData);
              }
              this.allLoaded = (this.currPage == res.data.pageCount);
              this.$refs.loadmore.onBottomLoaded();
            })
        }

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
     color: #666;
     font-weight: bold;
  }
  .person-list{
     height: calc(100vh - 0.8rem);
     margin-left: 0.25rem;
     padding-top: 0.2rem;
  }
</style>
