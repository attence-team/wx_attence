<template>
    <div class="je-select">
        <div class="select-placeholder" v-if="selected===''">{{placeholder}}</div>
        <select v-model="selected" @change="changeItem($event)" @click="clkSelect">
          <option v-for="(option,idx) in options" :value="option.value">
                {{option.name}}
            </option>
        </select>
        <i></i>
        <span>{{title}}</span>
    </div>
</template>
<script>
    export default {
        name: 'je-select',
        data(){
            return {
                selected:''
            }
        },
        props: {
            title: {
                type: String,
                default: ''
            },
            options:{
                type: Array,
                default: []
            },
            value: {
                default: ''
            },
            placeholder:{
              type: String,
              default: ''
            },
        },
        watch:{
            value(newVal){
                this.selected = newVal;
            },
            selected(newVal){
                this.$emit('input', newVal);
            }
        },
        methods:{
          changeItem(e){
             this.$emit('change',e);
          },
          clkSelect(){
             console.log();
          }
        }
    }
</script>
<style lang="css" scoped>
  .je-select{
     position: relative;
     display: inline-block;
     width: 100%;
     min-height: 0.9rem;
     color: #333333;
     font-size: 16px;
  }
  .select-placeholder{
     position: absolute;
     top: 0.68rem;
     left: 0;
     color: #888;
  }
  .je-select:before{
    content: "";
    position: absolute;
    left: 0;  right: 0;
    bottom: 0;
    border-bottom: 1px solid #dddddd;
    transform: scaleY(.5);
    -webkit-transform: scaleY(.5);
    -webkit-transform-origin: 0 0;
  }
  .je-select select{
     width: 100%;
     height: auto;
     margin-top: 0.5rem;
     line-height: normal;
     border-radius: 0;
     color: #333;
     padding: 6px 8px 8px 0;
  }
  .je-select select + i{
    display: block;
    position: relative;
    top: -1px;
    width: 0;
    height: 1px;
    background-color: #6179d1;
  }
  .je-select select + i + span {
      display: block;
      position: absolute;
      height: 0.5rem;
      line-height: 0.5rem;
      top: 0;
      left: 0;
      font-size: 16px;
  }
  @media screen and (min-width: 300px) and (max-width: 360px) {
      .je-select select + i + span {
          font-size: 14px;
      }
      .je-select select{
          font-size: 14px;
      }
  }
  .je-select select:focus + i{
    transition: width 1s;
    width: 100%;
  }
  .je-select select:focus + i + span{
     color: #6179d1;
  }
</style>
