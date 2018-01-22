<template>
    <div style="height:100%;width:100%;position: relative;">
      <iframe src="./chart/line.html" ref="refIframe" :load="loaded" style="height:100%;width:100%;" frameborder="no" border="0" scrolling="no" allowtransparency="yes"></iframe>
    </div>
</template>
<script>
    import {ProductHttp} from '@/api/productHttp';
    export default {
        name: 'lineChart',
        data(){
           return {
              dataList:[]
           }
        },
        activated(){
            this.$nextTick(()=>{
                this.initChart();
            })
        },
        methods: {
          loaded(){
            debugger
            this.$refs.refIframe.contentWindow.init(this.dataList);
          },
          initChart() {
                ProductHttp.queryProdectCount({
                  series:'',
                  types:'db',
                  dataTypes:'day',
                  sDate:'20150903',
                  eDate:'20150912'
                }).then((res)=>{
                    if(res.code==1){
                      console.log('list:');
                      console.log(JSON.stringify(res.data));
                    }
                })
              }
          }
    }
</script>
