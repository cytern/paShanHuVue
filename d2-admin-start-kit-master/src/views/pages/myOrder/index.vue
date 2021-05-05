<template>
<d2-container>
  <template slot="header" >
    <el-button type="text" disabled>我的订单</el-button>
  </template>
  <el-table :data="orderList">
    <el-table-column
    prop="goodName"
    label="商品名"
    width="180">
    </el-table-column>
    <el-table-column
    width="180"
    label="类型">
      <template slot-scope="scope">
        <el-tag v-if="scope.row.type == 1">脚本</el-tag>
        <el-tag v-else-if="scope.row.type == 2">数据</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      prop="createUser"
      width="180"
      label="开发者">
    </el-table-column>
    <el-table-column
      prop="sendTime"
      width="180"
      label="购买时间">
    </el-table-column>
    <el-table-column
      prop="price"
      width="180"
      label="购买价格">
    </el-table-column>
    <el-table-column
      width="180"
      label="评价">
      <template slot-scope="scope">
      <el-popover trigger="hover" placement="top">
        <p>{{ scope.row.des }}</p>
        <div slot="reference" class="name-wrapper">
          <el-tag size="medium" class="inlineDes">{{
              scope.row.des
            }}</el-tag>
        </div>
      </el-popover>
      </template>
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="openComment(scope.row)" type="text" size="small">评价</el-button>
        <el-button type="text" @click="openComplaint(scope.row)" size="small">投诉</el-button>
      </template>
    </el-table-column>`
  </el-table>
  <SendCommentComponent ref="sendComment"></SendCommentComponent>
  <SendComplaintComponent ref = "sendComplaint"></SendComplaintComponent>
</d2-container>
</template>

<script>
import SendCommentComponent from "../../dialog-comment/SendCommentComponent";
import SendComplaintComponent from "../../SendComplaintComponent";
import PageComment from "../../dialog-comment/PageComment";
import {GoodList} from "../../model/goodList";
import {getGoodOrders} from "../../netWork/apiMethod";
export default {
  name: "index",
  components: {
    SendCommentComponent,
    SendComplaintComponent,
    PageComment
  },
  mounted() {
    this.getOriginData()
  },
  data() {
    return{
         orderList: [GoodList()],
      index: 1,
      pageSize: 10,
      pageNum:10
    }
  },
  methods: {
    openComment(row) {
      this.$refs.sendComment.initData(row.id,row.type)
    },
    openComplaint(row) {
      this.$refs.sendComplaint.initData(row.id,row.type)
    },
    getOriginData() {
          getGoodOrders().then(
            res => {
              if (res.code == "success") {
                this.orderList = res.list
              }
            }
          )
    },


  }
}
</script>

<style scoped>

</style>
