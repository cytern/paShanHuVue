<template>
  <d2-container>
    <template slot="header">
    <el-button type="text" disabled>文章详情</el-button>
    </template>
    <el-card style="margin-top: 20px">
      <div slot="header">
        <span>基本信息</span>
      </div>
      <el-row>
        <el-col :span="8">
          <span>用户名:{{articleVo.userDetail.userNickName}}</span>
        </el-col>
        <el-col :span="8">
          <span>用户等级:{{articleVo.userDetail.userLever}}</span>
        </el-col>
        <el-col :span="8">
          <span>用户邮箱:{{articleVo.userDetail.userEmail}}</span>
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px;margin-bottom: 20px">
        <el-col :span="8">
          <span>文章创建时间:{{articleVo.jsoupArticle.createTime}}</span>
        </el-col>
        <el-col :span="8">
          <span>文章标题:{{articleVo.jsoupArticle.title}}</span>
        </el-col>
      </el-row>
    </el-card>
    <el-card style="margin-top: 20px">
      <div slot="header">
        <span>内容</span>
      </div>
      <div v-html="articleVo.jsoupArticle.body"></div>
    </el-card>
    <el-divider></el-divider>
    <el-card>
      <div slot="header">
        <el-button type="text" disabled>评价列表</el-button>
      </div>
      <comment-dialog></comment-dialog>
       <div style="margin-bottom: 10px">
         <el-button type="primary" @click="sendComments">发送评论</el-button>
       </div>
    </el-card>
    <send-comment-component ref="sendComment"></send-comment-component>
  </d2-container>
</template>

<script>
import {getArticleDetail, getDetailComment} from "../../netWork/apiMethod";
import {ArticleVo} from "../../model/ArticleSearchVo";
import CommentDialog from "../../dialog-comment/CommentDialog";
import SendCommentComponent from "../../dialog-comment/SendCommentComponent";

export default {
  name: 'index',
  components:{
    CommentDialog,
    SendCommentComponent
  },
  data () {
    return{
      articleVo: new ArticleVo(),
      comments: [],

    }
  },
  mounted() {
    this.getOriginData()
  },
  methods: {
    sendComments () {
      this.$refs.sendComment.initData(this.articleVo.jsoupArticle.id,3)
    },
    getCommentList () {
      getDetailComment(10,this.index,this.$store.state.articleId,3).then(
        res => {
          if (res.code == "success") {
            this.comments = res.list
          }
        }
      )

    },
    getOriginData() {
       getArticleDetail(this.$store.state.articleId).then(
         res => {
           if (res.code == "success") {
               this.articleVo = res.detail
           }
         }
       )
    }
  }
}
</script>
<style>
.isUse{
  background-color: rgba(91, 198, 255, 0.77);
  margin-top: 20px;
}
.isNotUse{
  background-color: rgba(255, 95, 0, 0.88);
  opacity: 0.6;
  margin-top: 20px;
}
.isFinished{
  background-color: rgba(0, 0, 0, 0.26);
  opacity: 0.3;
  margin-top: 20px;
}
</style>
