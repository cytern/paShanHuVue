<template>
  <d2-container class="page">
       <template slot="header">
         <el-button disabled type="text">
           首页
         </el-button>
       </template>
<!--    首先是三个大标签 分别是脚本数量  数据数量  自身等级 -->
    <el-row :gutter="30">
<!--      脚本数量 -->
      <el-col :span="8">
        <div @click="gotoScriptShop">
        <el-card style="width: 100%" class="card-button" >
         脚本市场
        </el-card>
        </div>
      </el-col>
      <el-col :span="8">
        <div @click="gotoDataShop">
        <el-card style="width: 100%" class="card-button" @click="gotoDataShop">
          数据市场
        </el-card>
        </div>
      </el-col>
      <el-col :span="8">
        <div v-if="userVo.jsoupUser.userType == '1002'" @click="goToOrder">
        <el-card style="width: 100%" class="card-button">
          我的订单
        </el-card>
        </div>
        <div v-else-if="userVo.jsoupUser.userType== '1001'" @click="goToManager">
          <el-card style="width: 100%" class="card-button">
            管理端入口
          </el-card>
        </div>
      </el-col>
    </el-row>

<!--    两个栏目 一个是待执行任务和定时任务 一个是自己的执行器-->
    <el-row  style="margin-bottom: 50px" :gutter="50">
      <el-col :span="12">
        <el-card style="width: 100%">
          <div slot="header" class="clearfix">
            <span>我的执行记录</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="goToMyHis">查看详情</el-button>
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
            <span>我的执行器</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="goToMyDetail">查看详情</el-button>
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

    <el-divider></el-divider>
<!--帖子的列表-->
    <el-row :gutter="40">
      <el-col :span="24" v-for="(item , index) in articleList" :key="index">
        <div @click="goToArticleDetail(item)">
        <el-card style="width: 100%;margin-bottom: 10px;">
          <el-row :gutter="20">
            <el-col :span="20">
             <span>{{ item.title}}</span>
            </el-col>
            <el-col :span="4">
              <span>{{ item.userName}}</span>
            </el-col>
          </el-row>
        </el-card>
        </div>
      </el-col>
    </el-row>
    <el-pagination
      background
      layout="prev, next"
      :total="pageNum"
      :current-page="aIndex"
      @current-change="reflashPage"
    ></el-pagination>
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
import {getArticleList, getOneHistory, getOnesExecutor, getUserData} from "../../netWork/apiMethod";
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
     articleList: [new ArticleTitleListVo()],
      aIndex: 1,
      aPageSize:10,
      articleSearchVo: new ArticleSearchVo(),
      pageNum: 10,
    }
  },
   mounted() {
    this.getOriginData()
  },
  methods: {

    goToArticleDetail(item) {
      this.$store.state.articleId = item.id
      this.$store.state.goodDetail.ownerId = item.userId
      this.$store.state.goodDetail.type = 3
      this.$store.state.goodDetail.id = item.id

      this.$router.push("/articleDetail")
    },
    goToManager() {
      this.$router.push("/managerPage")
    },
    reflashPage(currentPage) {
      this.aIndex = currentPage;
      this.getOriginData();
    },
    goToMyDetail() {
      this.$router.push("/myInfo")
    },

    goToMyHis() {
      this.$router.push("/myReason")

    },
    goToOrder() {
      this.$router.push("/myOrder")
    },
    gotoScriptShop() {
      this.$router.push("/scriptShop")
    },
    gotoDataShop() {
      this.$router.push("/resShop")
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
      getOneHistory().then(
      res => {
        if (res.code == "success"){
          this.historyList = res.list
        }
      })

      getOnesExecutor().then(
        res => {
          if (res.code == "success") {
            this.executorList = res.list
          }
        }
      )

      getUserData().then(
        res=> {
          if (res.code == "success") {
            this.userVo = res.userVo
          }

        }
      ),
        getArticleList(this.aPageSize,this.aIndex,this.articleSearchVo).then(
          res=> {
           if (res.code == "success") {
             this.articleList = res.list
             if (res.list != null && res.list.length >9) {
               this.pageNum = 10*this.aIndex +1
             }else {
               this.pageNum = 10*this.aIndex
             }
           }
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

.page {
  .logo {
    width: 120px;
  }
  .btn-group {
    color: $color-text-placehoder;
    font-size: 12px;
    line-height: 12px;
    margin-top: 0px;
    margin-bottom: 20px;
    .btn-group__btn {
      color: $color-text-sub;
      &:hover {
        color: $color-text-main;
      }
      &.btn-group__btn--link {
        color: $color-primary;
      }
    }
  }
}
</style>
