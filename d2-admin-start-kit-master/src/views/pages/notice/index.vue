<template>
  <d2-container>
    <template slot="header">信息栏
    <el-button type="primary" style="margin-left: 30px" @click="showAdd"> 发布帖子 </el-button>
    </template>
   
  </d2-container>
</template>

<script>
  import {getTitle,editTitle,addTitle,deleteTitle} from "../../netWork/apiMethod";

  export default {
  name: 'notice',
  data () {
    return{
        canAdd: false,
        canEdit:false,
       titles: [],
      tempTitle: {
        sTitleId: null,
        titleType: null,
        startUserId: null,
        sTitleConf: null,
        cTime: null,
        endTime: null,
        sTitleTitle: null,

        isStart: null,
        isEnd: null,
        startName: null,
      },
      pickerOption: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '明天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '三天后',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 3);
            picker.$emit('pick', date);
          }
        },
          {
            text: '一周后',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
      }
    }
  },
  mounted() {
   this.getAllTitles()
  },
  methods: {
    showEdit(item){
      this.changeDate()
      this.tempTitle = item
      this.canEdit = true
    },
    sendAdd() {
      let sTitle ={
        sTitleId: this.tempTitle.sTitleId,
        titleType: this.tempTitle.titleType,
        startUserId: this.$store.state.userId,
        sTitleConf: this.tempTitle.sTitleConf,
        cTime: this.tempTitle.cTime,
        endTime: this.tempTitle.endTime,
        sTitleTitle: this.tempTitle.sTitleTitle,
      }
      addTitle(sTitle,"class").then(res =>{
        this.getAllTitles()
        this.changeDate()
        this.canEdit = false
      })
    },
    sendUpdate(){
      let sTitle ={
        sTitleId: this.tempTitle.sTitleId,
        titleType: this.tempTitle.titleType,
        startUserId: this.$store.state.userId,
        sTitleConf: this.tempTitle.sTitleConf,
        cTime: this.tempTitle.cTime,
        endTime: this.tempTitle.endTime,
        sTitleTitle: this.tempTitle.sTitleTitle,
      }
      editTitle(sTitle).then(res=>{
        this.getAllTitles()
        this.changeDate()
        this.canEdit = false
      })
    },
    sendDelete(){
      let id = this.tempTitle.sTitleId
      deleteTitle(id).then(res =>{
        this.getAllTitles()
        this.changeDate()
        this.canEdit = false
      })
    },
    changeDate(){
      this.tempTitle = {
        sTitleId: null,
        titleType: null,
        startUserId: null,
        sTitleConf: null,
        cTime: null,
        endTime: null,
        sTitleTitle: null,

        isStart: null,
        isEnd: null,
        startName: null,
      }
    },
    showAdd() {
      this.canAdd = true
      this.changeDate()
    },
    getAllTitles(){
        getTitle(this.$store.state.userId).then(res =>{
           this.titles  = res
        })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.changeDate()
          this.canEdit = false
          this.canAdd = false
          done();
        })
        .catch(_ => {});
    }
  }
}
</script>
<style>
  .isUse{
    background-color: rgba(91, 198, 255, 0.77);
    margin-top: 20px;
  }
  .isNotUse{
    background-color: rgba(255, 95, 0, 0.88);
    opacity: 0.6;
    margin-top: 20px;
  }
  .isFinished{
    background-color: rgba(0, 0, 0, 0.26);
    opacity: 0.3;
    margin-top: 20px;
  }
</style>
