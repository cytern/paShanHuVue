<template>
  <d2-container>
    <template slot="header">
      <el-button type="text" disabled>我的脚本</el-button>
    </template>
    <el-table :data="missionDatas" border style="width: 100%">
      <el-table-column label="脚本名称" width="180">
        <template slot-scope="scope">
          <i class="el-icon-cpu"></i>
          <span style="margin-left: 10px">{{
            scope.row.jsoupMissionAll.maName
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="脚本详细" width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>用途: {{ scope.row.jsoupMissionAll.maTip }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium" class="inlineDes">{{
                scope.row.jsoupMissionAll.maTip
              }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="起始地址" width="360">
        <template slot-scope="scope">
          <i class="el-icon-position"></i>
          <span style="margin-left: 10px">{{
            scope.row.jsoupMissionAll.malStartUrl
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结果集名称" width="250">
        <template slot-scope="scope">
          <i class="el-icon-chat-line-square"></i>
          <span style="margin-left: 10px">{{
            scope.row.jsoupMissionAll.maSuccessFileName
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            @click="sendRun(scope.$index, scope.row)"
            >执行</el-button
          >
          <el-button
            size="mini"
            style="background-color: #0ceebb"
            @click="sendTimeTask(scope.$index, scope.row)"
          >定时</el-button
          >
          <template v-if="scope.row.isOwner == 1">
            <!-- 上架中的脚本不允许编辑 -->
            <el-button
              v-if="scope.row.jsoupMissionAll.maState != 2"
              size="mini"
              type="warning"
              @click="sendEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <!-- 市场化操作 -->
            <el-button
              size="mini"
              type="primary"
              @click="sendShop(scope.row.jsoupMissionAll)"
              >市场化</el-button
            >
            <!-- <el-select v-model="scope.row.jsoupMissionAll.maState" placeholder="状态" style="width:40%;margin-left:5px" @change="changeMaState(scope.row.jsoupMissionAll)" :disabled="scope.row.jsoupMissionAll.maState == 2">
              <el-option label="编辑中" :value='0'></el-option>
                       <el-option label="上架中" :value='2'></el-option>
            </el-select> -->
          </template>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 目前是简单分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="pageNum"
      :current-page="index"
      @current-change="reflashPage"
    >
    </el-pagination>

    <el-dialog
      title="市场化设置"
      :visible.sync="shopDia"
      :before-close="handleClose"
    >
      <el-form :model="tempMa">
        <el-form-item label="价格" label-width="120px">
          <el-input v-model="tempMa.maPrice"></el-input>
        </el-form-item>
        <el-form-item label="上架情况" label-width="120px">
          <el-select
            v-model="tempMa.maState"
            placeholder="状态"
            :disabled="tempMa.maState == 2"
          >
            <el-option label="编辑中" :value="0"></el-option>
            <el-option label="上架中" :value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDia">取 消</el-button>
        <el-button type="primary" @click="sendChange">确 定</el-button>
      </div>
    </el-dialog>
    <time-corn-dialog ref="timeCornDialog" @func="backData"></time-corn-dialog>
  </d2-container>
</template>

<script>
import leidatu from "../../echart-comment/leidatu";
import leidatu2 from "../../echart-comment/leidatu2";
import leidatu3 from "../../echart-comment/leidatu3";
import {
  getAllScript,
  sendJsoupMission,
  setMissionAllState,
  addTimeTaskMission,
} from "../../netWork/apiMethod";
import { JsoupMissionAll, MissionAllData} from "../../model/missionAllPojo";
import {TimeTask} from "../../model/timeTaskVo";
import TimeCornDialog from "../../dialog-comment/timeCornDialog";
export default {
  name: "studentCharts",
  components: {
    TimeCornDialog,
    leidatu,
    leidatu2,
    leidatu3,
  },
  data: function () {
    return {
      missionDatas: [new MissionAllData()],
      pageSize: 10,
      index: 1,
      pageNum: 0,
      shopDia: false,
      tempMa: new JsoupMissionAll(),
      timeTask: new TimeTask(),
      tempMaId: null,
    };
  },
  mounted() {
    this.getOriginData();
  },
  methods: {
    sendTimeTask (index, row) {
      this.tempMaId = row.jsoupMissionAll.maId
      this.$refs.timeCornDialog.initTimeData(this.timeTask)
},
    backData ( timeTask) {
      if (timeTask.times == null){
          timeTask.times = -1
      }
      this.timeTask = timeTask
      addTimeTaskMission(this.tempMaId,timeTask.times,timeTask.corn).then(
        res => {
          if (res.code == "success") {
            this.$message.success(res.msg)
          }
        }
      )
    },
    reflashPage(currentPage) {
      this.index = currentPage;
      this.getMyScript();
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    closeDia() {
      this.tempMa = JsoupMissionAll();
      this.shopDia = false;
    },
    /**
     * 修改脚本
     */
    sendEdit(index, item) {
      let id = item.jsoupMissionAll.maId;
      this.$store.state.maId = id;
      this.$router.push({
        path: `/myEditScript`,
      });
    },
    /**
     * 发送脚本
     */
    sendRun(index, item) {
      let maId = item.jsoupMissionAll.maId;
      this.$notify({
        title: "提示",
        message: "发送执行成功，请耐心等待",
        duration: 0,
      });
      sendJsoupMission(maId).then((res) => {
        if (res.code == "success") {
          this.$router.push("myReason")
        }
      });
    },

    sendShop(ma) {
      this.tempMa = ma;
      this.shopDia = true;
    },
    //将脚本的变化状态 设置出去
    sendChange() {
      if (this.tempMa.maState == 2 && this.tempMa.maPrice == null) {
        this.$message({
          type: "warning",
          message: "上架时价格不能为0",
        });
      } else {
        this.changeMaState(this.tempMa);
      }
    },
    /**
     * 变化脚本状态
     */
    changeMaState(jsoupMissionAll) {
      if (jsoupMissionAll.maState == 2) {
        this.$confirm("上架后将无法再编辑修改脚本，是否继续?", "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            setMissionAllState(jsoupMissionAll).then((res) => {
              if (res.code == "success") {
                this.tempMa = JsoupMissionAll();
                this.shopDia = false;
                this.getMyScript();
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消上架",
            });
            jsoupMissionAll.maState = 0;
          });
      }
    },
    /**
     * 获取我的脚本
     */
    getMyScript() {
      getAllScript(this.pageSize, this.index).then((res) => {
        this.missionDatas = res.missionData;
        this.pageNum = res.pageNum;
      });
    },
    getOriginData() {
      this.getMyScript();
    },
  },
};
</script>
<style>
</style>
