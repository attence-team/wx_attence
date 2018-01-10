<template>
    <div class="chart-wrapper" ref="chart" style="height:100%;width:100%;background-color: rgba(200,0,0,0.2);">
ee
    </div>
</template>
<script>
    import echarts from 'echarts';
    export default {
        name: 'lineChart',
        activated(){
            this.$nextTick(()=>{
                this.initChart(echarts.init(this.$refs.chart));
            })
        },
        methods: {
            initChart(myChart) {
                let option = {
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        top:'3%',
                        right:'1%',
                        icon:'roundRect',
                        itemWidth:15,
                        itemHeight:3,
                        textStyle:{color:"#55677b"},
                        data:['客户拜访次数','客户拜访人数'],
                    },
                    grid: {
                        top:'19%',
                        left: '1%',
                        right: '1%',
                        bottom: '5%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap: false,
                            axisTick:{show:false},
                            axisLine: {
                                lineStyle: {
                                    color: '#7380ad'
                                }
                            },
                            axisLabel:{
                                textStyle:{
                                    color:"#7d8690"
                                }
                            },
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: 'rgba(115,128,173,0.1)',
                                    width: 1,
                                }
                            },
                            data : ['2017-04','2017-05','2017-06','2017-07','2017-08','2017-09']
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            axisLine: {show:false},
                            axisTick:{show:false},
                            axisLabel:{
                                textStyle:{
                                    color:"#7d8690"
                                }
                            },
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: 'rgba(115,128,173,0.3)',
                                    type: 'dashed',
                                    width: 1
                                }
                            },
                            splitArea: {
                                show: true,
                                areaStyle: {
                                    color: ['rgba(255,255,255,0)','rgba(237,242,252,0.5)']
                                }
                            },
                        }
                    ],
                    color:["#30b08b","#2ab7eb"],
                    series : [
                        {
                            name:'客户拜访次数',
                            type:'line',
                            barWidth:15,
                            data:[46, 36, 19, 63, 78, 111]
                        },
                        {
                            name:'客户拜访人数',
                            type:'line',
                            barWidth:15,
                            data:[25, 17, 17, 26, 13, 27]
                        }
                    ]
                };
                myChart.setOption(option);
            }
        }
    }
</script>