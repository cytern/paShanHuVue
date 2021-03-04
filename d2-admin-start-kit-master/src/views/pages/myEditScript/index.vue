<template>
  <d2-container>
    <template slot="header">
      <el-button type="text" disabled>开发脚本</el-button>
      <el-button>编辑</el-button> <el-button>新建</el-button>
    </template>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-card class="box-card">
            <!-- 模板定义 第一卡片为脚本信息介绍卡片 -->
            <div slot="header" class="clearfix">
              <template v-for="(item, mindex) in missionDatas">
                <el-button
                  :key="mindex"
                  type="primary"
                  plain
                  @click="selectMission(mindex)"
                  >{{ item.jsoupMissionAll.maName }}</el-button
                >
              </template>
            </div>
            <!-- 此card 定义一个任务清单 如果进行复制等操作 就会使用这个card的操作 -->
            <el-card
              class="box-card"
              v-for="(itemAcc, index) in missionData.missionDataList"
              :key="index"
            >
              <div slot="header" class="clearfix">
                <!-- 此行  为爬虫一个回单任务列表 -->
                <el-row class="missionTag">
                  <!-- 次序 -->
                  <el-col :span="8">
                    任务次序：<el-button type="primary" circle>{{
                      itemAcc.jsoupMissionOrder.moRank
                    }}</el-button>
                  </el-col>
                  <!-- 回单任务 名 -->
                  <el-col :span="12">
                    <el-input
                      :value="itemAcc.jsoupMission.missionName"
                      style="width: 50%"
                    ></el-input>
                  </el-col>
                  <!-- 增加此行按钮 -->
                  <el-col :span="1">
                    <el-button
                      type="warning"
                      icon="el-icon-plus"
                      circle
                    ></el-button>
                  </el-col>
                  <!-- 删除此行按钮 -->
                  <el-col :span="1">
                    <el-button
                      type="danger"
                      icon="el-icon-minus"
                      circle
                    ></el-button>
                  </el-col>
                  <!-- 上移次序 -->
                  <el-col :span="1">
                    <el-button
                      type="success"
                      icon="el-icon-top"
                      circle
                    ></el-button>
                  </el-col>
                  <!-- 下移次序 -->
                  <el-col :span="1">
                    <el-button
                      type="success"
                      icon="el-icon-bottom"
                      circle
                    ></el-button>
                  </el-col>
                </el-row>
                <!-- 分割线 -->
                <el-divider></el-divider>
                <el-row>
                  <el-col :span="2" class="actionTag"> 参数列表： </el-col>
                </el-row>
                <el-row>
                  <template v-for="(pragram, pIndex) in itemAcc.jsoupPragrams">
                    <el-col :span="3" :key="pIndex">
                      <el-popover trigger="hover" placement="top">
                        <p>
                          类型:
                          {{
                            pragram.pragramType == "int"
                              ? "整数"
                              : pragram.pragramType == "decimal"
                              ? "小数"
                              : pragram.pragramType == "string"
                              ? "非数字"
                              : pragram.pragramType == "date"
                              ? "日期"
                              : pragram.pragramType == "variable"
                              ? "变量"
                              : pragram.pragramType == "page"
                              ? "页码"
                              : "未定义"
                          }}
                        </p>
                        <!-- 是否可能为随机数 -->
                        <template
                          v-if="
                            pragram.pragramType == 'decimal' ||
                            pragram.pragramType == 'int' ||
                            pragram.pragramType == 'date'
                          "
                        >
                          <p>
                            是否随机: {{ pragram.isRamdom == 1 ? "是" : "否" }}
                          </p>

                          <!-- 是随机数则进行展示上下区间 -->
                          <p v-if="pragram.isRamdom == 1">
                            上下区间: {{ pragram.upNum }} --
                            {{ pragram.downNum }}
                          </p>
                        </template>
                        <!-- 随机数的值 -->
                        <p>值： {{ pragram.pragramValue }}</p>
                        <!-- 绑定的行动 -->
                        <p>
                          行动id:
                          {{
                            pragram.actionId == null
                              ? "未绑定"
                              : pragram.actionId
                          }}
                        </p>
                        <div slot="reference" class="name-wrapper">
                          <!-- 点击触发编辑页面 -->
                          <el-tag
                            @click="showPragramDetail(pragram, pIndex, index)"
                            :type="pragram.actionId == null ? 'info' : ''"
                          >
                            {{ pragram.programContent }}</el-tag
                          >
                        </div>
                      </el-popover>
                    </el-col>
                  </template>
                  <!-- 最后添加一个增加参数的tag -->
                  <el-col :span="4">
                    <el-button @click="addPragram(index)" type="success"
                      >增加参数</el-button
                    >
                  </el-col>
                </el-row>
              </div>
              <!-- 此卡片值 为脚本行动的卡片数组 -->

              <el-row>
                <el-col>
                  <el-card
                    class="box-card"
                    v-for="(itemAction, aindex) in itemAcc.actionVos"
                    :key="aindex"
                  >
                    <div slot="header" class="clearfix">
                      <!-- 头部标题 与order 一致 -->
                      <el-row>
                        <!-- 次序 -->
                        <el-col :span="8">
                          行动次序：<el-button type="primary" circle>{{
                            itemAction.actionOrder.rank
                          }}</el-button>
                        </el-col>
                        <!-- 回单任务 名 -->
                        <el-col :span="12">
                          <el-input
                            :value="itemAction.jsoupAction.actionName"
                            style="width: 50%"
                          ></el-input>
                        </el-col>
                        <!-- 增加此行按钮 -->
                        <el-col :span="1">
                          <el-button
                            type="warning"
                            icon="el-icon-plus"
                            circle
                          ></el-button>
                        </el-col>
                        <!-- 删除此行按钮 -->
                        <el-col :span="1">
                          <el-button
                            type="danger"
                            icon="el-icon-minus"
                            circle
                          ></el-button>
                        </el-col>
                        <!-- 上移次序 -->
                        <el-col :span="1">
                          <el-button
                            type="success"
                            icon="el-icon-top"
                            circle
                          ></el-button>
                        </el-col>
                        <!-- 下移次序 -->
                        <el-col :span="1">
                          <el-button
                            type="success"
                            icon="el-icon-bottom"
                            circle
                          ></el-button>
                        </el-col>
                      </el-row>
                    </div>
                    <!-- 行动组 内部 -->
                    <el-form
                      :inline="true"
                      :model="itemAction"
                      class="demo-form-inline"
                    >
                      <el-form-item label="id">
                        <el-input
                          v-model="itemAction.jsoupAction.actionId"
                          placeholder="id"
                          disabled
                        ></el-input>
                      </el-form-item>
                      <el-form-item label="选取类型">
                        <el-select
                          v-model="itemAction.jsoupAction.actionEleType"
                          placeholder="选取类型" 
                        >
                          <el-option
                           v-for="(seleteTypeItem,sIndex) in actionSelectTypes"
                          :key="sIndex"
                            :label="seleteTypeItem.name"
                            :value="seleteTypeItem.value"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                      <!-- 选取类型下 为 选取字段的值 -->
                        
                      <el-form-item label="选取凭据">
                        <el-input :value="itemAction.jsoupAction.actionEleValue"></el-input>
                      </el-form-item>

                      <el-form-item label="执行类型">
                        <el-select
                          v-model="itemAction.jsoupAction.actionDoType"
                          placeholder="执行类型" 
                        >
                          <el-option
                           v-for="(doTypeItem,dIndex) in actionDoTypes"
                          :key="dIndex"
                            :label="doTypeItem.name"
                            :value="doTypeItem.value"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                      <!-- 如果执行类型是输入类型 则要显示字段区块 不可操作  -->
                      <template v-if="itemAction.jsoupAction.actionDoType == 'input' || itemAction.jsoupAction.actionDoType == 'goto'">
                             <el-form-item label="参数值">
                          <el-input :value="itemAction.jsoupPragram.pragramValue" disabled></el-input>
                      </el-form-item>
                      </template>

                    </el-form>
                  </el-card>
                </el-col>
              </el-row>
            </el-card>
          </el-card>
        </div></el-col
      >
    </el-row>

    <pargramDialog ref="pragramdialog" @func="getResultData"></pargramDialog>
  </d2-container>
</template>

<script>
import leidatu from "../../echart-comment/leidatu";
import leidatu2 from "../../echart-comment/leidatu2";
import leidatu3 from "../../echart-comment/leidatu3";
import pargramDialog from "../../dialog-comment/pragramDialog";
import { getOneScript } from "../../netWork/apiMethod";
import missionAllData from "../../model/missionAllPojo";
import {
  pushMissionData,
  deleteMissionData,
  getIndexOfMissionData,
} from "../../util/DataUtil";
import Page from "../../system/login/page.vue";
import PragramDialog from "../../dialog-comment/pragramDialog.vue";
import actionDoType from "../../model/actionDoType"
import actionSeleType from "../../model/actionSelectType"
export default {
  name: "studentConf",
  components: {
    leidatu,
    leidatu2,
    leidatu3,
    pargramDialog,
  },
  data() {
    return {
      tempJsoupPragram: {
        pragramId: null,
        missionId: null,
        actionId: null,
        pragramType: null,
        pragramAccuracy: null,
        isRamdom: null,
        upNum: null,
        downNum: null,
        pragramValue: null,
        missionAllId: null,
        programContent: null,
      },
      missionAllDataId: 0,
      missionData: missionAllData,
      missionDatas: [missionAllData],
      tempIndex: null,
      tempPindex: null,
      selectIndex: null,
      actionDoTypes : actionDoType,
      actionSelectTypes : actionSeleType

    };
  },
  mounted() {
    this.missionDatas = this.$store.state.missionDatas;
    this.getOriginData();
  },
  methods: {
    /**
     * 获取子组件的传值
     */
    getResultData(pragram) {
      //获取temp 任务数据
      let tempMissionData = this.missionData;
      let tempMissionList = tempMissionData.missionDataList;
      let tempMission = tempMissionList[this.tempIndex];
      let tempPragrams = tempMission.jsoupPragrams;
      tempPragrams[this.tempPindex] = pragram;
      pushMissionData(this.missionData);
      this.getIndex();
    },
    /**
     * 选择不同的列表
     */
    selectMission(index) {
      this.$confirm("切换或者删除该脚本, 是否继续?", "提示", {
        confirmButtonText: "切换",
        cancelButtonText: "删除",
        type: "warning",
      })
        .then(() => {
          this.missionData = this.missionDatas[index];
          this.selectIndex = index;
        })
        .catch(() => {
          this.deleteMissionDatasHow(index);
        });
    },

    //初始化数据
    getOriginData() {
      if (this.$route.params.id) {
        //赋值 如果是跳转时带着id参数
        this.missionAllDataId = this.$route.params.id;
        this.getScript();
      } else {
        this.missionData =
          this.missionDatas == null || this.missionDatas == []
            ? new missionAllData()
            : this.missionDatas[0];
      }
    },
    //获取脚本
    getScript() {
      getOneScript(this.missionAllDataId).then((res) => {
        if (res.code == "error" || res.missionData == null) {
          this.missionData = missionDatas[0];
        } else {
          this.missionData = res.missionData;
          pushMissionData(this.missionData);
          this.getIndex();
        }
      });
    },
    //排序数据 获得序列化数据
    getIndex() {
      let missionDto = this.missionData;
      this.missionData = getIndexOfMissionData([missionDto])[0];
    },
    //显示编辑参数的弹出框
    showPragramDetail(pragram, pIndex, index) {
      this.tempIndex = index;
      this.tempPindex = pIndex;
      this.$refs.pragramdialog.initData(
        pragram,
        this.missionData.missionDataList[index].actionList
      );
    },

    //删除  datas
    deleteMissionDatasHow(index) {
      let datas = this.missionDatas;
      deleteMissionData(datas[index].jsoupMissionAll.maId);
      this.missionDatas = this.$store.state.missionDatas;
      this.missionData = this.missionDatas[0];
    },
    //增加参数
    addPragram(index) {
      let datas = this.missionData;
      let pragrams = datas.missionDataList[index].jsoupPragrams;
      pragrams.push({
        pragramId: null,
        missionId: null,
        actionId: null,
        pragramType: null,
        pragramAccuracy: null,
        isRamdom: null,
        upNum: null,
        downNum: null,
        pragramValue: null,
        missionAllId: null,
        programContent: null,
      });
      datas.missionDataList[index].jsoupPragrams = pragrams;
      this.missionData = datas;
      pushMissionData(this.missionData);
      this.getIndex();
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
  background: rgba(255, 255, 255, 0.3)
    url("../../../../public/userFor/listBack.png");
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
