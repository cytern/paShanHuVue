<template>
  <d2-container class="page">
    <template slot="header">
      <el-button type="text" disabled>管理界面</el-button>
    </template>
    <!--    首先是三个大标签 分别是脚本数量  数据数量  自身等级 -->
    <el-row :gutter="30">
      <!--      脚本数量 -->
      <el-col :span="8">
        <div @click="showUser">
          <el-card style="width: 100%" class="card-button" >
            用户管理
          </el-card>
        </div>
      </el-col>
      <el-col :span="8">
        <div @click="showScript">
          <el-card style="width: 100%" class="card-button">
            脚本管理
          </el-card>
        </div>
      </el-col>
      <el-col :span="8">
        <div @click="showData">
          <el-card style="width: 100%" class="card-button">
            数据管理
          </el-card>
        </div>
      </el-col>
      <el-col :span="8">
        <div @click="showComplaint">
          <el-card style="width: 100%" class="card-button">
            投诉管理
          </el-card>
        </div>
      </el-col>
    </el-row>

    <!--    两个栏目 一个是待执行任务和定时任务 一个是自己的执行器-->
    <el-row  style="margin-bottom: 50px" :gutter="50">
      <el-col :span="12">
        <el-card style="width: 100%">
          <div slot="header" class="clearfix">
            <span>待执行任务列表</span>
              </div>
          <el-table
            :data="historyList"
            height="250"
            border
            style="width: 100%">
            <el-table-column
              prop="missionAllHistoryId"
              label="id"
              width="20">
            </el-table-column>
            <el-table-column
              prop="sentTime"
              label="发送时间"
              width="40">
            </el-table-column>
            <el-table-column
              label="完成状态"
              width="40">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.missionState=='0'">异常</el-tag>
                <el-tag v-if="scope.row.missionState=='1'">排队中</el-tag>
                <el-tag v-if="scope.row.missionState=='2'">执行中</el-tag>
                <el-tag v-if="scope.row.missionState=='3'">执行完成</el-tag>
                <el-tag v-if="scope.row.missionState=='4'">执行失败</el-tag>
                <el-tag v-if="scope.row.missionState=='5'">定时任务</el-tag>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div slot="header" class="clearfix">
            <span>执行器列表</span>
          </div>
          <el-table
            :data="executorList"
            height="250"
            border
            style="width: 100%">
            <el-table-column
              prop="id"
              label="id"
              width="20">
            </el-table-column>
            <el-table-column
              prop="userId"
              label="userId"
              width="20">
            </el-table-column>
            <el-table-column
              prop="excutorTimes"
              label="执行次数"
              width="20">
            </el-table-column>
            <el-table-column
              label="状态"
              width="20">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.status == 0">离线</el-tag>
                <el-tag v-if="scope.row.status == 1">存活</el-tag>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <user-manage-dialog ref="uDia"></user-manage-dialog>
    <DataManageDialog ref="dDia"></DataManageDialog>
    <ComplaintManageDialog ref="avvDia"></ComplaintManageDialog>
    <ScriptManageDialog ref="sDia"></ScriptManageDialog>
  </d2-container>
</template>

<script>
import UserManageDialog from "@/views/dialog-comment/manageDialog/UserManageDialog";
import ScriptManageDialog from "@/views/dialog-comment/manageDialog/ScriptManageDialog";
import DataManageDialog from "@/views/dialog-comment/manageDialog/DataManageDialog";
import ComplaintManageDialog from "@/views/dialog-comment/manageDialog/ComplaintManageDialog";
import {JsoupExecutorVo} from "../../model/JsoupExecutorVo";
import {JsoupMissionAllHistory} from "../../model/missionHistoryPojo";
import {
  getAllWaitToDoTask,
  getArticleList,
  getEveryOneExecutor,
  getOneHistory,
  getOnesExecutor,
  getUserData
} from "../../netWork/apiMethod";
import {UserVo} from "../../model/userPojo";
import {ArticleSearchVo, ArticleTitleListVo} from "../../model/ArticleSearchVo";
export default {
  components: {
    UserManageDialog,
    ScriptManageDialog,
    DataManageDialog,
    ComplaintManageDialog
  },
  data() {
    return {
      executorList: [new JsoupExecutorVo()],
      historyList:[new JsoupMissionAllHistory()],
      userVo: new UserVo(),
    }
  },
  mounted() {
    this.getOriginData()
  },
  methods: {
    reflashPage(currentPage) {
      this.aIndex = currentPage;
      this.getOriginData();
    },
    showUser() {
      this.$refs.uDia.initData()
    },
    showScript() {
      this.$refs.sDia.initData()
    },
    showData() {
      this.$refs.dDia.initData()
    },
    showComplaint() {
      this.$refs.avvDia.initData()
    },
    getOriginData() {

      getUserData().then(
        res=> {
          if (res.code == "success") {
            this.userVo = res.userVo
          }

        }
      )

      getEveryOneExecutor().then(
        res=> {
          if (res.code == "success") {
            this.executorList = res.list
          }
        }
      )

      getAllWaitToDoTask().then(
        res=> {

            this.historyList = res.list

        }
      )
    }
  }

}
</script>

<style lang="scss" scoped>
.card-button {
  height: 150px;
  margin-bottom: 50px;
  line-height: 100px;
  text-align: center;
}
</style>
