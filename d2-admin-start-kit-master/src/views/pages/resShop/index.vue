<template>
  <d2-container>
    <template slot="header">
      <el-button type="text" disabled>结果集市场</el-button>
      <search-comment ref="searchComment" @func="backSearch" @after="getOriginData"> </search-comment>
    </template>
    <!-- 新式改写卡片 仿照3dm样式 -->
    <!--          :class="index%4===0?'box-card cardBackground1':-->
    <!--                  index%3===0?'box-card cardBackground2':-->
    <!--                  index%2===0?'box-card cardBackground3':-->
    <!--                   'box-card cardBackground4'"-->
    <template v-for="(item, index) in goodList">
        <el-card
          :key="index"
          style="
          width: 45%;
          display: inline-block;
          margin-right: 3%;
          margin-bottom: 3%;
        "
        >
          <el-row :gutter="20">
            <!-- 这一格为图标 -->
            <el-col :span="7">
              <i class="el-icon-s-ticket"></i>
            </el-col>
            <el-col :span="17">
              <!-- 第一行是标题  用两块的第一块表示名称-->
              <el-row :getter="60" style="margin-bottom: 26px">
                <el-col :span="12">
                <span @click="goToDetail(item)" style="font-size: 16px; font-weight: 600">{{
                    item.goodName
                  }}</span>
                </el-col>
                <el-col :span="12"></el-col>
              </el-row>
              <!-- 第二行是第一对字段 -->
              <el-row :getter="60" style="margin-bottom: 16px" class="inlineDes">
                <el-col :span="12">
                <span >用途:&nbsp;&nbsp;</span
                ><span  class="idlike" style="color: rgba(34, 28, 28, 0.555)">{{
                    item.des
                  }}</span>
                </el-col>
                <el-col :span="12">
                <span>类型:&nbsp;&nbsp;</span
                ><span style="color: rgba(34, 28, 28, 0.555)">{{
                    item.type == "1" ? "脚本" : "数据"
                  }}</span>
                </el-col>
              </el-row>
              <!-- 下一个字段 -->
              <el-row :getter="60" style="margin-bottom: 16px">
                <el-col :span="12">
                <span>评分:&nbsp;&nbsp;</span
                ><el-rate
                  :value="item.rate == null ? 0 : item.rate"
                  disabled
                  text-color="#ff9900"
                  style="display: inline-block"
                >
                </el-rate>
                </el-col>
                <el-col :span="12">
                <span>创建者:&nbsp;&nbsp;</span
                ><span style="color: rgba(34, 28, 28, 0.555)">{{
                    item.createUser
                  }}</span>
                </el-col>
              </el-row>
              <!-- 下一个字段 -->
              <el-row :getter="60" style="margin-bottom: 16px">
                <el-col :span="12">
                <span>销量:&nbsp;&nbsp;</span
                ><span style="color: rgba(34, 28, 28, 0.555)">{{
                    item.saleNum == null ? 0 : item.saleNum
                  }}</span>
                </el-col>
                <el-col :span="12">
                <span>上架时间:&nbsp;&nbsp;</span
                ><span style="color: rgba(34, 28, 28, 0.555)">{{
                    item.sendTime
                  }}</span>
                </el-col>
              </el-row>
              <!-- 下一段 -->
              <el-row :getter="60" style="margin-bottom: 16px">
                <el-col :span="24">
                <span>标签:&nbsp;&nbsp;</span
                ><span style="color: rgba(34, 28, 28, 0.555)"
                ><el-tag v-for="(tp, adex) in item.tips" :key="adex">{{
                    tp
                  }}</el-tag></span
                >
                </el-col>
              </el-row>
              <el-row :getter="60" style="margin-bottom: 16px">
                <el-col :span="24">
                  <el-button
                    v-if="item.have == 0 || item.have == null"
                    type="success"
                    style="width: 100%"
                    @click="sendBuy(item)"
                  >购买 ( {{item.price}}代币 )</el-button
                  >
                  <el-button style="width: 100%" v-else disabled type="warning">已在库中</el-button>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-card>
      </template>

    <el-pagination
      background
      layout="prev, pager, next"
      :total="pageNum"
      :current-page="index"
      @current-change="reflashPage"
    >
    </el-pagination>
  </d2-container>
</template>

<script>
import leidatu from "../../echart-comment/leidatu";
import leidatu2 from "../../echart-comment/leidatu2";
import leidatu3 from "../../echart-comment/leidatu3";
import SearchComment from "../../dialog-comment/SearchComment";
import {buyMh, getSalesMh, getGoodList, downloadExcel} from "../../netWork/apiMethod";
import { JsoupMissionAllHistory } from "../../model/missionHistoryPojo";
import {mhToDetail} from "../../model/detailPojo";
import {formateMhData} from "../../model/missionHistoryPojo";
import {SearchGoodVo} from "../../model/searchGoodVo";
import {GoodList} from "../../model/goodList";

export default {
  name: "resShop",
  components: {
    leidatu,
    leidatu2,
    leidatu3,
    SearchComment
  },
  data() {
    return {
      missionHistorys: [new JsoupMissionAllHistory()],
      pageSize: 10,
      index: 1,
      pageNum: 0,
      searchData: new SearchGoodVo(),
      goodList: [new GoodList()]
    };
  },
  mounted() {
    this.getOriginData();
  },
  methods: {
    backSearch (searchData) {
      this.searchData = searchData
    },

    goToDetail (item) {
      this.$store.state.goodDetail = item
      this.$router.push("goodDetail")
    },
    /**
     * 购买脚本
     */
    sendBuy(jsMh) {
      this.$confirm("是否购买?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          buyMh(jsMh.id).then((res) => {
            if (res.code == "success") {
              this.$message({
                type: "success",
                message: res.msg,
              });
              this.getOriginData()
            }
          });
        })
        .catch(() => {});
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
    getMyHistory() {
      getGoodList(this.index,this.pageSize,2,this.searchData).then(
        res => {
          if (res.code = "success") {
            let tempList = res.list
            for (let i = 0; i < tempList.length; i++) {
              tempList[i].tips = formateMhData(tempList.tips)
            }
            this.goodList = tempList
          }

        }
      )
    },

    getOriginData() {
      this.getMyHistory();
    },
  },
};
</script>
<style>
.border_image {
  border: 40px solid transparent;
  border-image: url(../../../../public/userFor/border.png) 450 450 round ;
}
.cardBackground2 {
  background: url("../../../../public/userFor/cardBackground4.png");
}
.cardBackground3 {
 background: url("../../../../public/userFor/cardBackground2.png");
}
.cardBackground1 {
  background: url("../../../../public/userFor/cardBackground1.png");
}
.cardBackground4 {
  background: url("../../../../public/userFor/cardBackground3.png");
}
/* .cardBackgroud ::before{
 background: url("../../../../public/userFor/cardBackground.png");
   opacity: 0.5;
   position:absolute;
   z-index:-1;


} */

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
  background: rgba(34, 28, 28, 0.555)
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
