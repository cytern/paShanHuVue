<template>
  <d2-container>
    <template slot="header">
      <el-button type="text" disabled>我的结果</el-button>
    </template>
    <el-table :data="missionHistorys" border style="width: 100%"
              :row-class-name="tableRowClassName"
    >
      <el-table-column label="数据名称" width="180">
        <template slot-scope="scope">
          <i class="el-icon-cpu"></i>
          <span style="margin-left: 10px">{{ scope.row.missionAllName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="数据详细" width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>用途: {{ scope.row.missionAllDis }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium" class="inlineDes">{{ scope.row.missionAllDis }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="发送时间" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.sentTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束时间" width="180">
        <template v-if="scope.row.missionState==='5'" slot-scope="scope">
          <span style="margin-left: 10px">
            剩余次数:{{scope.row.timeNum <0 ?'无限循环':scope.row.timeNum}}
          </span>
        </template>
        <template v-else slot-scope="scope">
          <span style="margin-left: 10px">{{
              scope.row.finishTime == null ? "未完成" : scope.row.finishTime
            }}</span>
        </template>
      </el-table-column>
      <el-table-column label="目前状态" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">
            <!-- 判断执行状态 给与不同的表示-->
            <!-- 待完成 -->
            <template v-if="scope.row.missionState == '1'">
              <el-button size="mini" type="info"
                >等待开始中
                <i class="el-icon-loading"></i>
              </el-button>
            </template>
            <!-- 正在执行中 -->
            <template v-if="scope.row.missionState == '2'">
              <el-button size="mini" type="primary"
                >正在执行中
                <i class="el-icon-loading"></i>
              </el-button>
            </template>
            <!-- 已经执行完成 -->
            <template v-if="scope.row.missionState == '3'">
              <el-button size="mini" type="success">已经完成执行</el-button>
            </template>
            <!-- 执行失败 且标出失败原因 -->
            <template v-if="scope.row.missionState == '4'">
              <!-- <el-button
          size="mini"
          type="danger"
         >执行失败</el-button> -->
              <el-tooltip
                class="item"
                effect="dark"
                :content="scope.row.missionFailReason"
                placement="top"
              >
                <el-button size="mini" type="danger">执行失败</el-button>
              </el-tooltip>
            </template>
            <template v-if="scope.row.missionState == '5'">
              定时任务生效中
            </template>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- 根据状态结果 展示下载结果集 和 取消任务两个按钮 -->
          <template v-if="scope.row.missionState == '3'">
            <el-button
              size="mini"
              type="success"
              @click="getFile(scope.$index, scope.row)"
              >下载结果集</el-button
            >
               <!-- 显示市场化按钮 设置价格和上架与否 -->
          <el-button
            size="mini"
            type="primary"
            @click="sendShop(scope.row)"
            >市场化</el-button
          >
          </template>
<!--          等待状态允许取消-->
          <template v-if="scope.row.missionState == '1'">

              <el-button
                slot="reference"
                size="mini"
                type="warning"
                @click="deleteTimeMission(scope.$index, scope.row)"
              >取消</el-button
              >
          </template>
<!--          定时任务状态允许修改-->
          <template v-if="scope.row.missionState == '5'">
            <el-button
              size="mini"
              type="primary"
              @click="updateTimeMission(scope.$index, scope.row)"
            >修改</el-button
            >
            <el-button
              slot="reference"
              size="mini"
              type="danger"
              @click="deleteTimeMission(scope.$index, scope.row)"
            >删除</el-button
            >
        </template>
        </template>
      </el-table-column>
    </el-table>
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
      <el-form :model="tempHs">
        <el-form-item label="价格" label-width="120px">
          <el-input v-model="tempHs.salePrice"></el-input>
        </el-form-item>
        <el-form-item label="上架情况" label-width="120px">
          <el-select
            v-model="tempHs.onSale"
            placeholder="状态"
            :disabled="tempHs.onSale == '2'"
          >
            <el-option label="未上架" :value="'0'"></el-option>
            <el-option label="上架中" :value="'1'"></el-option>
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
  getMyMissionHistorys,
  downloadExcel,
  setMhState,
  deleteTimeTask,
  updateTimeTask,
  addTimeTaskMission
} from "../../netWork/apiMethod";
import { JsoupMissionAllHistory } from "../../model/missionHistoryPojo";
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
  data() {
    return {
      missionHistorys: [new JsoupMissionAllHistory()],
      pageSize: 10,
      index: 1,
      pageNum: 0,
      tempHs: new JsoupMissionAllHistory(),
      shopDia: false,
      timeTask:new TimeTask(),
      tempMhId: null,
    };
  },
  mounted() {
    this.getOriginData();
  },
  methods: {
    backData ( timeTask) {
      if (timeTask.times == null){
        timeTask.times = -1
      }
      this.timeTask.times = -1
      updateTimeTask(this.tempMaId,this.timeTask.times,this.timeTask.corn).then(
        res => {
          if (res.code == "success") {
            this.$message.success(res.msg)
          }
        }
      )
      this.getOriginData()
    },
    updateTimeMission (index,row) {
      let timeTask = new TimeTask()
      timeTask.corn = row.timeCorn
      timeTask.times = row.timeNum
      this.timeTask = timeTask
     this.tempMhId = row.missionAllHistoryId
      this.$refs.timeCornDialog.initTimeData(this.timeTask)
    },
    deleteTimeMission (index,row) {
      this.$alert('您将删除此次任务?', '是否确认', {
        confirmButtonText: '确定',
        callback: action => {
          deleteTimeTask(row.missionAllHistoryId).then(
            res => {
              if (res.code == "success") {
                this.$message.success("删除成功")
              }
            }
          )
          this.getOriginData()
        }
      });

    },

    tableRowClassName ({row, rowIndex}) {
      if (row.missionState === "5") {
        return 'success-row';
      } else {
        return '';
      }

    },
    sendShop(ma) {
      this.tempHs = ma;
      this.shopDia = true;
    },
    sendChange() {
      if (this.tempHs.onSale == "1" && this.tempHs.salePrice == null) {
        this.$message({
          type: "warning",
          message: "上架时价格不能为0",
        });
      } else {
        this.changeMaState(this.tempHs);
      }
    },
     /**
     * 变化脚本状态
     */
    changeMaState(jsoupMissionAll) {
      if (jsoupMissionAll.missionState == 3&&jsoupMissionAll.onSale == 1) {
        this.$confirm("您即将上架您的数据集，是否继续?", "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            setMhState(jsoupMissionAll).then((res) => {
              if (res.code == "success") {
                this.tempHs = JsoupMissionAllHistory();
                this.shopDia = false;
                this.getOriginData();
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消上架",
            });
            jsoupMissionAll.onSale = 0;
          });
      }
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          this.shopDia = false
          done();
        })
        .catch((_) => {});
    },
    closeDia() {
      this.tempMa = JsoupMissionAll();
      this.shopDia = false;
    },
    /**
     * 下载文件
     */
    getFile(index, item) {
      let id = item.missionAllHistoryId;
      downloadExcel(id);
    },

    /**
     * 更新页面
     */
    reflashPage(currentPage) {
      this.index = currentPage;
      this.getMyHistory();
    },
    /**
     * 获取我的历史
     */
    getMyHistory() {
      getMyMissionHistorys(this.pageSize, this.index).then((res) => {
        (this.missionHistorys = res.missionHistory),
          (this.pageNum = res.pageNum);
      });
    },

    getOriginData() {
      this.getMyHistory();
    },
  },
};
</script>
<style>
.divCard1 {
  margin-top: 10px;
  background-color: rgba(0, 255, 250, 0.26);
}
.touxiang {
  height: 200px;
  width: 200px;
  border-radius: 50%;
  background: linear-gradient(to right, #ff478e, #2fff2e);
}
.confs {
  border: 5px solid;
  border-radius: 10%;
  border-image: linear-gradient(to left, #ff831c, #0ceebb) 20 20;
  background: rgba(255, 255, 255, 0.3)
    url("../../../../public/userFor/listBack.png");
}
.leidatu {
  border: 5px solid;
  border-radius: 10%;
  border-image: linear-gradient(to left, #ff831c, #0ceebb) 20 20;
  background: rgba(255, 255, 255, 0.3)
    url("../../../../public/userFor/leidabeijing1.png");
}
.xuexiaobeijing {
  border: 5px solid;
  border-radius: 10%;
  border-image: linear-gradient(to left, #ff831c, #0ceebb) 20 20;
  background: rgba(255, 255, 255, 0.3)
    url("../../../../public/userFor/xuexiaobeijing.png");
}
.conf-key {
  /*width: 300px;*/
  /*height: 200px;*/
  background-image: -webkit-linear-gradient(
    left,
    #1c006f,
    #d5df13 10%,
    #bb6a03 20%,
    #37001e 30%,
    #1b001d 40%,
    #1a000a 50%,
    #191a00 60%,
    #051600 70%,
    #1b001d 80%,
    #1a000a 90%,
    #191a00 100%
  );
  -webkit-text-fill-color: transparent; /* 将字体设置成透明色 */
  -webkit-background-clip: text; /* 裁剪背景图，使文字作为裁剪区域向外裁剪 */
  -webkit-background-size: 200% 100%;
  -webkit-animation: masked-animation 60s linear infinite;
  font-size: 20px;
  display: inline-block;
  border-bottom: 1px dotted grey;
  height: 25px;
  font-weight: 800;
}
.conf-value {
  background-image: -webkit-linear-gradient(
    left,
    #1c006f,
    #d5df13 10%,
    #bb6a03 20%,
    #37001e 30%,
    #1b001d 40%,
    #1a000a 50%,
    #191a00 60%,
    #051600 70%,
    #1b001d 80%,
    #1a000a 90%,
    #191a00 100%
  );
  -webkit-text-fill-color: transparent; /* 将字体设置成透明色 */
  -webkit-background-clip: text; /* 裁剪背景图，使文字作为裁剪区域向外裁剪 */
  -webkit-background-size: 200% 100%;
  -webkit-animation: masked-animation1 60s linear infinite;
  font-size: 20px;
  height: 25px;
  display: inline-block;
  font-weight: 800;
}

@keyframes masked-animation {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: -100% 0;
  }
  100% {
    background-position: 0% 0;
  }
}
@keyframes masked-animation1 {
  0% {
    background-position: -100% 0;
  }
  50% {
    background-position: 0% 0;
  }
  100% {
    background-position: -100% 0;
  }
}

.text-reflect-base {
  color: #001a03;
  -webkit-box-reflect: below 10px;
}
</style>
