<template>
  <!-- 个人考勤查询 -->
  <div class="body-box kqQuery">
    <TimeTool @selectTime="selectTime"></TimeTool>
    <div class="query-box">
      <div class="info">
        <!--rlgly 人力管理    部门考勤分析 （可以查询所有部门 所有人）-->
        <!--kqgly 部门考勤管理员 和 bmld  部门领导  （只能查询本部门内的所有人）-->
        <!--staff  普通员工  （只能查询自己）-->
        <mt-cell v-if="userInfo.kqRole=='rlgly'" title="部门名称"
                 :value="searchInfo.dept_name"
                 @click.native="searchShow = !searchShow;queryType='depart'" is-link></mt-cell>
        <mt-cell v-else title="部门名称" :value="searchInfo.dept_name"></mt-cell>
        <mt-cell v-if="userInfo.kqRole=='kqgly'||userInfo.kqRole=='bmld'" title="姓名"
                 :value="searchInfo.name"
                 @click.native="searchShow=!searchShow;queryType='person'" is-link></mt-cell>
        <mt-cell v-else title="姓名" :value="searchInfo.name"></mt-cell>
      </div>
      <button class="mint-button mint-button--primary mint-button--normal query" @click="queryList">
        <label class="mint-button-text">查询</label>
      </button>
      <div class="application-type-box bd-bottom-1">
        <!--<div class="application-type approved" @click="">正常刷卡</div>-->
        <!--<div class="application-type at" @click="">迟到</div>-->
        <!--<div class="application-type retreated" @click="">早退</div>-->
        <!--<div class="application-type nnsubmitted" @click="">请假</div>-->
        <div class="application-type at" @click="queryListType()">全部</div>
        <div class="application-type approved" @click="queryListType(1)">正常刷卡</div>
        <div class="application-type retreated" @click="queryListType(2)">非正常刷卡</div>
      </div>
    </div>
    <mt-popup
      v-model="searchShow"
      position="left">
      <SearchComps
        :deptNum="searchInfo.dept_num"
        :searchShow="searchShow"
        :queryType="queryType"
        @selectCell="selectCell"/>
    </mt-popup>
    <div class="exp-box scroll">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :autoFill="false" ref="loadmore">
      <div class="table-box scroll-box">
        <TableCell width="120" :dataList="tableList" :pointShow="false" :columnNames="columnValue"></TableCell>
      </div>
      </mt-loadmore>
    </div>
  </div>
</template>
<script>
  import {KqHttp} from '@/api/kqHttp';
  import TimeTool from "@/components/query/timetool";
  import TableCell from "@/components/query/tablecell";
  import SearchComps from "@/components/query/search";
  import {Loadmore,Popup} from 'mint-ui';
  export default {
    name: 'departKqQuery',
    components:{Loadmore,Popup,TimeTool,TableCell,SearchComps},
    data(){
      return {
        tableList:[],
        columnValue:{
          titles:['部门名称','姓名','日期','打卡时间','打卡情况'],
          columnValues:['dept_name','staff_name','year_month','bursh_time','bursh_name'],
        },
        userInfo:{},
        sdate:'',
        edate:'',
        searchShow:false,
        searchInfo:{},
        bursh_name:'',
        queryType:'person',
        allLoaded:false,
        currPage:1,
        pageLength:50
      }
    },
    activated(){
        setTitle('个人考勤查询');
    },
    mounted(){
      this.userInfo = getUserInfo();
      this.searchInfo = {
        name:this.userInfo.name,
        staff_num:this.userInfo.staff_num,
        dept_name:this.userInfo.dept_name,
        dept_num:this.userInfo.dept_num
      };
    },
    methods:{
      postion:function(){
        if(this.currPage===1){
          this.$nextTick(function() {
            var dom = document.getElementsByClassName('mint-loadmore');
            if(!dom) return;
            dom[dom.length-1].parentNode.scrollTop = 0;
          })
        }
      },
      loadTop() {
         this.currPage = 1;
         this.allLoaded = false;
         this.$refs.loadmore.onTopLoaded();
         this.queryList();
      },
      loadBottom() {
         this.currPage=this.currPage+1;
         this.queryList();
      },
      selectTime(startTime,endTime){
        this.currPage = 1;
        this.sdate = startTime.Format2String('yyyyMMdd');
        this.edate = endTime.Format2String('yyyyMMdd');
        this.queryList();
      },
      selectCell(item){
        this.searchShow = false;
        if(this.queryType=='person'){
          this.searchInfo.name = item.name;
          this.searchInfo.staff_num = item.staff_num;
        }else{
          this.searchInfo.dept_num = item.dept_num;
          this.searchInfo.dept_name = item.dept_name;
        }
      },
      queryListType(type){
          this.bursh_name = type?type:'';
          this.queryList();
      },
      queryList(){
        KqHttp.queryKqList({
          bursh_name:this.bursh_name,
          staff_num: this.searchInfo.staff_num,
          dept_num: this.searchInfo.dept_num,
          dept_name: this.searchInfo.dept_name,
          name:this.searchInfo.name,
          sdate:this.sdate,
          edate:this.edate,
          currPage: this.currPage,
          pageLength: this.pageLength
        }).then((res)=>{
            //this.tableList = res.data.pageData;
            if(this.currPage==1){
                this.tableList = [];
                this.tableList = res.data.pageData;
            }else{
                this.tableList = this.tableList.concat(res.data.pageData);
            }
            this.allLoaded = res.data.pageData.length<this.pageLength;
            this.$refs.loadmore.onBottomLoaded();
            this.postion();
        });
      }
    }
  }
</script>
<style lang="css">
  .query-box .mint-cell-value{
    margin-right: 20px;
  }
  .query-box .mint-cell-value.is-link{
    margin-right: 30px;
  }
</style>
<style lang="css" scoped>
  .kqQuery{
    height: 100vh;
    overflow: hidden;
  }
  .exp-box{
    height: calc(100% - 1.1rem - 2*48px - 2*0.3rem - 51px - 1rem - 14px);
    background-color: #fff;
  }
  .table-box{
    padding: 0.25rem 0.25rem 0 0.25rem;
  }
  .query-box{
    background-color: #fff;
  }
  .query-box .info{
    margin-left: 0.25rem;
  }
  .query{
    width: 90%;
    margin: 0.3rem 5%;
  }
  .at{
    background-color: #5AC0DE;
  }
  .kqQuery >>> .table-row span:last-child{
     width: 100px !important;
     flex: inherit;
  }
</style>
