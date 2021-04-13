<template>
  <d2-container>
    <template slot="header">
      <el-button disabled type="text">商品详情</el-button>
    </template>
    <el-card class="border_image">
      <el-row :gutter="20">
        <!-- 这一格为图标 -->
        <el-col :span="7">
          <i class="el-icon-s-ticket"></i>
        </el-col>
        <el-col :span="17">
          <!-- 第一行是标题  用两块的第一块表示名称-->
          <el-row :getter="60" style="margin-bottom: 26px">
            <el-col :span="12">
                <span style="font-size: 16px; font-weight: 600">{{
                    tempGoodDetail.name
                  }}</span>
            </el-col>
            <el-col :span="12"></el-col>
          </el-row>
          <!-- 第二行是第一对字段 -->
          <el-row :getter="60" style="margin-bottom: 16px">
            <el-col :span="12">
                <span>类别:&nbsp;&nbsp;</span
                ><span class="idlike" style="color: rgba(34, 28, 28, 0.555)">{{
                tempGoodDetail.type == 1 ? "脚本" : "数据"
              }}</span>
            </el-col>
            <el-col :span="12">
                <span>类型:&nbsp;&nbsp;</span
                ><span style="color: rgba(34, 28, 28, 0.555)">{{
                tempGoodDetail.isAuto == "1" ? "官方" : "自制"
              }}</span>
            </el-col>
          </el-row>
          <!-- 下一个字段 -->
          <el-row :getter="60" style="margin-bottom: 16px">
            <el-col :span="12">
                <span>评分:&nbsp;&nbsp;</span
                >
              <el-rate
                :value="tempGoodDetail.rate == null ? 0 : tempGoodDetail.rate"
                disabled
                style="display: inline-block"
                text-color="#ff9900"
              >
              </el-rate>
            </el-col>
            <el-col :span="12">
                <span>创建者:&nbsp;&nbsp;</span
                ><span style="color: rgba(34, 28, 28, 0.555)">{{
                tempGoodDetail.userName
              }}</span>
            </el-col>
          </el-row>
          <!-- 下一个字段 -->
          <el-row :getter="60" style="margin-bottom: 16px">
            <el-col :span="12">
                <span>销量:&nbsp;&nbsp;</span
                ><span style="color: rgba(34, 28, 28, 0.555)">{{
                tempGoodDetail.saleNum
              }}</span>
            </el-col>
            <el-col :span="12">
                <span>上架时间:&nbsp;&nbsp;</span
                ><span style="color: rgba(34, 28, 28, 0.555)">{{
                tempGoodDetail.time
              }}</span>
            </el-col>
          </el-row>
          <!-- 下一段 -->
          <el-row :getter="60" style="margin-bottom: 16px">
            <el-col :span="24">
                <span>标签:&nbsp;&nbsp;</span
                ><span style="color: rgba(34, 28, 28, 0.555)"
            ><el-tag v-for="(tp, adex) in tempGoodDetail.tips" :key="adex">{{
                tp
              }}</el-tag></span
            >
            </el-col>
          </el-row>
          <el-row :getter="60" style="margin-bottom: 16px">
            <el-col :span="24">
              <el-button
                v-if="tempGoodDetail.userId == 0"
                style="width: 50%"
                type="success"
                @click="sendBuy(tempGoodDetail)"
              >购买 ( {{ tempGoodDetail.price }}代币 )
              </el-button
              >
              <el-button
                v-else-if="tempGoodDetail.userId == 2"
                disabled
                style="width: 50%"
                type="warning"
              >已在库中
              </el-button
              >
              <el-button
                v-else-if="tempGoodDetail.userId == 1"
                disabled
                style="width: 50%"
                type="warning"
              >我提供的
              </el-button
              >
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <!-- 一个模块应该由这个组成 一个按钮表示内容 一个分割线 下方为 描述性内容 -->

      <!-- 功能详细 -->
      <el-divider><i class="el-icon-loading"></i></el-divider>
      <el-row style="margin-bottom: 10px">
        <el-col :span="4"
        >
          <el-button style="width: 100%" type="primary"
          >功能详细
          </el-button
          >
        </el-col
        >
      </el-row>
      <!-- 这一行为描述性内容 -->
      {{tempGoodDetail.des}}
      <el-row>
        <el-col
        ><p class="color: rgba(34, 28, 28, 0.555)">&nbsp;&nbsp;{{ tempGoodDetail.des }}</p></el-col
        >
      </el-row>

      <!-- 作者信息 -->
      <el-divider><i class="el-icon-loading"></i></el-divider>
      <el-row style="margin-bottom: 10px">
        <el-col :span="4"
        >
          <el-button style="width: 100%" type="primary"
          >作者信息
          </el-button
          >
        </el-col
        >
      </el-row>
      <!-- 这一行为用户详细信息 -->
      <el-row>
        <el-row :gutter="20">
          <!-- 这一格为头像或者图标 -->
          <el-col :span="7">
            <i class="el-icon-s-ticket"></i>
          </el-col>
          <el-col :span="17">
            <!-- 第一行是标题  用户昵称-->
            <el-row :getter="60" style="margin-bottom: 26px">
              <el-col :span="12">
                <span style="font-size: 16px; font-weight: 600">{{
                    tempUserDetail.userNickName
                  }}</span>
              </el-col>
              <el-col :span="12"></el-col>
            </el-row>
            <!-- 第二行是第一对字段 -->
            <el-row :getter="60" style="margin-bottom: 16px">
              <el-col :span="12">
                <span>用户等级:&nbsp;&nbsp;</span
                ><span class="idlike" style="color: rgba(34, 28, 28, 0.555)">{{
                  tempUserDetail.userLever
                }}</span>
              </el-col>
              <el-col :span="12">
                <span>邮箱:&nbsp;&nbsp;</span
                ><span style="color: rgba(34, 28, 28, 0.555)">{{
                  tempUserDetail.userEmail
                }}</span>
              </el-col>
            </el-row>
            <!-- 下一个字段 -->
            <el-row :getter="60" style="margin-bottom: 16px">
              <el-col :span="12">
              <span>总销量:&nbsp;&nbsp;</span
              ><span style="color: rgba(34, 28, 28, 0.555)">{{
                  tempUserDetail.userSalenum
                }}</span>
              </el-col>
              <el-col :span="12">
                <span>简介:&nbsp;&nbsp;</span
                ><span style="color: rgba(34, 28, 28, 0.555)">{{
                  tempGoodDetail.userDes
                }}</span>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-row>

    </el-card>
    <el-card style="margin-top: 20px">
      <el-row style="margin-bottom: 10px">
        <el-col :span="4"
        >
          <el-button style="width: 100%" type="primary"
          >评价列表
          </el-button
          >
        </el-col
        >
      </el-row>
<!--      评价 需要循环评价列表  底部打分割线-->

     <template name="评价例子模型" style="margin-top: 10px" v-for="(item,index) in comments">
<!--       划分左右两块-->
       <div v-if="item.commentDes !=null && item.userId != null">
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
               <span style="color: #13a19d;font-size:19px">{{ item.userNickName }}</span>
             </el-col>
<!--             评价人等级-->
             <el-col :span="11">
               <el-tag>lv:{{item.lever}}</el-tag>
             </el-col>
<!--             末尾处是评价时间-->
             <el-col :span="7">
               {{item.sentTime}}
             </el-col>
           </el-row>
<!--           第二行应该包括评价内容-->
           <el-row style="margin-top: 15px">
             <el-col>
               <span style="font-weight: 600;font-size: 20px">{{item.commentDes}}</span>
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
     </template>


       <el-pagination
        background
        layout="prev, pager, next"
        :total="pageNum"
        :current-page="index"
        @current-change="reflashPage"
      >
      </el-pagination>
</el-card>
  </d2-container>
</template>

<script>
import {buyMa, buyMh,getDetailComment,getDetailUser} from "../../netWork/apiMethod";
import {goodDetail} from "../../model/detailPojo";
import {CommentVo} from  "../../model/commentPojo";
import {JsoupUserDetail} from "../../model/userPojo";

export default {
  name: "myGoodDetail",
  components: {},
  data() {
    return {
      tempGoodDetail: new goodDetail(),
      comments: [new CommentVo()],
      index: 1,
      pageNum: 0,
      tempUserDetail: new JsoupUserDetail(),
    };
  },
  watch: {

  },
  mounted() {
    this.tempGoodDetail = this.$store.state.goodDetail
    this.getCommentList()
    this.getUserInfo()
  },
  methods: {
    getUserInfo () {
      getDetailUser(this.tempGoodDetail.id,this.tempGoodDetail.type).then(
        res => {
          if (res.code === "success"){
            this.tempUserDetail =  res.userDetail
          }
        }
      )
    },
    /**
     * 获取评价列表
     */
    getCommentList () {
     getDetailComment(10,this.index,this.tempGoodDetail.id,this.tempGoodDetail.type).then(
       res => {
         if (res.code == "success") {
           this.comments = res.list
         }
       }
     )

    },
    reflashPage(currentPage) {
      this.index = currentPage;
      this.getCommentList();
    },
    sendBuy(detail) {
      this.$confirm("是否购买?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        // 脚本
        if (detail.type == 1) {
          buyMa(detail.id).then((res) => {
            if (res.code == "success") {
              this.$message({
                type: "success",
                message: res.msg,
              });
            }
          });
        } else {
          buyMh(detail.id).then((res) => {
            if (res.code == "success") {
              this.$message({
                type: "success",
                message: res.msg,
              });
            }
          });
        }
      });
    },
  },
};
</script>

<style>
.missionTag {
  margin-bottom: 10px;
}

.actionTag {
  margin-bottom: 4px;
}

.divCard {
  margin-top: 10px;
  background-color: rgba(150, 255, 28, 0.26);
}

.conf {
  border: 5px solid;
  border-radius: 10%;
  border-image: linear-gradient(to right, #ff831c, #0ceebb) 20 20;
  background: rgba(255, 255, 255, 0.3) url("../../../../public/userFor/listBack.png");
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
  background: rgba(255, 255, 255, 0.3) url("../../../../public/userFor/listBack.png");
}

.leidatu {
  border: 5px solid;
  border-radius: 10%;
  border-image: linear-gradient(to left, #ff831c, #0ceebb) 20 20;
  background: rgba(255, 255, 255, 0.3) url("../../../../public/userFor/leidabeijing1.png");
}

.xuexiaobeijing {
  border: 5px solid;
  border-radius: 10%;
  border-image: linear-gradient(to left, #ff831c, #0ceebb) 20 20;
  background: rgba(255, 255, 255, 0.3) url("../../../../public/userFor/xuexiaobeijing.png");
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
