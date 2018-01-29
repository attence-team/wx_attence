<template>
    <div class="body-box count-box">
        <div class="chart-box">
            <div class="count-menu">
                <span :class="{active: countIdx==0}" @click="selCount(0)">日统计</span>
                <span :class="{active: countIdx==1}" @click="selCount(1)">月统计</span>
            </div>
            <div class="chart-item">
              <div style="height:100%;width:100%;position: relative;">
                <iframe src="./chart/line.html" id="iframe" ref="iframe" @load="loaded" style="height:100%;" frameborder="no" border="0" scrolling="no" allowtransparency="yes"></iframe>
              </div>
            </div>
        </div>
        <div class="count-footer">
            <div class="select-count">
                <span :class="{fl:true,active: footerIdx==0}" @click="selFooterCount(0)">全部</span>
                <span :class="{fr:true,active: footerIdx==1}" @click="selFooterCount(1)">七匹狼系列</span>
            </div>
        </div>
    </div>
</template>
<script>
    import {ProductHttp} from '@/api/productHttp';
    export default {
        name: 'dayCount',
        data(){
            return {
                countIdx:0,
                footerIdx:0,
                dataList:[],
                series:'',
                dataTypes:'day',
                timeout:0
            }
        },
        watch:{
            countIdx(newVal,oldVal){
                this.dataTypes = newVal?'month':'day';
                this.initChart();
            },
            footerIdx(newVal,oldVal){
                this.series = newVal?newVal:'';
                this.initChart();
            }
        },
        activated(){
           setTitle('移动报表');
           this.initChart();
        },
        methods:{
            selCount(idx){
                this.countIdx = idx;
            },
            selFooterCount(idx){
                this.footerIdx = idx;
            },
            loaded(){
                document.getElementById('iframe').style.width = '100%';
                let st = setInterval(()=>{
                   if(this.dataList.length>0){
                     clearInterval(st);
                     this.loadIframe();
                   }
                },100);
            },
            loadIframe(){
                if(!this.$refs.iframe.contentWindow.initChart) return;
                this.$refs.iframe.contentWindow.initChart();
            },
            initChart() {
                if(this.timeout) return;
                this.timeout = setTimeout(()=>{
                    clearTimeout(this.timeout);
                    this.timeout = 0;
                    sessionStorage.setItem('dataList','[]');
                    ProductHttp.queryProdectCount({
                        series:this.series,
                        dataTypes:this.dataTypes
                    }).then((res)=>{
                        if(res.code==1){
                            sessionStorage.setItem('dataList',JSON.stringify(res.data));
                            this.dataList = res.data;
                            this.loadIframe();
                        }
                    })
                },100);
            }
        }
    }
</script>
<style lang="css" scoped>
    .count-box{
        height: 100vh;
        overflow: hidden;
        background-image: url("../../assets/img/coutn-bg.jpg");
        background-size: cover;
        background-position: center center;
    }
   .chart-box{
       width: 100%;
       height: 86vh;
       background-color: rgba(0,0,0,0.3);
       padding-top: 0.1rem;
   }
   .chart-item{
       height: 84%;
   }
   .count-footer{
       position: relative;
       margin-top: 0.25rem;
       height: calc(14vh - 0.25rem);
       box-sizing: border-box;
       background-color: rgba(0,0,0,0.3);
   }
   .count-menu{
       width: 160%;
       height: 1.6rem;
       line-height: 1.6rem;
       /*margin: 0 auto 0.5rem auto;*/
       margin-left: -30%;
       /*margin-bottom: 0.1rem;*/
       border: solid 1px #fff;
       border-radius: 10px;
       overflow: hidden;
       font-size: 0;
       transform: scale(.5);
   }
    .count-menu span{
         display: block;
         padding: 0;
         margin: 0;
         width: 50%;
         height: 100%;
         float: left;
         text-align: center;
         color: #fff;
         font-size: 32px;
     }
    .count-menu span.active{
        color: #3497f5;
        background-color: #ffffff;
        transition: all .3s;
    }
    .select-count{
        position: absolute;
        height: 1.6rem;
        line-height: 1.6rem;
        width: calc((100% - 0.5rem)*2);
        left:calc((0.5rem - 100%)/2 + 0.25rem);
        top: -0.05rem;
        transform: scale(.5);
    }
    @media only screen and (min-device-width :400px) and (-webkit-min-device-pixel-ratio : 3){
        .select-count{
            top: -9%;
        }
    }
    .select-count span{
        display: block;
        width: calc((100% - 0.25rem)/2);
        height: 100%;
        text-align: center;
        color: #fff;
        border: solid 1px #93afb3;
        box-sizing: border-box;
        border-radius: 10px;
        font-size: 32px;
    }
    .select-count span.active{
        background-color: #508791;
        border: solid 1px #508791;
        transition: all .3s;
    }
</style>
