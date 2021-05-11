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
