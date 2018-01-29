<template>
    <div class="table-list">
        <div class="table-list-width" v-bind:style="{ width: autowidth}">
            <div class="table-row table-title">
                <span v-for="title in columnNames.titles" class="bd-bottom-1">{{title}}</span>
            </div>
            <div v-if="tableList.length>0" class="table-row" v-for="obj in tableList">
                <span class="point-wrap bd-bottom-1"><i class="point"></i></span>
                <span v-for="column in columnNames.columnValues" class="bd-bottom-1">{{obj[column]}}</span>
            </div>
        </div>
        <div v-if="tableList.length<=0" class="noneData">暂无数据</div>
    </div>
</template>
<script>
    export default {
        name: 'table-cell-auto',
        data(){
            return {
                tableList:[]
            }
        },
        props: {
            autowidth:{
                type:String,
                default:'200%'
            },
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
        }
    }
</script>
<style lang="css" scoped>
    .table-list{
        margin-bottom: 0.1rem;
        overflow-x: auto;
    }
    .table-list-width{
        display: table;
    }
    .table-title{
        display: table-row;
        background:-webkit-gradient(linear, 0% 0%, 0% 100%,from(#d7eafd), to(#feffff));
    }
    .table-row span{
        color: #999;
    }
    .table-title span{
        color: #333;
        font-weight: bold;
        display: table-cell;
    }
    .table-row{
        height: 0.8rem;
        line-height: 0.8rem;
        display: table-row;
    }
    .table-row span{
        text-align: center;
        display: table-cell;
        padding: 0 .15rem;
    }
    .table-row .point-wrap{
        position: relative;
    }
    .table-row .point{
        display: block;
        position: absolute;
        top: 50%;
        left: 1px;
        margin-top: -3px;
        width: 6px;
        height: 6px;
        line-height: 6px;
        border-radius: 50%;
        background-color: #ff8922;
    }
</style>
