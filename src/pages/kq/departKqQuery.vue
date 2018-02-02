<template>
    <!-- 部门考勤查询 -->
    <div class="body-box kqQuery">
        <div class="query-box">
            <div class="info">
                <mt-cell title="年月" is-link>
                    {{year_month}}<input class="year-month" v-model="year_month" type="month"/>
                </mt-cell>
                <!--rlgly 人力管理    部门考勤分析 （可以查询所有部门 所有人）-->
                <!--kqgly 部门考勤管理员 和 bmld  部门领导  （只能查询本部门内的所有人）-->
                <!--staff  普通员工（只能查询自己）-->
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
                    <TableCell :dataList="tableList" :pointShow="false" :columnNames="columnValue"></TableCell>
                </div>
            </mt-loadmore>
        </div>
    </div>
</template>
<script>
    import {KqHttp} from '@/api/kqHttp';
    import TableCell from "@/components/query/tablecell";
    import SearchComps from "@/components/query/search";
    import {Loadmore,Popup} from 'mint-ui';
    export default {
        name: 'departKqQuery',
        components:{Loadmore,Popup,TableCell,SearchComps},
        data(){
            return {
                tableList:[],
                columnValue:{
                    titles:['姓名','月工作日','应打卡','未打卡','免打卡','出差','年休假','外出办事','补休','学习假','哺乳假'],
                    columnValues:['name','gzr','ydk','wdk','mdk','cc','nxj','ygbs','bx','xxj','blsj'],
                },
                userInfo:{},
                sdate:'',
                edate:'',
                year_month:new Date().Format2String('yyyy-MM'),
                searchShow:false,
                searchInfo:{},
                queryType:'kepart',
                allLoaded:false,
                currPage:1,
                pageLength:50
            }
        },
        activated(){
            setTitle('部门考勤查询');
        },
        mounted(){
            this.currPage = 1;
            this.userInfo = getUserInfo();
            this.searchInfo = {
              name:'',
              staff_num:'',
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
                  dom[0].parentNode.scrollTop = 0;
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
            queryList(){
              KqHttp.queryDeptKqList({
                   staff_num:this.searchInfo.staff_num,
                   name:this.searchInfo.name,
                   dept_num: this.searchInfo.dept_num,
                   dept_name: this.searchInfo.dept_name,
                   year_month:this.year_month.Format2String('yyyyMM'),
                   currPage: this.currPage,
                   pageLength: this.pageLength
                }).then((res)=>{
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
        height: calc(100% - 3*48px - 2*0.3rem - 42px);
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
    .year-month{
        position: absolute;
        top: 0;
        right: 0;
        z-index: 99999;
        height: 100%;
        width: 90%;
        text-align: right;
        background-color: rgba(200,0,0,0.2);
        opacity: 0;
    }
    .at{
     background-color: #5AC0DE;
    }
</style>
