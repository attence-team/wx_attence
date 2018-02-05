<template>
    <div class="table-list">
        <div :style="{width: tableWidth+'%'}">
            <div class="table-row table-title bd-bottom-1">
                <span v-for="title in columnNames.titles">{{title}}</span>
            </div>
            <div v-if="tableList.length>0" class="table-row bd-bottom-1" v-for="obj in tableList">
                <i class="point" v-if="pointShow"></i>
                <span :title="obj[column]" v-for="column in columnNames.columnValues">{{obj[column]}}</span>
            </div>
        </div>
        <div v-if="tableList.length<=0" class="noneData">暂无数据</div>
    </div>
</template>
<script>
    export default {
        name: 'table-cell',
        data(){
            return {
                tableList:[],
                tableWidth:100
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
            },
            pointShow:{
             type: Boolean,
             default: true
           }
        },
        watch:{
            dataList(c,o) {
                this.tableList = c;
            }
        },
        activated(){
            if(this.columnNames.titles.length>5){
                this.tableWidth = 100 + (this.columnNames.titles.length-5)*18
            }
        }
    }
</script>
<style lang="css" scoped>
    .table-list{
        width: 100%;
        margin-bottom: 0.1rem;
        overflow-x: auto;
    }
    .table-title{
        background:-webkit-gradient(linear, 0% 0%, 0% 100%,from(#d7eafd), to(#feffff));
    }
    .table-row span{
        color: #999;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
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
    .table-row span{
        flex: 1;
        text-align: center;
    }
    .table-row .point{
        display: block;
        position: absolute;
        top: 50%;
        margin-top: -3px;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: #ff8922;
    }
</style>
