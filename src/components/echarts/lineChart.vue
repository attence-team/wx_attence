<template>
    <div ref="chart" style="height:100%;width:100%;position: relative;">
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
                        top:'0',
                        left:'4.5%',
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
//                            type : 'value',
                            name:'单位：箱',
                            nameTextStyle:{
                                color:'#ddd'
                            },
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
                            data:[2000, 1000, 2000, 6000, 36067, 10850,20866.1]
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
                            data:[1002, 2000, 5000, 3000, 500, 2700,5850]
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
                            data:[1002, 2000, 5000, 3400, 5700, 4700,8850]
                        }
                    ]
                };
                myChart.setOption(option);
            }
        }
    }
</script>