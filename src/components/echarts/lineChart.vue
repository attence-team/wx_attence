<template>
    <div style="height:100%;width:100%;position: relative;">
      <iframe src="./chart/line.html" style="height:100%;width:100%;" frameborder="no" border="0" scrolling="no" allowtransparency="yes"></iframe>
    </div>
</template>
<script>
    export default {
        name: 'lineChart',
        activated(){
            this.$nextTick(()=>{
                this.initChart();
            })
        },
        methods: {
            initChart() {

            }
        }
    }
</script>
