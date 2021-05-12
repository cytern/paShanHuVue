<template>
  <d2-container class="page">
       <template slot="header">
         <el-button @click="showUser">
           用户管理
         </el-button>
         <el-button @click="showScript">
           脚本管理
         </el-button>
         <el-button @click="showData">
           数据管理
         </el-button>
         <el-button @click="showComplaint">
           投诉管理
         </el-button>
       </template>
<!--    首先是三个大标签 分别是脚本数量  数据数量  自身等级 -->
    <el-row :gutter="30">
<!--      脚本数量 -->
      <el-col :span="8">
        <el-card style="width: 100%" class="box-card">
         脚本市场
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card style="width: 100%" class="box-card">
          数据市场
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card style="width: 100%" class="box-card">
          签到
        </el-card>
      </el-col>
    </el-row>

<!--    两个栏目 一个是待执行任务和定时任务 一个是自己的执行器-->
    <el-row :gutter="50">
      <el-col :span="12">
        <el-table
          :data="tableData"
          height="250"
          border
          style="width: 100%">
          <el-table-column
            prop="date"
            label="待执行任务"
            width="180">
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="12">
        <el-table
          :data="tableData"
          height="250"
          border
          style="width: 100%">
          <el-table-column
            prop="date"
            label="我的执行器"
            width="180">
          </el-table-column>
        </el-table>
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
export default {
  components: {
      UserManageDialog,
    ScriptManageDialog,
    DataManageDialog,
    ComplaintManageDialog
  },
  data() {
    return {

    }
  },
   mounted() {

  },
  methods: {
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
    }
  }

}
</script>

<style lang="scss" scoped>
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
