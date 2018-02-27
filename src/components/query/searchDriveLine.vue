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
          <input v-model="searchInput"/>
        </div>
      </div>
    </div>
    <div class="person-list scroll">
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
  import {CarHttp} from '@/api/carHttp';
  export default {
    name: 'search',
    data(){
      return {
        selectType:'',
        selectName:'',
        searchInput:'',
        timeOut:0,
        selectList:[],
        cellList:[],
        dataList:[],
        checkedList:[]
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
      },
      selectValue: {
        type: String,
        default: ''
      },
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
           this.queryList(()=>{
             this.queryPersonList();
           });
         }
      },
      selectType(val){
        this.queryPersonList();
        for(let i=0;i<this.selectList.length;i++){
          if(val==this.selectList[i].value){
            this.selectName = this.selectList[i].name;
            return;
          }
        }
      }
    },
    methods:{
      clickCell(item){
         if(this.checkedType==0){
           this.$emit('selectCell',[{
             title:this.selectName+'-'+item.title,
             value:item.value,
           }]);
         }else{
           this.pushCheckedList(item);
         }
      },
      pushCheckedList(obj){
         this.$nextTick(()=> {
           let tempItem = {
             title:obj.title,
             value:obj.value,
           };
           this.checkedList.remove(tempItem);
           if(obj.selected){ /* 添加 */
             this.checkedList.push(tempItem);
           }
           this.dealWithInput();
         });
      },
      dealWithInput(){
         this.searchInput = '';
         for(let i=0;i<this.checkedList.length;i++){
           this.searchInput += this.checkedList[i].title +  ',';
         }
      },
      cancelSearch(){
         this.$emit('selectCell',null);
      },
      saveSearch(){
         this.$emit('selectCell',this.checkedList);
      },
      queryPersonList(){
        CarHttp.queryCityList({
          province_num:this.selectType
        }).then((res)=>{
          if(res.code!=1) return;
          let tempArry = [];
          for(let i=0;i<res.data.length;i++){
            let isChecked  = false;
            if(this.selectValue.indexOf(res.data[i].city_name)!=-1){
              isChecked = true;
            }
            tempArry.push({
              title:res.data[i].city_name,
              value:res.data[i].city_num,
              selected:isChecked
            });
          }
          this.cellList = tempArry;
        });
      },
      queryList(fn){
         CarHttp.queryProvinceList({}).then((res)=>{
            if(res.code!=1) return;
            this.selectList = [];
            for(let i=0;i<res.data.length;i++){
              this.selectList.push({
                name:res.data[i].city_name,
                value:res.data[i].city_num
              });
            }
            this.selectType = this.selectList[0].value;
            if(fn) fn();
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
