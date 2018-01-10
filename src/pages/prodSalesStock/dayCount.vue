<template>
    <div class="body-box count-box">
        <div class="chart-box">
            <div class="chart-item">
                <LineChart/>
            </div>
        </div>
        <div class="count-footer">

        </div>
    </div>
</template>
<script>
    import LineChart from "@/components/echarts/lineChart";
    export default {
        name: 'dayCount',
        components:{ LineChart }
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
   }
   .chart-item{
       height: 50vh;
   }
   .count-footer{
       margin-top: 0.25rem;
       height: calc(14vh - 0.25rem);
       box-sizing: border-box;
       background-color: rgba(0,0,0,0.3);
   }
</style>
