<template>
  <div>
  <div style="margin-top: 10px">
    <!--       划分左右两块-->
    <div  v-for="(item,index) in commentList">
      <el-row style="margin-bottom: 10px" :key="index">
        <!--         左边块为头像等部分 暂时如此设计-->
        <el-col :span="4"
        >
          <i class="el-icon-user"></i>
        </el-col
        >
        <!--         右边块为主要设计-->
        <el-col :span="20"
        >
          <!--          再细分 第一行应该包含评价人信息 评价人等级以及 评价人昵称-->
          <el-row :gutter="30">
            <!--             评价人昵称-->
            <el-col :span="6">
              <span style="color: #13a19d;font-size:19px">{{ item.userName }}</span>
            </el-col>
            <!--             评价人等级-->
            <el-col :span="11">
              <el-tag>lv:{{item.userLever}}</el-tag>
            </el-col>
            <!--             末尾处是评价时间-->
            <el-col :span="7">
              {{item.cteateTime}}
            </el-col>
          </el-row>
          <!--           第二行应该包括评价内容-->
          <el-row style="margin-top: 15px">
            <el-col>
              <span style="font-weight: 600;font-size: 20px">{{item.comment}}</span>
            </el-col>
          </el-row>
          <!--      第三行 签名-->
          <el-row style="margin-top: 30px">
            <el-col :span="18" style="font-size: 12px;color: rgb(69,31,2)">
              <span>{{item.userDes}}</span>
            </el-col>
            <!--             点赞-->
            <el-col :span="3">
              <i class="fa fa-thumbs-up" aria-hidden="true">{{item.upNum}}</i>
            </el-col>
            <!--             点踩-->
            <el-col :span="3">
              <i class="fa fa-thumbs-down" aria-hidden="true">{{item.downNum}}</i>
            </el-col>
          </el-row>
        </el-col
        >
      </el-row>
    </div>
    <el-divider><i class="el-icon-mobile-phone"></i></el-divider>
  </div>
 <PageComment ref="pageComment" @func="changeIndex"></PageComment>
  </div>
</template>

<script>
import {GoodList} from "../model/goodList";
import {getDetailComment} from "../netWork/apiMethod";
import {CommentVo} from "../model/CommentVo";
import PageComment from "./PageComment";



export default {
  name: "CommentDialog",
  components: {
    PageComment
  },
  data () {
    return{
      tempGoodDetail: new GoodList(),
      index: 1,
      pageSize:10,
      commentList: [],
      pageNum: 10
    }
  },
  mounted() {
    this.tempGoodDetail = this.$store.state.goodDetail
    this.getOriginData()
  },
  methods: {
    changeIndex(index,pageSize) {
      this.index = index
      this.pageSize = pageSize
      this.getOriginData()
    },
    getOriginData () {
      let id = this.tempGoodDetail.id
      let type = this.tempGoodDetail.type
      getDetailComment(this.pageSize,this.index,id,type).then(
        res => {
          if (res.code == "success") {
              this.commentList = res.list
          }
        }
      )

    }
  }
}
</script>

<style scoped>

</style>
