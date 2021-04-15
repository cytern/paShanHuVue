<template>
  <el-dialog
    title="编辑详情"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose">
   <el-form>
     <el-row :gutter="20">
       <el-col :span="12">
     <el-form-item label="操作网站">
      <el-input v-model="tempWorkFor" aria-placeholder="说明操作的具体网站,比如 百度权重,淘宝网等"></el-input>
     </el-form-item>
       </el-col>
       <el-col :span="12">
         <el-form-item  label="操作类型">
           <el-select  v-model="tempSelectType">
             <el-option value="操作页面脚本" label="操作页面脚本"></el-option>
             <el-option value="爬取数据脚本" label="爬取数据脚本"></el-option>
             <el-option value="复合脚本" label="复合脚本"></el-option>
           </el-select>
         </el-form-item>
       </el-col>
     </el-row>
     <el-row v-if="tempSelectType != '操作页面脚本' " :gutter="20">
       <el-col :span="12">
         <el-form-item label="爬取内容特征">
           <el-input type="textarea" v-model="tempWorkFeatures" aria-placeholder="说明爬取的内容的特征,比如 近一年,vip用户,学生,若无则填无"></el-input>
         </el-form-item>
       </el-col>
       <el-col :span="12">
         <el-form-item label="爬取内容">
           <el-input type="textarea" v-model="tempWorkData" aria-placeholder="说明爬取的数据内容,比如性别,年龄,销售量等,若无则填无"></el-input>
         </el-form-item>
       </el-col>
     </el-row>
     <el-row v-if="tempSelectType !='爬取数据脚本'" :gutter="20">
       <el-col :span="12">
           <el-form-item label="操作内容">
             <el-input type="textarea" v-model="tempWorkAction" aria-placeholder="说明操作的页面内容,比如个人信息填写,问卷调查提交"></el-input>
           </el-form-item>
       </el-col>
       <el-col :span="12">
         <el-form-item label="操作特征">
           <el-input type="textarea" v-model="tempWorkActionFeatures" aria-placeholder="说明操作的页面特征,关于**的问卷调查,对于**的信息填写"></el-input>
         </el-form-item>
       </el-col>
     </el-row>
   </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="outPutData">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
export default {
  name: "desComment",
  data() {
    return{
      tempWorkFor: null,
      tempWorkData: null,
      tempWorkFeatures:null,
      tempSelectType : null,
      tempWorkAction:null,
      tempWorkActionFeatures: null,
      tempDes : null,
      dialogVisible: false,
    }
  },
  methods: {
    outPutData() {
      this.changeInput()
      this.$emit('func',this.tempDes)
      this.dialogVisible = false
    },
    //初始化详细信息模块
    initDesData: function (des) {
      //   处理des 并将入参 初始化
      if (des == null) {
        this.dialogVisible = true
        return
      }
      let desList =  des.split("<br/>")
      for (let i = 0; i < desList.length; i++) {
        if (desList[i].includes("操作网站:")) {
          this.tempWorkFor = desList[i].replaceAll('操作网站:','')

        }
        else if (desList[i].includes("类型:")){
          this.tempSelectType = desList[i].replaceAll('操作类型:','')

        }
        else if (desList[i].includes("爬取内容特征:")){
          this.tempWorkFeatures = desList[i].replaceAll('爬取内容特征:','')

        }
        else if (desList[i].includes("爬取内容:")){
          this.tempWorkData = desList[i].replaceAll('爬取内容:','')

        }
        else if (desList[i].includes("操作内容:")){
          this.tempWorkAction = desList[i].replaceAll('操作内容:','')

        }
        else if (desList[i].includes("操作特征:")){
          this.tempWorkActionFeatures = desList[i].replaceAll('操作特征:','')

        }
      }
      this.dialogVisible = true
    },
    changeInput () {
      let str = '';
      if (this.tempWorkFor != null) {
        str = str + "操作网站:" + this.tempWorkFor + "<br/>"
      }
      if (this.tempSelectType != null) {
        str = str + "操作类型:" + this.tempSelectType + "<br/>"
      } if (this.tempWorkFeatures != null && this.tempWorkFeatures != '') {
        str = str + "爬取内容特征:" + this.tempWorkFeatures + "<br/>"
      } if (this.tempWorkData != null && this.tempWorkData != '') {
        str = str + "爬取内容:" + this.tempWorkData + "<br/>"
      } if (this.tempWorkAction != null) {
        str = str + "操作内容:" + this.tempWorkAction + "<br/>"
      } if (this.tempWorkActionFeatures != null) {
        str = str + "操作特征:" + this.tempWorkActionFeatures + "<br/>"
      }
      this.tempDes = str
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },

  }
}
</script>

<style scoped>

</style>
