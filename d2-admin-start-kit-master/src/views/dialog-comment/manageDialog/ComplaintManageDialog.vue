<template>
  <el-dialog
    title="投诉管理"
    :visible.sync="dialogVisible"
    width="100%"
    :before-close="handleClose">
    <el-table :data="list"
              style="width: 100%"
    border>
      <el-table-column label="id"
                       width="100" prop="id">
      </el-table-column>
      <el-table-column label="类型"
                       width="100" prop="typeId">
      </el-table-column>
      <el-table-column label="关联id"
                       width="100" prop="connectId">
      </el-table-column>
      <el-table-column label="用户id"
                       width="100" prop="userId">
      </el-table-column>
      <el-table-column label="发送时间"
                       width="100" prop="sentTime">
      </el-table-column>
      <el-table-column label="更新时间"
                       width="100" prop="updateTime">
      </el-table-column>
      <el-table-column
        label="投诉类型" width="180">
        <template slot-scope="scope">
          <el-input v-model="scope.row.desType"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        label="投诉详情" width="180">
        <template slot-scope="scope">
          <el-input v-model="scope.row.des"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        label="受理状态" width="180">
        <template slot-scope="scope">
          <el-input v-model="scope.row.status"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row)">确定</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, next"
      :total="pageNum"
      :current-page="index"
      @current-change="reflashPage"
    >
    </el-pagination>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="outPutData">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
import {managerMethod} from "@/views/netWork/apiMethod";
import ManagerType from "@/views/model/ManagerType";
import {ComplaintVo} from "@/views/model/ComplaintVo";

export default {
  name: "ComplaintManagerDialog",
  components: {

  },
  data() {
    return{
      list: [new ComplaintVo()],
      dialogVisible: false,
      index: 1,
      pageSize:10,
      pageNum: 10,
    }
  },
  methods: {
    reflashPage(currentPage) {
      this.index = currentPage;
      this.getOriginData();
    },
    //启动编辑脚本页面
    handleEdit (row) {
        managerMethod(this.index,this.pageSize,ManagerType.updateComplaint,row).then(
          res => {
            if (res.code == "success") {
              this.$message.success("修改成功")
            }
          }
        )
    },
    getOriginData() {
       managerMethod(this.index,this.pageSize,ManagerType.getComplaint,null).then (
         res => {
           if (res.code == "success") {
             this.list = res.list
             if (res.list != null && res.list.length >9) {
               this.pageNum = 10*this.index +1
             }else {
               this.pageNum = 10*this.index
             }
           }
         }
       )
    },
    outPutData() {
      this.dialogVisible = false
    },
    //初始化详细信息模块
    initData: function () {
      this.getOriginData()
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
