<template>
  <div class="search-page">
    <div class="search-box bd-bottom-1">
      <div class="search-query">
        <div class="search-select">
          <select v-model="selectType">
            <option v-for="obj in selectList" :value="obj.value" >{{obj.name}}</option>
          </select>
          <i class="arrow-icon"></i>
        </div>
        <div class="search-input">
          <input readonly="readonly" v-model="searchInput"/>
        </div>
      </div>
    </div>
    <div class="person-list scroll">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom"
                   :bottom-all-loaded="allLoaded"
                   ref="loadmoreSearchTwo">
        <div class="search-scroll-box" v-if="cellList&&cellList.length>0">
          <a class="mint-cell" v-for="cell in cellList" @click="clickCell(cell)">
            <div class="mint-cell-wrapper">
              <div class="mint-cell-title">
                <label class="mint-checklist-label">
                   <span class="mint-checkbox">
                     <input type="checkbox" class="mint-checkbox-input" v-model="cell.selected">
                     <span class="mint-checkbox-core"></span>
                   </span>
                   <span class="mint-checkbox-label">{{cell.title}}</span>
                </label>
              </div>
              <!--<div class="mint-cell-value is-link"><span></span></div>-->
              <!--<i class="mint-cell-allow-right"></i>-->
            </div>
          </a>
        </div>
      </mt-loadmore>
    </div>
    <div v-if="checkedType" class="form-btns search-btns">
      <mt-button type="default" class="cancel" @click="cancelSearch">取消</mt-button>
      <mt-button type="primary" class="submit" @click="saveSearch">保存</mt-button>
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
        selectType:'',
        searchInput:'',
        timeOut:0,
        selectList:[],
        cellList:[],
        dataList:[],
        checkedList:[],
        allLoaded:false,
        currPage:1,
        pageLength:50
      }
    },
    props: {
      checkedType: {
        type: Number,
        default: 0 /* 0单选，1多选*/
      },
      searchShow: {
        type: Boolean,
        default: false
      },
      defaultSelectType:{
        type: String,
        default: ''
      }
    },
    watch:{
      checkedType(){
        this.queryPersonList();
      },
      defaultSelectType(val){
         this.selectType = val;
      },
      searchShow(newVal){
         if(newVal){
           this.queryList();
         }
      },
      selectType(){
        this.queryPersonList();
      }
    },
    methods:{
      clickCell(item){
         if(this.checkedType==0){
           for(let i=0;i<this.cellList.length;i++){
             this.cellList[i].selected = false;
             if(item.value==this.cellList[i].value){
               this.cellList[i].selected = true;
             }
           }
           this.$emit('selectCell',[{
             title:item.title,
             value:item.value
           }]);
         }else{
           this.pushCheckedList(item);
         }
      },
      pushCheckedList(obj){
         this.$nextTick(()=> {
           this.checkedList.remove(obj);
           if(obj.selected){ /* 添加 */
             this.checkedList.push(obj);
           }
           this.dealWithInput();
         });
      },
      dealWithInput(){
         this.searchInput = '';
         for(let i=0;i<this.checkedList.length;i++){
           this.searchInput += this.checkedList[i].title +  ';';
         }
      },
      cancelSearch(){
         this.$emit('selectCell',null);
      },
      saveSearch(){
         this.$emit('selectCell',this.checkedList);
      },
      postion:function(){
        if(this.currPage===1){
          this.$nextTick(function() {
            var dom = this.$refs.loadmoreSearchTwo.$el;
            if(!dom) return;
            dom.parentNode.scrollTop = 0;
          })
        }
      },
      loadTop() {
        this.$refs.loadmoreSearchTwo.onTopLoaded();
        this.currPage = 1;
        this.queryList();
      },
      loadBottom() {
         this.currPage=this.currPage+1;
         this.queryList();
      },
      queryPersonList(){
        KqHttp.queryPersonByParams({
          currPage:this.currPage,
          pageLength:this.pageLength,
          dept_num:this.selectType,
          staff_obj:''
        }).then((res)=>{
          if(res.code!=1) return;
          let tempArry = [];
          for(let i=0;i<res.data.pageData.length;i++){
            tempArry.push({
              title:res.data.pageData[i].name,
              value:res.data.pageData[i].staff_num,
              selected:false
            });
          }
          if(this.currPage==1){
            this.cellList = tempArry;
          }else{
            this.cellList = this.cellList.concat(tempArry);
          }
          this.allLoaded = (this.currPage == res.data.pageCount);
          this.$refs.loadmoreSearchTwo.onBottomLoaded();
          this.postion();
        });
      },
      queryList(){
         KqHttp.queryDepartByParams({
            currPage:this.currPage,
            pageLength:this.pageLength,
            dept_obj:''
         }).then((res)=>{
            if(res.code!=1) return;
            this.selectList = [];
            for(let i=0;i<res.data.pageData.length;i++){
              this.selectList.push({
                name:res.data.pageData[i].dept_name,
                value:res.data.pageData[i].dept_num
              });
            }
         });
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
     position: relative;
     height: 100vh;
     width: 100vw;
  }
  .search-page .search-box{
     position: relative;
     height: 0.8rem;
     background-color: #ddd;
  }
  .search-page .search-query{
    position: absolute;
    width: calc(100% - 0.5rem);
    height: 0.5rem;
    line-height: 0.5rem;
    margin: auto;
    top: 0;bottom: 0;left: 0;right: 0;
  }
  .search-page .search-box .search-select{
     position: relative;
     float: left;
     width: 36%;
  }
  .search-page .search-box select{
    height: 0.5rem;
    line-height: 0.5rem;
    width: 100%;
    padding: 0 0.4rem 0 0.1rem;
  }
  .search-page .search-box .search-input{
     position: relative;
     width: 63%;
     float: right;
     height: 0.5rem;
     line-height: 0.5rem;
  }
  .search-input input{
     width: 100%;
     height: 100%;
     line-height: 0.3rem;
     padding: 0 .2rem 0 .2rem;
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
     position: relative;
     height: calc(100vh - 0.8rem);
     margin-left: 0.25rem;
     padding-top: 0.2rem;
  }
  .search-scroll-box{
     min-height: calc(100vh - 0.8rem) !important;
  }
  .arrow-icon{
     display: inline-block;
     width: 0.4rem;
     height: 0.4rem;
     background-size: cover;
     background-image: url("../../assets/img/icon/arrow-icon.png");
  }
  .search-select .arrow-icon{
     position: absolute;
     top: 0.05rem;
     right: 0.1rem;
     transition: transform 0.3s;
  }
  .search-select select:focus + .arrow-icon{
     transform:rotate(180deg);
  }
  .search-btns{
     position: absolute;
     bottom: 3%;
     opacity: 0.8;
  }
</style>
