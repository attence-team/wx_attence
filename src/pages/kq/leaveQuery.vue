<template>
    <!--原始刷卡记录-->
    <div class="body-box">
        <div class="query-box">
            <div class="info">
                <mt-cell title="年月" value="2018-01" is-link></mt-cell>
                <mt-cell title="姓名" value="" is-link></mt-cell>
                <mt-cell title="部门名称" value="***部门" is-link></mt-cell>
            </div>
        </div>
        <div class="exp-box table-box touch-scroll">
            <button class="mint-button mint-button--primary mint-button--normal query">
                <label class="mint-button-text">查询</label>
            </button>
            <TableCellAuto :dataList="tableList" :columnNames="columnValue"></TableCellAuto>
        </div>
    </div>
</template>
<script>
    import TableCellAuto from "@/components/query/tablecellauto";
    export default {
        name: 'cardRecord',
        components:{TableCellAuto},
        data(){
            return {
                tableList:[],
                columnValue:{
                    titles:['','姓名','实际出勤日','年休假','出差','月工作日','外出办事','补休','学习假','哺乳时间'],
                    columnValues:['v1','v2','v3','v4','v5','v6','v7','v8','v9'],
                },
                userInfo:{},
                sdate:'',
                edate:''
            }
        },
        mounted(){
            setTitle('申请记录');
            this.userInfo = getUserInfo();
            this.queryList();
        },
        methods:{
            queryList(){
                this.tableList = [
                    {v1:'张三', v2:'22', v3:'2', v4:'3', v5:'4', v6:'0', v7:'1', v8:'3', v9:'6'},
                    {v1:'张三', v2:'22', v3:'2', v4:'3', v5:'4', v6:'0', v7:'1', v8:'3', v9:'6'},
                    {v1:'张三', v2:'22', v3:'2', v4:'3', v5:'4', v6:'0', v7:'1', v8:'3', v9:'6'},
                    {v1:'张三', v2:'22', v3:'2', v4:'3', v5:'4', v6:'0', v7:'1', v8:'3', v9:'6'},
                    {v1:'张三', v2:'22', v3:'2', v4:'3', v5:'4', v6:'0', v7:'1', v8:'3', v9:'6'},
                    {v1:'张三', v2:'22', v3:'2', v4:'3', v5:'4', v6:'0', v7:'1', v8:'3', v9:'6'},
                    {v1:'张三', v2:'22', v3:'2', v4:'3', v5:'4', v6:'0', v7:'1', v8:'3', v9:'6'},
                    {v1:'张三', v2:'22', v3:'2', v4:'3', v5:'4', v6:'0', v7:'1', v8:'3', v9:'6'},
                    {v1:'张三', v2:'22', v3:'2', v4:'3', v5:'4', v6:'0', v7:'1', v8:'3', v9:'6'},
                    {v1:'张三', v2:'22', v3:'2', v4:'3', v5:'4', v6:'0', v7:'1', v8:'3', v9:'6'},
                    {v1:'张三', v2:'22', v3:'2', v4:'3', v5:'4', v6:'0', v7:'1', v8:'3', v9:'6'},
                    {v1:'张三', v2:'22', v3:'2', v4:'3', v5:'4', v6:'0', v7:'1', v8:'3', v9:'6'},
                ];
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
    .exp-box{
        /*height: calc(100% - 0.8rem - 2*0.15rem - 0.25rem);*/
    }
    .table-box{
        background-color: #fff;
        padding: 0 .25rem;
        min-height: calc(100% - 1rem);
    }
    .query-box{
        background-color: #fff;
        padding-left: 0.25rem;
    }
    .query{
        width: 100%;
        margin: 0.5rem 0;
    }
</style>
