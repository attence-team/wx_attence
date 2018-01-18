<template>
    <!-- 考勤查询 -->
    <div class="body-box kqQuery">
        <TimeTool @selectTime="selectTime"></TimeTool>
        <div class="query-box">
            <div class="info">
                <mt-cell title="姓名" value="" is-link></mt-cell>
                <mt-cell title="部门名称" value="***部门" is-link></mt-cell>
            </div>
            <button class="mint-button mint-button--primary mint-button--normal query">
                <label class="mint-button-text">查询</label>
            </button>
          <div class="application-type-box bd-bottom-1">
            <div class="application-type approved" @click="">正常刷卡</div>
            <div class="application-type at" @click="">迟到</div>
            <div class="application-type retreated" @click="">早退</div>
            <div class="application-type nnsubmitted" @click="">请假</div>
          </div>
        </div>
        <div class="exp-box table-box scroll">
            <TableCell :dataList="tableList" :pointShow="false" :columnNames="columnValue"></TableCell>
        </div>
    </div>
</template>
<script>
    import {KqHttp} from '@/api/kqHttp';
    import TimeTool from "@/components/query/timetool";
    import TableCell from "@/components/query/tablecell";
    export default {
        name: 'cardRecord',
        components:{TimeTool,TableCell},
        data(){
            return {
                tableList:[],
                columnValue:{
                    titles:['部门名称','姓名','日期','打卡时间','打卡情况'],
                    columnValues:['dept_name','staff_name','year_month','bursh_time','bursh_name'],
                },
                userInfo:{},
                sdate:'',
                edate:''
            }
        },
        mounted(){
            setTitle('考勤查询');
            this.userInfo = getUserInfo();
            //this.queryList();
        },
        methods:{
            selectTime(startTime,endTime){
                this.sdate = startTime.Format2String('yyyyMMdd');
                this.edate = endTime.Format2String('yyyyMMdd');
                this.queryList();
            },
            queryList(){
                KqHttp.queryKqList({
                   staff_num: getUserInfo().staff_num,
                   dept_num: getUserInfo().dept_num,
                   sdate:this.sdate,
                   edate:this.edate,
                   currPage:'1',
                   pageLength:'100'
                }).then((res)=>{
//                   console.log(res)
                   this.tableList = res.data.pageData;
                });
            }
        }
    }
</script>
<style lang="css">
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
        height: calc(100% - 0.8rem - 2*0.15rem - 0.25rem);
    }
    .table-box{
        background-color: #fff;
        padding: 0.25rem;
        min-height: calc(100% - 1rem);
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
</style>
