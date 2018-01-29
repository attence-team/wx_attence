<template>
    <!-- 年休假信息查询 -->
    <div class="body-box cardRecord">
        <div class="query-box">
            <div class="info">
                <mt-cell title="年份" :value="searchInfo.year"></mt-cell>
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
        </div>
        <div class="exp-box table-box scroll">
             <TableCellAuto autowidth="150%"  :dataList="tableList" :columnNames="columnValue"></TableCellAuto>
        </div>
    </div>
</template>
<script>
    import {KqHttp} from '@/api/kqHttp';
    import TableCellAuto from "@/components/query/tablecellauto";
    export default {
        name: 'applyQuery',
        components:{TableCellAuto},
        data(){
            return {
                tableList:[],
                columnValue:{
                    titles:['','姓名','请假起日期','请假止日期','请假类型','审批状态','审批状态名称'],
                    columnValues:['staff_name','start_date','intending_date','leave_cause','all_sign','all_sign_nm']
                },
                userInfo:{},
                searchInfo:{},
                sdate:'',
                edate:'',
                currPage:1,
                pageLength:3
            }
        },
        activated(){
            setTitle('年休假信息查询');
        },
        mounted(){
            this.userInfo = getUserInfo();
            this.searchInfo = {
                year:new Date().Format2String('yyyy年'),
                name:this.userInfo.name,
                staff_num:this.userInfo.staff_num,
                dept_name:this.userInfo.dept_name,
                dept_num:this.userInfo.dept_num
            };
            this.queryList();
        },
        methods:{
            queryList(){
                let params = {
                    staff_num: this.searchInfo.staff_num,
                    dept_num: this.searchInfo.dept_num,
                    dept_name: this.searchInfo.dept_name,
                    name:this.searchInfo.name,
                    currPage:this.currPage,
                    pageLength:this.pageLength
                };
                KqHttp.queryLeave(params).then((res)=>{
                    this.tableList = res.data.pageData;
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
    .cardRecord{
        height: 100vh;
        overflow: hidden;
    }
    .exp-box{
        height: calc(100% - 0.8rem - 2*0.15rem - 0.25rem);
    }
    .table-box{
        background-color: #fff;
        padding: 0.1rem 0.1rem 0 0.1rem;
        height: calc(100% - 3*48px - 0.6rem - 41px - 13px);
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
</style>
