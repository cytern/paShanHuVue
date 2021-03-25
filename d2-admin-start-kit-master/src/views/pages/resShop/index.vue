<template>
  <d2-container>
    <template slot="header">
      <el-button type="text" disabled>结果集市场</el-button>
    </template>
    <!-- 卡片式改写 -->
    <template v-for="(item,index) in missionHistorys">
      <el-card class="box-card" :key="index" style="width:30%;display:inline-block;margin-right:3%;margin-bottom:3%">
        <div slot="header" class="clearfix">
          <!-- TODO 点击查看详情  -作者信息、详细评价 -->
          <el-button type="text">{{item.missionAllName}}</el-button>
           <el-button v-if="item.userId == 0"  style="float: right; padding: 3px 0" type="success" @click="sendBuy(scope.row)"
            >购买</el-button
          >
           <el-button v-else disabled  style="float: right; padding: 3px 0" type="warning" @click="sendBuy(scope.row)"
            >{{item.userId == 1?"提供者":"已持有"}}</el-button
          >
        </div>
        <!-- 用途 -->
        <el-popover trigger="hover" placement="top">
            <p>{{ item.missionAllDis }}</p>
            <div slot="reference" class="name-wrapper" style="margin-bottom:2%">
              用途:&nbsp;<el-tag size="medium">{{ item.missionAllDis }}</el-tag>
            </div>
          </el-popover>
        <!-- 爬取日期 -->
            <div  class="name-wrapper" style="margin-bottom:2%">
              爬取日期:&nbsp;<el-tag size="medium">{{ item.finishTime }}</el-tag>
            </div>
         <!-- 售价 -->
              <div  class="name-wrapper" style="margin-bottom:2%">
              售价:&nbsp;<el-tag size="medium">{{ item.salePrice }}</el-tag>
            </div>
            <!-- TODO  评分-->
            <div  class="name-wrapper" style="margin-bottom:2%">
              评分:&nbsp;<el-tag size="medium">{{ item.onSale }}</el-tag>
            </div>

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
import { buyMh, getSalesMh } from "../../netWork/apiMethod";
import { newMah } from "../../model/missionHistoryPojo";
export default {
  name: "resShop",
  components: {
    leidatu,
    leidatu2,
    leidatu3,
  },
  data() {
    return {
      missionHistorys: [new newMah()],
      pageSize: 10,
      index: 1,
      pageNum: 0,
    };
  },
  mounted() {
    this.getOriginData();
  },
  methods: {
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
          buyMh(jsMh.missionAllHistoryId).then((res) => {
            if (res.code == "success") {
              this.$message({
                type: "success",
                message: res.msg,
              });
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
      getSalesMh(this.pageSize, this.index).then((res) => {
        (this.missionHistorys = res.mhList), (this.pageNum = res.pageNum);
      });
    },

    getOriginData() {
      this.getMyHistory();
    },
  },
};
</script>
<style>
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
  background: rgba(255, 255, 255, 0.3)
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
