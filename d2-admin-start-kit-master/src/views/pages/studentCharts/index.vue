<template>
  <d2-container>
    <template slot="header">
      <el-button type="text" disabled>成绩监控</el-button>
      <el-button @click="changeDataToGrade" style="margin-left: 50px" type="primary">{{notice}}</el-button>
      <el-tooltip class="item" effect="dark" content="考试成绩取最近六场考试成绩，如果不足六场，则以所拥有的考试次数为数据" placement="bottom-start">
      <i class="fa fa-question-circle" aria-hidden="true" style="margin-left: 30px"></i>
      </el-tooltip>
    </template>
 

  </d2-container>
</template>

<script>
  import leidatu from "../../echart-comment/leidatu";
  import leidatu2 from "../../echart-comment/leidatu2";
  import leidatu3 from "../../echart-comment/leidatu3";
  import {getAbility} from "../../netWork/apiMethod";
export default {
  name: 'studentCharts',
  components:{
    leidatu,
    leidatu2,
    leidatu3
  },
  data () {
    return{
      dataZoom:[
        {
          type: 'slider',
          start: 0,
          end: 100
        }
      ],
      toolbox:{
        feature: {
          magicType: {type: ['line', 'bar']},
          saveAsImage: {}
        }
      },
      chooseNick:true,
      showPro: false,
      chartsData: {},
      classChart: {},
      gradeChart: {},
      studentConf:{
        studentName: null,
        studentUrl: null,
        studentNickName: null,
        studentNickUrl: null,
        studentHonor: null,
        studentConf: null,
        studentDesignation: null,
        classId: null,
        cTime: null,
        uTime: null,
        sstudentId: null
      },
      classConf:{
        classNoName: null,
        classNickName: null,
        classUrl: null,
        classWatchword: null,
        classConf: null,
        classHonor: null,
        classDesignation: null,
        sclassId: null,
      },
      veBarData: {},
      gradeLineData: {
        artThreeData: {},
        mainThreeData: {},
        scienceThreeData: {},
        totalThreeData: {},
      },
      classLineData: {
        artThreeData: {},
        mainThreeData: {},
        scienceThreeData: {},
        totalThreeData: {},
      },
      userLineData:{
        artThreeData: {},
        mainThreeData: {},
        scienceThreeData: {},
        totalThreeData: {},
      },
      notice: "转化为年级权重"


    }


  },
  mounted() {
    this.getOriginData()
  },
  methods: {
    changeNick(){
       this.chooseNick = !this.chooseNick
    },
    changeDataToGrade(){
      if (this.notice == "转化为年级权重"){
        this.notice = "转化为班级权重"
        this.userLineData = this.gradeLineData
      }else {
        this.notice = "转化为年级权重"
        this.userLineData = this.classLineData
      }

    },
    getOriginData(){
      getAbility(this.$store.state.typeId).then(res =>{
        this.studentConf = res.student
        this.classConf = res.class
        this.chartsData = res.classGradeChart
        this.classChart = res.classGradeChart
        this.gradeChart = res.GradeGradeChart
        this.veBarData = res.veBarData
        this.userLineData = res.classLineData
        this.classLineData = res.classLineData
        this.gradeLineData = res.gradeLineData
      }).catch(error => {
        console.log(error)
      })
    }
  }

}
</script>
<style>
  .divCard1{
    margin-top: 10px;
    background-color: rgba(0, 255, 250, 0.26);
  }
  .conf{
    border: 5px solid;
    border-radius: 10%;border-image: linear-gradient(to right,#ff831c, #0ceebb) 20 20;
    background: rgba(255, 255, 255, 0.3) url("../../../../public/userFor/listBack.png") no-repeat;
    background-size: cover;
  }
  .touxiang{
    height: 200px;width: 200px;border-radius: 50%;background: linear-gradient(to right,#ff478e,#2fff2e);


  }
  .confs{
    border: 5px solid;
    border-radius: 10%;border-image: linear-gradient(to left,#ff831c, #0ceebb) 20 20;
    background: rgba(255, 255, 255, 0.3) url("../../../../public/userFor/listBack.png");
  }
  .leidatu{
    border: 5px solid;
    border-radius: 10%;border-image: linear-gradient(to left,#ff831c, #0ceebb) 20 20;
    background: rgba(255, 255, 255, 0.3) url("../../../../public/userFor/leidabeijing1.png");
  }
  .xuexiaobeijing{
    border: 5px solid;
    border-radius: 10%;border-image: linear-gradient(to left,#ff831c, #0ceebb) 20 20;
    background: rgba(255, 255, 255, 0.3) url("../../../../public/userFor/xuexiaobeijing.png");
  }
  .conf-key{
    /*width: 300px;*/
    /*height: 200px;*/
    background-image: -webkit-linear-gradient(left, #1c006f, #d5df13 10%, #bb6a03 20%, #37001e 30%, #1b001d 40%, #1a000a 50%,#191a00 60%,#051600 70%,#1b001d 80%,#1a000a 90%,#191a00 100%);
    -webkit-text-fill-color: transparent;/* 将字体设置成透明色 */
    -webkit-background-clip: text;/* 裁剪背景图，使文字作为裁剪区域向外裁剪 */
    -webkit-background-size: 200% 100%;
    -webkit-animation: masked-animation 60s linear infinite;
    font-size: 20px;
    display: inline-block;
    border-bottom: 1px dotted grey;
    height: 25px;
    font-weight: 800;

  }
  .conf-value{

    background-image: -webkit-linear-gradient(left, #1c006f, #d5df13 10%, #bb6a03 20%, #37001e 30%, #1b001d 40%, #1a000a 50%,#191a00 60%,#051600 70%,#1b001d 80%,#1a000a 90%,#191a00 100%);
    -webkit-text-fill-color: transparent;/* 将字体设置成透明色 */
    -webkit-background-clip: text;/* 裁剪背景图，使文字作为裁剪区域向外裁剪 */
    -webkit-background-size: 200% 100%;
    -webkit-animation: masked-animation1 60s linear infinite;
    font-size: 20px;  height: 25px;
    display: inline-block;
    font-weight: 800;
  }

  @keyframes masked-animation {
    0% {
      background-position: 0  0;
    }
    50% {
      background-position: -100%  0;
    }
    100% {
      background-position: 0%  0;
    }
  }
  @keyframes masked-animation1 {
    0% {
      background-position: -100%  0;
    }
    50% {
      background-position: 0%  0;
    }
    100% {
      background-position: -100%  0;
    }
  }

  .text-reflect-base{
    color: #001a03;
    -webkit-box-reflect:below 10px;
  }
</style>
