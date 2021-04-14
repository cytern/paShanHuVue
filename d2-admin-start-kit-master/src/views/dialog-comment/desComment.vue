<template>
   <el-form>
     <el-row :gutter="20">
       <el-col :span="12">
     <el-form-item label="操作网站">
      <el-input v-model="tempWorkFor" aria-placeholder="说明操作的具体网站,比如 百度权重,淘宝网等"></el-input>
     </el-form-item>
       </el-col>
       <el-col :span="20">
         <el-form-item v-model="tempSelectType" label="操作类型">
           <el-select >
             <el-option value="1">操作页面脚本</el-option>
             <el-option value="2">爬取数据脚本</el-option>
             <el-option value="3">复合脚本</el-option>
           </el-select>
         </el-form-item>
       </el-col>
     </el-row>
     <el-row v-if="tempSelectType != '1' " :gutter="20">
       <el-col :span="12">
         <el-form-item label="爬取内容特征">
           <el-input v-model="tempWorkFeatures" aria-placeholder="说明爬取的内容的特征,比如 近一年,vip用户,学生,若无则填无"></el-input>
         </el-form-item>
       </el-col>
       <el-col :span="12">
         <el-form-item label="爬取内容">
           <el-input v-model="tempWorkData" aria-placeholder="说明爬取的数据内容,比如性别,年龄,销售量等,若无则填无"></el-input>
         </el-form-item>
       </el-col>
     </el-row>
     <el-row v-if="tempSelectType !='2'">
       <el-col :span="12">
           <el-form-item label="操作内容">
             <el-input v-model="tempWorkData" aria-placeholder="说明操作的页面内容,比如个人信息填写,问卷调查提交"></el-input>
           </el-form-item>
       </el-col>
       <el-col :span="12">
         <el-form-item label="操作特征">
           <el-input v-model="tempWorkFeatures" aria-placeholder="说明操作的页面特征,关于**的问卷调查,对于**的信息填写"></el-input>
         </el-form-item>
       </el-col>
     </el-row>
     <el-row :gutter="20">
       <el-col :span="12">
         <el-form-item label="对象网站">
           <el-input v-model="tempWorkFor" aria-placeholder="操作的对象网站网址,比如 淘宝网,人人网等"></el-input>
         </el-form-item>
       </el-col>
     </el-row>
   </el-form>
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
    }
  }
}
</script>

<style scoped>

</style>
