<template>
    <div ref="chart" style="height:100%;width:100%;">
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
                        top:'2%',
                        left:'5%',
                        icon:'circle',
                        data:[
                            {name:'可挑拨库存',textStyle:{color:"#74d5fd"}},
                            {name:'产量',textStyle:{color:"#58ffc6"}},
                            {name:'调拨量',textStyle:{color:"#dddddd"}}
                        ]
                    },
                    grid: {
                        top:'12%',
                        left: '0',
                        right: '8%',
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
                                    color:"#fff"
                                }
                            },
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: 'rgba(101,148,129,0.8)',
                                    type:'dotted',
                                    width: 1,
                                }
                            },
                            data : ['周二\n01/02','周三\n01/03','周四\n01/04','周五\n01/05','周六\n01/06','昨天\n01/07','今天\n01/07']
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            axisLine: {show:false},
                            axisTick:{show:false},
                            axisLabel:{
                                show:false
                            },
                            splitLine: {
                                show: false
                            },
                            splitArea: {
                                show: false
                            }
                        }
                    ],
                    color:["#74d5fd","#58ffc6","#dddddd"],
                    series : [
                        {
                            name:'可挑拨库存',
                            type:'line',
                            barWidth:15,
                            symbolSize:8,
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true,
                                        position: "top"
                                    }
                                }
                            },
                            data:[46, 36, 19, 63, 78, 111,90]
                        },
                        {
                            name:'产量',
                            type:'line',
                            barWidth:15,
                            symbolSize:8,
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true,
                                        position: "top"
                                    }
                                }
                            },
                            data:[25, 17, 17, 26, 13, 27,50]
                        },
                        {
                            name:'调拨量',
                            type:'line',
                            barWidth:15,
                            symbolSize:8,
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true,
                                        position: "top"
                                    }
                                }
                            },
                            data:[10, 19, 19, 24, 20, 14,30]
                        }
                    ]
                };
                myChart.setOption(option);
            }
        }
    }
</script>