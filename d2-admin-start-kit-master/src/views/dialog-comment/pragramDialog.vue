<template>

<el-dialog
  title="编辑参数"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <el-form ref="form" :model="tempPragram" label-width="80px">
    <el-form-item label="绑定行动">
      <el-select v-model="tempPragram.actionId" placeholder="请选择行动">
        <el-option
          v-for="(item, index) in actionList"
          :key="index"
          :label="item.actionName"
          :value="item.actionId"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="数据类型">
      <el-select v-model="tempPragram.pragramType" placeholder="请选择类型">
        <el-option
          v-for="(item, index) in pragramTypes"
          :key="index"
          :label="item.name"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <!-- 如果是随机数属性 则进入随机数判定 -->
    <template
      v-if="
        tempPragram.pragramType == 'decimal' ||
        tempPragram.pragramType == 'int' ||
        tempPragram.pragramType == 'date'
      "
    >
      <el-form-item label="是否随机">
        <el-select v-model="tempPragram.isRamdom" placeholder="请选择">
          <el-option label="是" value="1"></el-option>
          <el-option label="否" value="0"></el-option>
        </el-select>
      </el-form-item>
      <!-- 如果不是日期属性 则使用两个框 -->
      <el-form-item
        v-if="tempPragram.isRamdom == 1 && tempPragram.pragramType != 'date'"
        lable="上下数值区间"
      >
      <el-col :span="11">
      <el-form-item >
          <el-input
            placeholder="请输入下区间"
            @change="makeSureData"
            v-model="tempPragram.downNum"
            clearable
          >
          </el-input>
      </el-form-item>
    </el-col>
    <el-col class="line" :span="2">-</el-col>
    <el-col :span="11">
      <el-form-item prop="date2">
          <el-input
            placeholder="请输入上区间"
            @change="makeSureData"
            v-model="tempPragram.upNum"
            clearable
          >
          </el-input>
      </el-form-item>
    </el-col>
      </el-form-item>
      <!-- 如果是日期属性 则使用日期选择器 -->
      <el-form-item
        v-if="tempPragram.isRamdom == 1 && tempPragram.pragramType == 'date'"
        label="上下数值区间"
      >
        <el-col :span="11">
          <el-date-picker
            v-model="tempPragram.downNum"
            @change="makeSureData"
            type="datetime"
            placeholder="选择起始日期时间"
          >
          </el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col>
          <el-date-picker
            v-model="tempPragram.upNum"
            @change="makeSureData"
            type="datetime"
            placeholder="选择结束日期时间"
          >
          </el-date-picker>
        </el-col>
      </el-form-item>
    </template>
     <el-form-item label="小数长度" v-if="tempPragram.pragramType == 'decimal'">
     <el-input v-model="tempPragram.pragramAccuracy" placeholder="请输入小数位数"></el-input>
    </el-form-item>
  <el-form-item label="数据别名">
     <el-input v-model="tempPragram.programContent" placeholder="请输入数据别名"></el-input>
    </el-form-item>
      <el-form-item label="值">
     <el-input v-model="tempPragram.pragramValue" placeholder="请输入值"></el-input>
    </el-form-item>
  </el-form>
   <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="outPutData">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
import accRule from "../model/rules";
import praType from "../model/pragramTypes";
export default {
  name: "dialogComment",
  mounted() {},
  props: {},
  data() {
    return {
      rules: accRule,
      tempPragram: {
        pragramId: null,
        missionId: null,
        actionId: null,
        pragramType: null,
        pragramAccuracy: null,
        isRamdom: null,
        upNum: null,
        downNum: null,
        pragramValue: null,
        missionAllId: null,
        programContent: null,
      },
      actionList: [],
      pragramTypes: praType,
      dialogVisible: false,
    };
  },
  computed: {},
  methods: {
      /**
       * 父组件初始化数据给子组件
       */
      initData (tempPragram ,actionList) {
             this.tempPragram  =tempPragram
             this.actionList = actionList
             this.dialogVisible = true
      },
      /**
       * 将数据传递给父组件
       */
     outPutData() {
         this.$emit('func',this.tempPragram)
         this.dialogVisible = false
     },     
      /**
       * 坚定数据是否符合大小依赖
       */
    makeSureData() {
      let tempData = 0;
      if (this.tempPragram.upNum < this.tempPragram.downNum) {
        tempData = this.tempPragram.upNum;
        this.tempPragram.upNum = this.tempPragram.downNum;
        this.tempPragram.downNum = tempData;
        this.$message({
          message: "上下区间数值对照相反，已自动重新调整",
          type: "warning",
        });
      }
    },

      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
  },
};
</script>

<style scoped>
</style>
