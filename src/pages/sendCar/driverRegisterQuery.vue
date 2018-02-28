<template>
    <!-- 驾驶员登记 -->
    <div class="body-box driver-register">
        <div class="header" id="header">
            <TimeTool @selectTime="selectTime"></TimeTool>
            <div class="application-type-box bd-bottom-1">
                <div class="application-type nnsubmitted" @click="changeQuery('0')">回车登记</div>
                <div class="application-type approved" @click="changeQuery('1')">已回车</div>
                <div class="application-type retreated" @click="changeQuery('2')">未回车</div>
            </div>
        </div>
        <div class="loadmore-box scroll">
            <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :autoFill="false" ref="loadmore">
              <div class="loadmore-scroll-box">
                <TableCell width="120" :dataList="tableList" :pointShow="false" :columnNames="columnValue"></TableCell>
              </div>
            </mt-loadmore>
        </div>
    </div>
</template>
<script>
    import { WlHttp } from '@/api/workLunchHttp';
    import { Indicator , Loadmore } from 'mint-ui';
    import TimeTool from "@/components/query/timetool";
    import TableCell from "@/components/query/tablecell";
    export default {
        name: 'driverRegister',
        components:{TimeTool,TableCell,Indicator,Loadmore},
        data(){
            return {
                staff_num:getUserInfo().staff_num, //职工id
                columnValue:{
                  titles:['派车单号','车牌号','驾驶员','派车日期','回车日期'],
                  columnValues:['v1','v2','v3','v4','v5'],
                },
                sdate:'', //开始日期
                edate:'', //结束日期
                queryType:'', //查询类型
                currPage:1, //当前页面
                pageLength:20, //页数
                tableList:[],
                allLoaded:false
            }
        },
        activated(){
           setTitle('驾驶员登记');
        },
        filters: {
          formatDate: function (value) {
              if(value.length!=8) {return value;}
             return value.slice(0,4) + '-' + value.slice(4,6) + '-' + value.slice(6,8);
          }
        },
        methods:{
            postion(){
              if(this.currPage===1){
                this.$nextTick(function() {
                  var dom = document.getElementsByClassName('mint-loadmore');
                  if(!dom) return;
                  dom[0].parentNode.scrollTop = 0;
                })
              }
            },
            loadTop() {
                this.currPage = 1;
                this.allLoaded = false;
                this.$refs.loadmore.onTopLoaded();
                this.queryList();
            },
            loadBottom() {
                this.currPage = this.currPage + 1;
                this.queryList();
            },
            selectTime(startTime,endTime){
                this.sdate = startTime.Format2String('yyyyMMdd');
                this.edate = endTime.Format2String('yyyyMMdd');
                this.queryList();
            },
            changeQuery(type){
                this.queryType = type;
                this.queryList();
            },
            queryList(){
                Indicator.open();
                setTimeout(()=>{
                  Indicator.close();
                  var dataList = [
                    {v1:'2017080901',v2:2,'v3':3,'v4':4,'v5':5},
                    {v1:'2017080901',v2:22,'v3':33,'v4':44,'v5':55},
                  ];
                },1000);
            }
        }
    }
</script>
<style lang="css" scoped>
   .loadmore-box {
      height: calc(100vh - 1.35rem - 1.1rem - 0.4rem);
      padding: 0.2rem 0.25rem;
      background-color: #fff;
   }
   .loadmore-box .loadmore-scroll-box{
      min-height: calc(100vh - 1.35rem - 0.4rem - 0.7rem);
   }
   .driver-register .application-type-box{
      padding: 0.2rem 10%;
      height: auto;
   }
</style>
