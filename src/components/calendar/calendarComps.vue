<template>
    <div class="calendar">
        <!--<ul>-->
            <!--<li>日</li>-->
            <!--<li>一</li>-->
            <!--<li>二</li>-->
            <!--<li>三</li>-->
            <!--<li>四</li>-->
            <!--<li>五</li>-->
            <!--<li>六</li>-->
            <!--<li>29</li><li class="diabled normal">30</li><li class="diabled warn">31</li><li class="warn">1</li><li class="warn">2</li><li class="warn">3</li><li>4</li>-->
            <!--<li>5</li><li>6</li><li>7</li><li class="normal">8</li><li class="now-date"><span>9</span></li><li>10</li><li>11</li>-->
            <!--<li>12</li><li>13</li><li>14</li><li>15</li><li>16</li><li>17</li><li>18</li>-->
            <!--<li>19</li><li>20</li><li>21</li><li>22</li><li>23</li><li>24</li><li>25</li>-->
            <!--<li>26</li><li>27</li><li>28</li><li>29</li><li>30</li><li>1</li><li>2</li>-->
        <!--</ul>-->
        <ul>
            <li :class="time.type" @click="clickDay(idx)" v-for="(time,idx) in dateList">
                <span>{{time.value}}</span>
            </li>
        </ul>
    </div>
</template>
<script>
    Date.prototype.Format2String = function (fmt) {
        if(!this) return null;
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };
    export default {
        name: 'calendar',
        data(){
            return {
                time: new Date(),
                dateList:[]
            }
        },
        props: {
            curTime: {
                type: String,
                default: ((new Date()).Format2String('yyyy-MM-dd'))
            }
        },
        watch:{
            curTime(curVal,oldVal){
                this.time = new Date(curVal);
                this.initCalendar();
            }
        },
        mounted(){
            this.initCalendar();
            this.setDateSelect(new Date().Format2String('yyyy-MM-dd'),'active');
            this.setDateSelect('2018-01-08','warn');
            this.setDateSelect('2018-01-06','warn');
            this.setDateSelect('2018-01-05','warn');
            this.setDateSelect('2018-01-04','normal');
            this.setDateSelect('2018-01-03','normal');
            this.setDateSelect('2018-01-02','normal');
            this.setDateSelect('2018-01-01','normal');
            this.setDateSelect('2017-12-31','diabled normal');
        },
        methods:{
            clickDay(idx){
                if(this.dateList[idx].time){
                    this.$emit('clickDate',this.dateList[idx].time);
                }
            },
            initCalendar(){
                this.dateList = [
                    {value:'日'}, {value:'一'}, {value:'二'}, {value:'三'}, {value:'四'}, {value:'五'}, {value:'六'}
                ];
                let monthDay = this.time.getMonthDay();
                let upMonthDay = new Date(this.time.getFullYear(), this.time.getMonth()+1, this.time.getDate()).getMonthDay();
                let week = new Date(this.time.Format2String('yyyy-MM')+'-01').getDay();
                let monthCount = 1;
                let upMonthCount = 1;
                for(let i=1;i<=35;i++){
                    let day = {};
                    if(week!=6&&(week - i)>=0){ /* 上个月时间 */
                        day = {
                            type:'diabled',
                            value: (upMonthDay - (week - i))
                        };
                    }else if(monthCount<=monthDay){
                        let time = monthCount<10?('0'+monthCount):(''+monthCount);
                        day = {
                            time:this.time.Format2String('yyyy-MM-')+time,
                            value: monthCount++
                        };
                    }else{
                        day = {
                            type:'diabled',
                            value: upMonthCount++
                        };
                    }
                    this.dateList.push(day)
                }
            },
            setDateSelect(date,type){
                let idx = this.getDateIdx(date);
                if(idx<0) return;
                this.dateList[idx].type = type;
            },
            getDateIdx(date){
                let day = new Date(date).getDate();
                for(let i=0;i<this.dateList.length;i++){
                   if(this.dateList[i].value == day){
                       return i;
                   }
                }
                return -1;
            }
        }
    }
</script>
<style lang="css" scoped>
    .calendar ul{
        background-color: #0086b3;
    }
   .calendar li{
       width: 14.28%;
       float: left;
       text-align: center;
       line-height: 0.9rem;
       font-size: 0.24rem;
   }
    .calendar li:nth-child(1),
    .calendar li:nth-child(2),
    .calendar li:nth-child(3),
    .calendar li:nth-child(4),
    .calendar li:nth-child(5),
    .calendar li:nth-child(6),
    .calendar li:nth-child(7)
    {
        font-weight: bold;
    }
    .diabled,
    .calendar li:nth-child(1),
    .calendar li:nth-child(7),
    .calendar li:nth-child(8),
    .calendar li:nth-child(14),
    .calendar li:nth-child(15),
    .calendar li:nth-child(21),
    .calendar li:nth-child(22),
    .calendar li:nth-child(28),
    .calendar li:nth-child(29),
    .calendar li:nth-child(35),
    .calendar li:nth-child(36),
    .calendar li:nth-child(42)
    {
        color: #999999;
    }
    .active span{
        display: block;
        margin: 0 auto;
        width: 0.88rem;
        height: 0.88rem;
        border-radius: 50%;
        background-color: #ff6054;
        color: #fff;
    }
    .calendar .diabled{
        opacity: 0.6;
    }
    .calendar li.warn{
        color: #ff6054;
    }
    .calendar li.normal{
        color: #3497f5;
    }
</style>
