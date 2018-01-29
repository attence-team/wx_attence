<template>
    <div class="table-list">
        <div class="table-row table-title bd-bottom-1">
            <span v-for="title in columnNames.titles">{{title}}</span>
        </div>
        <div class="table-row table-row-ext bd-bottom-1" v-for="obj in tableList">
            <!--<i class="point"></i>-->
            <span v-for="column in columnNames.columnValues" v-html="obj[column]"></span>
            <span class="btn-wrap"><button @click="optfn(obj)">请选择</button></span>
        </div>
        <div v-if="tableList.length<=0" class="noneData">暂无数据</div>
    </div>
</template>
<script>
    export default {
        name: 'table-cell',
        data(){
            return {
                tableList:[]
            }
        },
        props: {
            dataList: {
                type: Array,
                default: []
            },
            columnNames:{
                type: Object,
                default: {
                    titles:['列1','列2','列3'],
                    columnValues:['value1','value2','value3'],
                }
            }
        },
        watch:{
            dataList:function (c,o) {
                this.tableList = c;
            }
        },
        methods: {
            optfn(obj) {
                this.$emit('optfn',obj);
            }
        }
    }
</script>
<style lang="css" scoped>
    .table-list{
        margin-bottom: 0.1rem;
    }
    .table-title{
        background:-webkit-gradient(linear, 0% 0%, 0% 100%,from(#d7eafd), to(#feffff));
    }
    .table-row span{
        color: #999;
    }
    .table-title span{
        color: #333;
        font-weight: bold;
    }
    .table-row{
        height: 0.8rem;
        line-height: 0.8rem;
        display: flex;
    }
    .table-row-ext{
        height: auto;
        line-height: 0.4rem;
        display: flex;
        padding: .2rem 0;
    }
    .table-row span{
        flex: 1;
        text-align: center;
    }
    .btn-wrap button{
        height: .6rem;
        font-size: .28rem;
        line-height: .6rem;
        color: #fff;
        background-color: #3497F5;
        border-radius: 6px;
        border: 1px solid #3497F5;
        padding: 0 .2rem;
        margin-top: .1rem;
    }
    @media screen and (max-width: 320px) {
        .table-row-ext span{
            font-size: .3rem;
        }
    }
</style>
