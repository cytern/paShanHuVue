<template>
  <el-dialog
    title="发起定时任务"
    :visible.sync="dialogVisible"
    width="80%"
    :before-close="handleClose">
     <el-form>
       <el-form-item label="循环类型">
         <el-select v-model="eachType">
            <el-option label="永远" :value=1></el-option>
            <el-option label="次数" :value=2></el-option>
         </el-select>
       </el-form-item>
       <el-form-item v-if="eachType == 2" label="循环次数">
         <el-input style="width: 30%" v-model="timeTask.times"></el-input>
       </el-form-item>
       <el-form-item label="快速选择周期" >
         <el-select v-model="timeTask.corn">
           <el-option v-for="(item ,index) in quickSelect" :key="index" :value="item.value" :label="item.name"></el-option>
         </el-select>
       </el-form-item>
       <el-form-item label="定时任务选择盘">
       <cron v-model="timeTask.corn"></cron>
       </el-form-item>
     </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="outPutData">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
import {TimeTask} from "../model/timeTaskVo";
import cron from "./cron";
import {CronSelectType} from "../model/cronSelectType";
export default {
  name: "timeCornDialog",
  components: {
    cron
  },
  data () {
    return {
       timeTask: new TimeTask(),
       eachType: null,
      dialogVisible: false,
      quickSelect:new CronSelectType()
    }
  },
  methods: {
    outPutData() {
      this.$emit('func',this.timeTask)
      this.dialogVisible = false
    },
    change(cron) {
      this.timeTask.corn = cron
    },
    reset(cron) {
      this.timeTask.corn = DEFAULT_CRON_EXPRESSION
    },
    initTimeData (timeTask) {
      this.timeTask = timeTask
      if (timeTask.times <0) {
        this.eachType = 1
      }else {
        this.eachType = 2
      }
      this.dialogVisible = true
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
