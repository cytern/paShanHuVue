<script src="../../netWork/apiBook.js"></script>
<template>
  <d2-container>
    <template slot="header">
      <el-button disabled type="text">开发脚本</el-button>
      <el-button type="success" @click="saveScript">保存</el-button>
      <el-button @click="addNewMissionAll">新建</el-button>
    </template>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-card class="box-card" style="background: #f1fafa">
            <!-- 模板定义 第一卡片为脚本信息介绍卡片 -->
            <div slot="header" class="clearfix">
              <template v-for="(item, mindex) in missionDataList">
                <el-button
                  :key="mindex"
                  plain
                  type="primary"
                  @click="selectMission(mindex)"
                >{{ item.jsoupMissionAll.maName }}
                </el-button
                >
              </template>
              <!--              -->
              <el-divider><i class="el-icon-star-on"></i></el-divider>

              <el-card>
                <el-row :gutter="20">
                  <!--                  一行三栏-->
                  <el-form>
                    <el-col :span="8">
                      <el-form-item label="脚本名称:">
                        <el-input v-model="missionData.jsoupMissionAll.maName" style="width: 50%"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="16">
                      <el-form-item label="标签:">
                        <!--                        此组件主要展示tips 的标签-->
                        <tips-show-comment ref="tipsShowComment" style="display: inline-block"
                                           @func="backTipsData"></tips-show-comment>
                        <el-input v-model="tempTips" style="width: 20%;display: inline-block"></el-input>
                        <el-button style="margin-left: 5px" type="success"
                                   @click="addNewTip(missionData.jsoupMissionAll.tips)">添加
                        </el-button>
                      </el-form-item>
                    </el-col>
                  </el-form>
                </el-row>
                <!--                第二行填写 脚本描述 按照内容 分段填写-->
                <el-divider></el-divider>
                <el-row :gutter="20">
                  <!--                   一整行-->
                  <el-col :span="4">
                    <el-button type="primary" @click="showDesComment()">编辑详情</el-button>
                  </el-col>
                  <el-col :span="20">
                    <div v-html="missionData.jsoupMissionAll.maTip"></div>
                  </el-col>
                </el-row>
              </el-card>
            </div>
            <!-- 此card 定义一个任务清单 如果进行复制等操作 就会使用这个card的操作 -->
            <el-card
              v-for="(itemAcc, index) in missionData.missionDataList"
              :key="index"
              class="box-card"
              style="background: #e8e8ff; margin-bottom: 100px"
            >
              <div slot="header" class="clearfix">
                <!-- 此行  为爬虫一个回单任务列表 -->
                <el-row class="missionTag">
                  <el-col :span="1"
                  >
                    <el-tag type="info"
                    >id: {{ itemAcc.jsoupMission.missionId }}
                    </el-tag
                    >
                  </el-col
                  >

                  <!-- 次序 -->
                  <el-col :span="7">
                    任务次序：
                    <el-button circle type="primary">{{
                        itemAcc.jsoupMissionOrder.moRank
                      }}
                    </el-button>
                  </el-col>
                  <!-- 回单任务 名 -->
                  <el-col :span="12">
                    <el-input
                      v-model="itemAcc.jsoupMission.missionName"
                      style="width: 50%"
                    ></el-input>
                  </el-col>
                  <!-- 增加此行按钮 -->
                  <el-col :span="1">
                    <el-button
                      circle
                      icon="el-icon-plus"
                      type="warning"
                      @click="
                        addLineMission(missionData.missionDataList, index)
                      "
                    ></el-button>
                  </el-col>
                  <!-- 删除此行按钮 -->
                  <el-col :span="1">
                    <el-button
                      circle
                      icon="el-icon-minus"
                      type="danger"
                      @click="
                        deleteLineMission(missionData.missionDataList, index)
                      "
                    ></el-button>
                  </el-col>
                  <!-- 上移次序 -->
                  <el-col :span="1">
                    <el-button
                      circle
                      icon="el-icon-top"
                      type="success"
                      @click="
                        upChangeLineMission(missionData.missionDataList, index)
                      "
                    ></el-button>
                  </el-col>
                  <!-- 下移次序 -->
                  <el-col :span="1">
                    <el-button
                      circle
                      icon="el-icon-bottom"
                      type="success"
                      @click="
                        downChangeLineMission(
                          missionData.missionDataList,
                          index
                        )
                      "
                    ></el-button>
                  </el-col>
                </el-row>
              </div>
              <!-- 此卡片值 为脚本行动的卡片数组 -->

              <el-row>
                <el-col>
                  <el-card
                    v-for="(itemAction, aindex) in itemAcc.actionVos"
                    :key="aindex"
                    class="box-card"
                    style="background: #ddf3ff; margin-bottom: 20px"
                  >
                    <div slot="header" class="clearfix">
                      <!-- 头部标题 与order 一致 -->
                      <el-row>
                        <!-- 次序 -->
                        <el-col :span="8">
                          行动次序：
                          <el-button circle type="primary">{{
                              itemAction.actionOrder.rank
                            }}
                          </el-button>
                        </el-col>
                        <!-- 回单任务 名 -->
                        <el-col :span="12">
                          <el-input
                            v-model="itemAction.jsoupAction.actionName"
                            style="width: 50%"
                          ></el-input>
                        </el-col>
                        <!-- 增加此行按钮 -->
                        <el-col :span="1">
                          <el-button
                            circle
                            icon="el-icon-plus"
                            type="warning"
                            @click="addLineAction(itemAcc.actionVos, aindex)"
                          ></el-button>
                        </el-col>
                        <!-- 删除此行按钮 -->
                        <el-col :span="1">
                          <el-button
                            circle
                            icon="el-icon-minus"
                            type="danger"
                            @click="deleteLineAction(itemAcc.actionVos, aindex)"
                          ></el-button>
                        </el-col>
                        <!-- 上移次序 -->
                        <el-col :span="1">
                          <el-button
                            circle
                            icon="el-icon-top"
                            type="success"
                            @click="
                              upChangeLineAction(itemAcc.actionVos, aindex)
                            "
                          ></el-button>
                        </el-col>
                        <!-- 下移次序 -->
                        <el-col :span="1">
                          <el-button
                            circle
                            icon="el-icon-bottom"
                            type="success"
                            @click="
                              downChangeLineAction(itemAcc.actionVos, aindex)
                            "
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
                          disabled
                          placeholder="id"
                        ></el-input>
                      </el-form-item>
                      <el-form-item label="选取类型">
                        <el-select
                          v-model="itemAction.jsoupAction.actionEleType"
                          placeholder="选取类型"
                        >
                          <el-option
                            v-for="(
                              seleteTypeItem, sIndex
                            ) in actionSelectTypes"
                            :key="sIndex"
                            :label="seleteTypeItem.name"
                            :value="seleteTypeItem.value"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                      <!-- 选取类型下 为 选取字段的值 -->

                      <el-form-item label="选取凭据">
                        <el-input
                          v-model="itemAction.jsoupAction.actionEleValue"
                        ></el-input>
                      </el-form-item>

                      <el-form-item label="执行类型">
                        <el-select
                          v-model="itemAction.jsoupAction.actionDoType"
                          placeholder="执行类型"
                        >
                          <el-option
                            v-for="(doTypeItem, dIndex) in actionDoTypes"
                            :key="dIndex"
                            :label="doTypeItem.name"
                            :value="doTypeItem.value"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                      <!-- 如果执行类型是输入类型 则要显示字段区块 不可操作 但是点击触发编辑菜单  -->
                      <template
                        v-if="
                          itemAction.jsoupAction.actionDoType == 'input' ||
                          itemAction.jsoupAction.actionDoType == 'goto' ||
                           itemAction.jsoupAction.actionDoType == 'output' ||
                           itemAction.jsoupAction.actionDoType == 'select'
                        "
                      >
                        <el-form-item
                          :label="
                            itemAction.jsoupPragram.programContent == null
                              ? '未命名参数'
                              : itemAction.jsoupPragram.programContent
                          "
                        >
                          <!-- 点击后触发事件 显示修改参数tag -->
                          <el-tag
                            @click="showPragramDetail(itemAction, aIndex)"
                          >{{ itemAction.jsoupPragram.pragramValue }}
                          </el-tag
                          >
                        </el-form-item>
                      </template>
                    </el-form>
                  </el-card>
                </el-col>
              </el-row>
            </el-card>
          </el-card>
        </div>
      </el-col
      >
    </el-row>

    <pargramDialog ref="pragramdialog" @func="getResultData"></pargramDialog>
    <des-comment ref="desComment" @func="getDesData"></des-comment>
  </d2-container>
</template>

<script>
import leidatu from "../../echart-comment/leidatu";
import leidatu2 from "../../echart-comment/leidatu2";
import leidatu3 from "../../echart-comment/leidatu3";
import pargramDialog from "../../dialog-comment/pragramDialog";
import {getOneScript, saveOneMissionAll} from "../../netWork/apiMethod";
import {ActionVo, JsoupPragram, MissionAllData, MissionData} from "../../model/missionAllPojo";
import {deleteMissionData, getIndexOfMissionData, pushMissionData,} from "../../util/DataUtil";
import {ActionDoType} from "../../model/actionDoType";
import {ActionSelectType} from "../../model/actionSelectType";
import tipsShowComment from "../../dialog-comment/tipsShowComment";
import DesComment from "../../dialog-comment/desComment";

export default {
  name: "studentConf",
  components: {
    DesComment,
    leidatu,
    leidatu2,
    leidatu3,
    pargramDialog,
    tipsShowComment
  },
  data() {
    return {
      tempDesWorkWeb: null,
      tempTips: null,
      tempJsoupParam: new JsoupPragram(),
      missionAllDataId: 0,
      missionData: new MissionAllData(),
      missionDataList: [new MissionAllData()],
      tempIndex: null,
      tempPIndex: null,
      selectIndex: null,
      actionDoTypes: new ActionDoType(),
      actionSelectTypes: new ActionSelectType(),
      aIndex: null,
      datalist: null
    };
  },
  mounted() {
    this.getOriginData();
  },
  methods: {
    showDesComment() {
      this.$refs.desComment.initDesData(this.missionData.jsoupMissionAll.maTip)
    },
    getDesData(des) {
      this.missionData.jsoupMissionAll.maTip = des
    },

    backTipsData(tips) {
      this.missionData.jsoupMissionAll.tips = tips
    },
    addNewTip(tips) {
      if (tips == null) {
        tips = this.tempTips
      } else {
        tips = tips + ";" + this.tempTips
      }
      this.missionData.jsoupMissionAll.tips = tips
      this.tempTips = null
      this.initTipsMethod()
    },
    initTipsMethod() {
      this.$refs.tipsShowComment.initData(this.missionData.jsoupMissionAll)
    },
    /**
     * 联网保存脚本
     */
    saveScript() {
      saveOneMissionAll(this.missionData).then((res) => {
        if (res.code == "success") {
          getOneScript(res.maId).then((res) => {
            if (res.code == "error" || res.missionData == null) {
              this.missionData = this.missionDataList[0];
            } else {
              this.missionData = res.missionData;
              pushMissionData(this.missionData);
              this.getIndex();
            }
          });
          this.$message.success("保存成功");
        }
      });
    },
    /**
     * 增加一个全新的脚本集合
     */
    addNewMissionAll() {
      this.missionDataList.push(new MissionAllData());
    },
    /**
     * 下降一个mission
     */
    downChangeLineMission(missionDataList, index) {
      if (index == missionDataList.length - 1) {
        this.$message({
          message: "已经是最下层啦！",
          type: "warning",
        });
      } else {
        missionDataList[index].jsoupMissionOrder.moRank++;
        missionDataList[index + 1].jsoupMissionOrder.moRank--;
        pushMissionData(this.missionData);
        this.getIndex();
        let tempRank = 1;
        for (let i = 0; i < missionDataList.length; i++) {
          missionDataList[i].jsoupMissionOrder.moRank = tempRank;
          tempRank++;
        }
      }
    },

    /**
     * 上调一个mission
     */
    upChangeLineMission(missionDataList, index) {
      if (index == 0) {
        this.$message({
          message: "已经是最上层啦！",
          type: "warning",
        });
      } else {
        missionDataList[index].jsoupMissionOrder.moRank--;
        missionDataList[index - 1].jsoupMissionOrder.moRank++;
        pushMissionData(this.missionData);
        this.getIndex();
        let tempRank = 1;
        for (let i = 0; i < missionDataList.length; i++) {
          missionDataList[i].jsoupMissionOrder.moRank = tempRank;
          tempRank++;
        }
      }
    },

    /**
     * 删除一个mission
     */
    deleteLineMission(missionDataList, index) {
      if (missionDataList.length == 1) {
        this.$message({
          message: "这是最后一个啦，无法删除",
          type: "warning",
        });
        return;
      }
      missionDataList.splice(index, 1);
      pushMissionData(this.missionData);
      this.getIndex();
      //重新排序rank
      let tempRank = 1;
      for (let i = 0; i < missionDataList.length; i++) {
        missionDataList[i].jsoupMissionOrder.moRank = tempRank;
        tempRank++;
      }
    },

    /**
     * 增加一个全新的mission
     */
    addLineMission(missionDataList, index) {
      let tempMission = MissionData();

      // 创造假的 mission id 最小负数

      let tempId = -1;
      for (let i = 0; i < missionDataList.length; i++) {
        if (tempId >= missionDataList[i].jsoupMission.missionId) {
          tempId--;
        }
      }
      tempMission.jsoupMission.missionId = tempId;
      //赋值下一层的 missionRank 并且下调之后的rank
      tempMission.jsoupMissionOrder.moRank =
        missionDataList[index].jsoupMissionOrder.moRank + 1;
      for (let b = index + 1; b < missionDataList.length; b++) {
        missionDataList[b].jsoupMissionOrder.moRank++;
      }
      //插入数据
      missionDataList.splice(index + 1, 0, tempMission);
      //重新排序
      pushMissionData(this.missionData);
      this.getIndex();
    },

    /**
     * 向下移动rank
     */
    downChangeLineAction(actionVos, aindex) {
      if (aindex == actionVos.length - 1) {
        this.$message({
          message: "已经是最下层啦！",
          type: "warning",
        });
      } else {
        let tempRank = actionVos[aindex + 1].actionOrder.rank;
        actionVos[aindex + 1].actionOrder.rank =
          actionVos[aindex].actionOrder.rank;
        actionVos[aindex].actionOrder.rank = tempRank;
        // pushMissionData(this.missionData);
        this.getIndex();
      }
    },

    /**
     * 上移动rank
     */
    upChangeLineAction(actionVos, aindex) {
      if (aindex == 0) {
        this.$message({
          message: "已经是最上层啦！",
          type: "warning",
        });
      } else {
        let tempRank = actionVos[aindex - 1].actionOrder.rank;
        actionVos[aindex - 1].actionOrder.rank =
          actionVos[aindex].actionOrder.rank;
        actionVos[aindex].actionOrder.rank = tempRank;
        pushMissionData(this.missionData);
        this.getIndex();
        console.log(this.missionData);
      }
    },

    /**
     * 删除一个actionVo
     */
    deleteLineAction(actionVos, aindex) {
      if (actionVos.length == 1) {
        this.$message({
          message: "这是最后一个啦，无法删除",
          type: "warning",
        });
        return;
      }
      actionVos.splice(aindex, 1);
      //重新对rank 进行排序
      pushMissionData(this.missionData);
      this.getIndex();
      let tempRank = 1;
      for (let i = 0; i < actionVos.length; i++) {
        actionVos[i].actionOrder.rank = tempRank;
        tempRank++;
      }
    },

    /**
     * 增加一个actionVo
     */
    addLineAction(actionVos, aindex) {
      let tempActionVo = new ActionVo()
      //设置合适的action rank
      tempActionVo.actionOrder.rank = actionVos[aindex].actionOrder.rank + 1;
      //给剩余actionVos 的 rank 依次+ 1
      for (let i = aindex + 1; i < actionVos.length; i++) {
        let con = actionVos[i];
        con.actionOrder.rank++;
      }
      //设置合适的action id 为负数
      let min = -1;
      for (let b = 0; b < actionVos.length; b++) {
        if (actionVos[b].jsoupAction.actionId <= min) {
          min--;
        }
      }
      //设置最小值为actionVo
      tempActionVo.jsoupAction.actionId = min;
      //设置合适的mission等其他参数
      if (aindex == actionVos.length - 1) {
        actionVos.push(tempActionVo);
      } else {
        actionVos.splice(aindex + 1, 0, tempActionVo);
      }
      pushMissionData(this.missionData);
      this.getIndex();
      let tempRank = 1;
      for (let i = 0; i < actionVos.length; i++) {
        actionVos[i].actionOrder.rank = tempRank;
        tempRank++;
      }
    },

    /**
     * 获取子组件的传值
     */
    getResultData() {
      //获取temp 任务数据
      pushMissionData(this.missionData);
      this.getIndex();
    },
    /**
     * 选择不同的列表
     */
    selectMission(index) {
      this.$confirm("切换或者删除该脚本, 是否继续?", "提示", {
        confirmButtonText: "切换",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.missionData = this.missionDataList[index];
          this.selectIndex = index;
        })
        .catch(() => {

        });
    },

    //初始化数据
    getOriginData() {
      if (this.$store.state.maId) {
        //赋值 如果是跳转时带着id参数
        this.missionAllDataId = this.$store.state.maId;
       this.getScript();
        //如果是复制过来的 则初始化参数
      } else {
        this.missionData = new MissionAllData();
      }
      pushMissionData(this.missionData);
      this.getIndex();
      this.initTipsMethod()
    //
    },
    copyMissionData (maData) {
      let missionData = maData
      missionData.jsoupMissionAll.maId = -1n
      for (let i = 0; i < missionData.missionDataList.length; i++) {
        missionData.missionDataList[i].jsoupMission.missionId = -1
        for (let j = 0; j < missionData.missionDataList[i].actionVos.length; j++) {
          missionData.missionDataList[i].actionVos[j].jsoupAction.actionId = -1
          if ( missionData.missionDataList[i].actionVos[j].jsoupPragram && missionData.missionDataList[i].actionVos[j].jsoupPragram!=null) {
            missionData.missionDataList[i].actionVos[j].jsoupPragram.pragramId  = -1
          }
          }
      }
      this.missionData = missionData

    },
    //获取脚本
    getScript() {
       getOneScript(this.missionAllDataId).then((res) => {
        if (res.code == "error" || res.missionData == null) {
          this.missionData = MissionData();
        } else {
          this.missionData = res.missionData;
          if (this.$store.state.isCopy === 1) {
            console.log("进入重定义")
            this.copyMissionData(this.missionData)
            this.$store.state.isCopy = 0
          }
          this.getIndex();
          this.initTipsMethod()
        }
      });
    },
    //排序数据 获得序列化数据
    getIndex() {
      let missionDto = this.missionData;
      this.missionData = getIndexOfMissionData([missionDto])[0];
    },
    //显示编辑参数的弹出框
    showPragramDetail(actionVo, aIndex) {
      this.aIndex = aIndex;
      this.$refs.pragramdialog.initData(actionVo);
    },

    //删除  datas
    deleteMissionDatasHow(index) {
      let datas = this.missionDataList;
      deleteMissionData(datas[index].jsoupMissionAll.maId);
      this.missionDataList = this.$store.state.missionDatas;
      this.missionData = this.missionDataList[0];
    },
    //增加参数
    addPragram(index) {
      let datas = this.missionData;
      let pragrams = datas.missionDataList[index].jsoupPragrams;
      pragrams.push(new JsoupPragram());
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
