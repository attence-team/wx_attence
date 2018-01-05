<template>
    <div class="table-list">
        <div class="table-row table-title bd-bottom-1">
            <span v-for="title in columnNames.titles">{{title}}</span>
        </div>
        <div class="table-row bd-bottom-1" v-for="obj in tableList">
            <i class="point"></i>
            <span v-for="column in columnNames.columnValues">{{obj[column]}}</span>
        </div>
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
        }
    }
</script>
<style lang="css" scoped>
    .table-list{
        margin-bottom: 1rem;
    }
    .table-title{
        background:-webkit-gradient(linear, 0% 0%, 0% 100%,from(#d7eafd), to(#feffff));
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
        color: #999;
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
