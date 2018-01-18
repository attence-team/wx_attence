<template>
    <!--原始刷卡记录-->
    <div class="body-box">
        <div class="query-box">
            <div class="info">
                <mt-cell title="年月" value="2018-01" is-link></mt-cell>
                <mt-cell title="姓名" value="" is-link></mt-cell>
                <mt-cell title="部门名称" value="***部门" is-link></mt-cell>
            </div>
            <button class="mint-button mint-button--primary mint-button--normal query">
                <label class="mint-button-text">查询</label>
            </button>
        </div>
        <div class="exp-box table-box touch-scroll touch-scroll">
            <TableCellAuto autowidth="150%" :dataList="tableList" :columnNames="columnValue"></TableCellAuto>
        </div>
    </div>
</template>
<script>
    import {KqHttp} from '@/api/kqHttp';
    import TableCellAuto from "@/components/query/tablecellauto";
    export default {
        name: 'cardRecord',
        components:{TableCellAuto},
        data(){
            return {
                tableList:[],
                columnValue:{
                    titles:['','姓名','请假起日期','请假止日期','请假类型','审批状态','审批状态名称'],
                    columnValues:['staff_name','start_date','intending_date','leave_cause','all_sign','all_sign_nm'],
            },
                userInfo:{},
                sdate:'',
                edate:''
            }
        },
        activated(){
            setTitle('申请记录');
            this.userInfo = getUserInfo();
            this.getAnnualLeave();
        },
        methods:{
            getAnnualLeave(){
                let params = {
                    staff_num: getUserInfo().staff_num,
                    currPage:'1',
                    pageLength:'1000'
                };
                KqHttp.queryAnnualLeave(params).then((res)=>{
                    if(res.code == '1'){
                        _this.tableList = res.data.pageData;
                    }
                });
            },
        }
    }
</script>
<style lang="css">
    .query-box .mint-cell-value.is-link{
       margin-right: 30px;
    }
</style>

<style lang="css" scoped>
    .body-box{
        height: 100vh;
        overflow: hidden;
    }
    .exp-box{
        height: calc(100% - 0.8rem - 3*0.15rem - 0.25rem);
    }
    .table-box{
        background-color: #fff;
        padding: 0 .25rem;
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
</style>
