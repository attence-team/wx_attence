<template>
  <div :class="{'je-input':true,'no-title':title==''}">
     <div class="input-list bd-bottom-1" v-for="(inputObj,idx) in inputList">
       <input @keyup="keyUpInput" v-model="inputObj.value" :placeholder="inputObj.placeholder"/>
       <i></i>
       <span v-if="!idx" class="title">{{title}}</span>
       <div class="edit">
         <span @click="selectItem(idx)">选择</span>
         <span v-if="!idx||idx==inputList.length-1" @click="addItem(idx)">十</span>
         <span v-else class="minus" @click="deleteItem(idx)">一</span>
       </div>
     </div>
    <mt-popup
      v-model="searchDriveLineShow"
      position="left">
      <SearchDriveLineComps :checkedType="0"
           :searchShow="searchDriveLineShow" :selectValue="selectValue" @selectCell="selectDriveCell"/>
    </mt-popup>
  </div>
</template>
<script>
  import SearchDriveLineComps from "@/components/query/searchDriveLine";
  export default {
    name: 'je-input',
    components:{SearchDriveLineComps},
    data(){
      return {
        val:'',
        selectIdx:0,
        searchDriveLineShow:false,
        selectValue:'',
        inputList:[
          {
            placeholder:'请输入始发地（必填）',
            value:''
          },
          {
            placeholder:'请输入目的地',
            value:''
          }
        ]
      }
    },
    props: {
        title: {
           type: String,
           default: ''
        },
        value: {
           default: ''
        }
    },
    watch:{
        val(newVal,oldVal){
            console.log(newVal)
            this.$emit('input', newVal);
        },
        value(newVal){
            this.val = newVal;
        }
    },
    activated(){
      Object.assign(this.$data, this.$options.data());
    },
    methods:{
      selectDriveCell(cell){
        this.searchDriveLineShow = false;
        if(!cell) return;
        let driveLineNames = '';
        for(let i=0;i<cell.length;i++){
          if(i==cell.length-1){
            driveLineNames += cell[i].title;
          }else{
            driveLineNames += cell[i].title+'---';
          }
        }
        this.inputList[this.selectIdx].value = driveLineNames;
        this.dealWithInput();
      },
      selectItem(idx){
         this.selectValue = this.inputList[idx].value;
         this.selectIdx = idx;
         this.searchDriveLineShow=true;
      },
      addItem(idx){
        this.inputList.splice(idx+1,0,{
          placeholder:'请输入目的地',
          value:''
        });
      },
      deleteItem(idx){
        this.inputList.splice(idx,1);
        this.$nextTick(()=>{
           this.dealWithInput();
        })
      },
      keyUpInput(){
         this.dealWithInput();
      },
      dealWithInput(){
        this.val = '';
        for(let i=0;i<this.inputList.length;i++){
          let val = this.inputList[i].value.replace(/(^\s*)|(\s*$)/g,"");
          if(!val) continue;
          if(i){
            this.val = this.val + '---' +val;
          }else{
            this.val = val;
          }
        }
      }
    }
  }
</script>
<style lang="css" scoped>
  .je-input{
     position: relative;
     display: inline-block;
     width: 100%;
     min-height: 0.9rem;
     color: #333333;
     font-size: 16px;
  }
  .no-title.je-input{
    min-height: 0.4rem;
  }
  .je-input input{
     width: 100%;
     height: auto;
     line-height: normal;
     border-radius: 0;
     color: #333;
     padding: 6px 8px 8px 0;
     margin-top: 0.1rem;
  }
  .je-input .input-list:nth-child(1) input{
     margin-top: 0.5rem;
  }
  .je-input .input-list{
     position: relative;
  }
  .je-input .input-list .edit{
    position: absolute;
    right: 0.1rem;
    top: 0;
    z-index: 10;
    height: 100%;
    padding-top: 0.2rem;
    box-sizing: border-box;
  }
  .je-input .input-list:first-child .edit{
    top: 0.4rem;
    height: 0.8rem;
  }
  .je-input .input-list .edit span{
     display: inline-block;
     height: 0.4rem;
     line-height: 0.4rem;
     text-align: center;
     font-size: 0.8em;
  }
  .je-input .input-list .edit span:first-child{
     padding: 0 0.2rem;
     border-radius: 3px;
     background-color: #6179d1;
     color: #fff;
     font-weight: bold;
  }
  .je-input .input-list .edit span:last-child{
     width: 0.8rem;
     color: #6179d1;
  }
  .je-input .input-list .edit span.minus{
     color: red;
  }
  .je-input input + i{
    display: block;
    position: relative;
    top: -1px;
    width: 0;
    height: 1px;
    background-color: #6179d1;
  }
  .je-input input + i + span.title {
      display: block;
      position: absolute;
      height: 0.5rem;
      line-height: 0.5rem;
      top: 0;
      left: 0;
      font-size: 16px;
  }
  @media screen and (min-width: 300px) and (max-width: 360px) {
      .je-input input + i + span.title {
          font-size: 14px;
      }
      .je-input input{
          font-size: 14px;
      }
  }
  .je-input input:focus + i{
    transition: width 1s;
    width: 100%;
  }
  /*.je-input input:focus + i + span.title{*/
     /*color: #6179d1;*/
  /*}*/
</style>
