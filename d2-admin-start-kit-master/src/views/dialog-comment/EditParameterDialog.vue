<template>
  <el-dialog
    title="请确认参数"
    :visible.sync="dialogVisible"
    width=" 70%"
    :before-close="handleClose">
    <el-table :data="params"
              style="width: 100%">
      <el-table-column label="参数id"
      width="30" prop="pragramId">
      </el-table-column>
      <el-table-column label="任务id"
                       width="30" prop="missionId">
      </el-table-column>
      <el-table-column label="行动id"
                       width="30" prop="actionId">
      </el-table-column>
      <el-table-column
      label="参数类型" width="40" prop="pragramType">
      </el-table-column>
      <el-table-column
        label="参数别名" width="180" prop="programContent">
      </el-table-column>
      <el-table-column
        label="参数值" width="180" prop="pragramValue">
      </el-table-column>
      <el-table-column
        label="参数值" width="180" prop="pragramValue">
      </el-table-column>
    </el-table>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="outPutData">确 定</el-button>
  </span>
  </el-dialog>
  <pragram-dialog ref="paramsDialog" @func="backParams"></pragram-dialog>
</template>

<script>
import {JsoupPragram} from "../model/missionAllPojo";
import {getAllParameters, updateParameters} from "../netWork/apiMethod";
import pragramDialog from "./pragramDialog";

export default {
  name: "desComment",
  components: {
    pragramDialog
  },
  data() {
    return{
      params: [new JsoupPragram()],
      maId: null,
      dialogVisible: false,
    }
  },
  methods: {
    backParams(data) {
       this.updateParameterInit(data)
    },
    updateParameterInit(data) {
      for (let i = 0; i < this.params.length; i++) {
        if (this.params[i].pragramId == data.pragramId) {
          this.params[i] = data
        }
      }
    },
    getScriptParameters () {
      getAllParameters(this.maId).then(
        res => {
          if (res.code == "success") {
            this.params = res.list
          }
        }
      )
    },
    outPutData() {
      this.$emit('func',this.params)
      this.dialogVisible = false
    },
    //初始化详细信息模块
    initDesData: function (data) {
      //   处理des 并将入参 初始化
      if (data == null) {
        return
      }
      this.maId = data
      this.getScriptParameters()
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
