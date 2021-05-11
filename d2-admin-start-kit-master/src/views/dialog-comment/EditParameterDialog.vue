<template>
  <el-dialog
    title="请确认参数"
    :visible.sync="dialogVisible"
    width="100%"
    :before-close="handleClose">
    <el-table :data="params"
              style="width: 100%">
      <el-table-column label="参数id"
      width="100" prop="pragramId">
      </el-table-column>
      <el-table-column label="任务id"
                       width="100" prop="missionId">
      </el-table-column>
      <el-table-column label="行动id"
                       width="100" prop="actionId">
      </el-table-column>
      <el-table-column
      label="参数类型" width="100" prop="pragramType">
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
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="outPutData">确 定</el-button>
  </span>
    <pragram-dialog ref="paramsDialog" @func="backParams"></pragram-dialog>
  </el-dialog>
</template>

<script>
import {ActionVo, JsoupPragram} from "../model/missionAllPojo";
import {getAllParameters, updateParameters} from "../netWork/apiMethod";
import pragramDialog from "./pragramDialog";

export default {
  name: "EditParameterDialog",
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
    //启动编辑脚本页面
    handleEdit (jsoup) {
      let actionVo = new ActionVo();
      actionVo.jsoupPragram = jsoup
      this.$refs.paramsDialog.initData(actionVo)
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
      this.dialogVisible = true
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
