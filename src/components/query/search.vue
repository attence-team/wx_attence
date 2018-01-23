<template>
  <div class="table-list">
    <div v-if="tableList.length>0" class="table-row bd-bottom-1" v-for="obj in tableList">
      <i class="point" v-if="pointShow"></i>
      <span :title="obj[column]" v-for="column in columnNames.columnValues">{{obj[column]}}</span>
    </div>
    <div v-if="tableList.length<=0" class="noneData">暂无数据</div>
  </div>
</template>
<script>
  export default {
    name: 'search',
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

</style>
