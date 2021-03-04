<template>
  <d2-container>
    <template slot="header">
      <el-button type="text" disabled>我的结果</el-button>
    </template>
     <el-table
    :data="missionHistorys"
     border
    style="width: 100%">
    <el-table-column
      label="脚本名称"
      width="180">
      <template slot-scope="scope">
        <i class="el-icon-cpu"></i>
        <span style="margin-left: 10px">{{ scope.row.missionAllName }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="脚本详细"
      width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>用途: {{ scope.row.missionAllDis }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.missionAllDis}}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
     <el-table-column
      label="发送时间"
      width="180">
      <template slot-scope="scope">
      
        <span style="margin-left: 10px">{{ scope.row.sentTime }}</span>
      </template>
    </el-table-column>
      <el-table-column
      label="结束时间"
      width="180">
      <template slot-scope="scope">
      
        <span style="margin-left: 10px">{{ scope.row.finishTime == null ? "未完成": scope.row.finishTime}}</span>
      </template>
    </el-table-column>
      <el-table-column
      label="目前状态"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">
          <!-- 判断执行状态 给与不同的表示-->
          <!-- 待完成 -->
           <template v-if="scope.row.missionState == '1'">
               <el-button
          size="mini"
          type="info"
         >等待开始中
           <i class="el-icon-loading"></i>
         </el-button>
          </template>
          <!-- 正在执行中 -->
              <template v-if="scope.row.missionState == '2'">
               <el-button
          size="mini"
          type="primary"
         >正在执行中
         <i class="el-icon-loading"></i>
         </el-button>
          </template>
          <!-- 已经执行完成 -->
          <template v-if="scope.row.missionState == '3'">
               <el-button
          size="mini"
          type="success"
         >已经完成执行</el-button>
          </template>
          <!-- 执行失败 且标出失败原因 -->
           <template v-if="scope.row.missionState == '4'">
               <!-- <el-button
          size="mini"
          type="danger"
         >执行失败</el-button> -->
                <el-tooltip class="item" effect="dark" :content="scope.row.missionFailReason" placement="top">
       <el-button
          size="mini"
          type="danger"
         >执行失败</el-button>
    </el-tooltip>
          </template>
          </span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">

        <!-- 根据状态结果 展示下载结果集 和 取消任务两个按钮 -->
        <template v-if="scope.row.missionState == '3'">
        <el-button
          size="mini"
          type="success"
          @click="handleEdit(scope.$index, scope.row)">下载结果集</el-button>
        </template>

          <template v-if="scope.row.missionState == '1'">
               <el-button
          size="mini"
          type="warning"
          @click="handleDelete(scope.$index, scope.row)">取消</el-button>
          </template>
     
      </template>
    </el-table-column>
  </el-table>
    <el-pagination
  background
  layout="prev, pager, next"
  :total="pageNum"
  :current-page = "index"
  >
</el-pagination>
  </d2-container>
</template>

<script>
import leidatu from "../../echart-comment/leidatu";
import leidatu2 from "../../echart-comment/leidatu2";
import leidatu3 from "../../echart-comment/leidatu3";
import { getMyMissionHistorys} from "../../netWork/apiMethod";
import missionHistory from "../../model/missionHistoryPojo"
export default {
  name: "studentCharts",
  components: {
    leidatu,
    leidatu2,
    leidatu3,
  },
  data() {
    return {
      missionHistorys: [missionHistory],
        pageSize : 10,
      index: 1,
      pageNum: 0,
    }
  },
  mounted() {
    this.getOriginData();
  },
  methods: {
     /**
      * 获取我的历史
      */
     getMyHistory () {
      getMyMissionHistorys(this.pageSize,this.index).then(res => {
             this.missionHistorys = res.missionHistory,
            this.pageNum = res.pageNum
      })
     },
  
    getOriginData() {
     this.getMyHistory()
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
