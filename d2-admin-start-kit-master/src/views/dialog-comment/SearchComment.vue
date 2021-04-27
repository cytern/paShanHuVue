<template>
  <el-form>
<el-row :gutter="20">
  <el-col :span="5">
      <el-form-item label="名称" >
        <el-input class="formWidth" v-model="searchVo.name"></el-input>
      </el-form-item>
  </el-col>
  <el-col :span="5">
    <el-form-item label="标签" >
      <el-input class="formWidth" v-model="searchVo.tip"></el-input>
    </el-form-item>
  </el-col>
  <el-col :span="5">
    <el-form-item label="id">
      <el-input class="formWidth" v-model="searchVo.id"></el-input>
    </el-form-item>
  </el-col>
  <el-col :span="3">
      <el-button type="primary" @click="setDownloadSort">下载量排序</el-button>
  </el-col>
  <el-col :span="3">
      <el-button type="primary" @click="setRateSort" >评价排序</el-button>
  </el-col>
  <el-col :span="3">
    <el-button type="primary" @click="sendData" >确定</el-button>
  </el-col>
</el-row>
  </el-form>
</template>

<script>
import {SearchGoodVo} from "../model/searchGoodVo";

export default {
  name: "SearchComment.vue",
  data() {
    return{
      searchVo:new SearchGoodVo()
    }
  },
  methods: {
      initSearchData(searchData) {
        this.searchVo = searchData
      },
      setDownloadSort () {
         if (this.searchVo.sortByDownload === 1) {
           this.searchVo.sortByDownload = 0;
         }else {
           this.searchVo.sortByDownload = 1
         }
      },
     setRateSort () {
         if (this.searchVo.sortByRate === 1) {
           this.searchVo.sortByRate = 0
         }else {
           this.searchVo.sortByRate = 1
         }
     },
    sendData () {
      this.$emit('func',this.searchVo)
    }
  }
}
</script>

<style scoped>
   .formWidth {
     width: 50%;
   }
</style>
