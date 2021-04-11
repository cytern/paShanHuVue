<template>
  <d2-container>
    <template slot="header">
      <el-button disabled type="text">个人信息</el-button>
    </template>
    <!--     第一个卡片是个人信息的展示-->
    <el-card class="touxiang1">
      <!--      分三栏 头像  基础信息  等级剩余金额-->
      <el-row>
        <el-col :span="6" name="头像">
          <img src="../../../../public/userFor/touxiang.png" style="width: 70%;height: 70%;border-radius: 50%">
        </el-col>
        <el-col :span="15" name="基础信息">
          <!--          账号名-->
          <el-row style="margin-top: 25px">
            <el-col>
            <span style="color: #bb6a03;font-size: 23px">{{ userInfo.jsoupUserDetail.userNickName }}</span>
            </el-col>
          </el-row>
          <!--          签名-->
          <el-row style="margin-top: 10px">
            <el-col>
            <span style="color: #393d3d">{{ userInfo.jsoupUserDetail.userDes }}</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="3">
          <el-row style="margin-top: 25px">
            <el-col>
              <el-tag style="background-color: #97e297"><i class="fa fa-money" aria-hidden="true"></i>   {{ userInfo.jsoupUserAssets.cornNum }}</el-tag>
            </el-col>
          </el-row>
          <el-row style="margin-top: 15px">
            <el-col>
            <el-tag style="background-color: #ffd49f"><i class="fa fa-credit-card-alt" aria-hidden="true"></i> {{ userInfo.jsoupUserAssets.goldNum }}</el-tag>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-card>

    <el-card style="margin-top: 20px">
      <el-form ref="form" :model="userInfo" label-width="80px">
        <el-form-item  label="账号: " style="margin-top: 30px">
          <el-input style="width: 30%" disabled v-model="userInfo.jsoupUser.username"></el-input>
        </el-form-item>
        <el-form-item label="昵称: " style="margin-top: 30px">
          <el-input style="width: 30%"  v-model="userInfo.jsoupUserDetail.userNickName"></el-input>
        </el-form-item>
        <el-form-item label="姓名: " style="margin-top: 30px">
          <el-input style="width: 30%"  v-model="userInfo.jsoupUserDetail.userRealName"></el-input>
        </el-form-item>
        <el-form-item label="邮箱: " style="margin-top: 30px">
          <el-input style="width: 30%" disabled  v-model="userInfo.jsoupUserDetail.userEmail"></el-input>
        </el-form-item>
        <el-form-item label="电话: " style="margin-top: 30px">
          <el-input style="width: 30%"  v-model="userInfo.jsoupUserDetail.userPhone"></el-input>
        </el-form-item>
        <el-form-item label="出货量: " style="margin-top: 30px">
          <el-input style="width: 30%" disabled  v-model="userInfo.jsoupUserDetail.userSalenum"></el-input>
        </el-form-item>
        <el-form-item label="总体评分: " style="margin-top: 30px">
          <el-input style="width: 30%" disabled  v-model="userInfo.jsoupUserDetail.userGoodrate"></el-input>
        </el-form-item>
        <el-form-item label="等级: " style="margin-top: 30px">
          <el-input style="width: 30%" disabled  v-model="userInfo.jsoupUserDetail.userLever"></el-input>
        </el-form-item>

        <el-form-item label="签名: " style="margin-top: 30px">
          <el-input type="text" style="width: 80%"   v-model="userInfo.jsoupUserDetail.userDes"></el-input>
        </el-form-item>
        <el-form-item style="margin-top: 30px">
          <el-button type="primary" @click="upDateUserInfo">修改</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </d2-container>
</template>

<script>
import leidatu from "../../echart-comment/leidatu";
import leidatu2 from "../../echart-comment/leidatu2";
import leidatu3 from "../../echart-comment/leidatu3";
import {getUserData,updateUserDetail} from "../../netWork/apiMethod";
import {UserVo} from "../../model/userPojo";

export default {
  name: 'studentConf',
  components: {
    leidatu,
    leidatu2,
    leidatu3
  },
  data() {
    return {
      userInfo: new UserVo()
    }

  },
  mounted() {
    this.getUserData()
  },
  methods: {
    upDateUserInfo () {
      updateUserDetail(this.userInfo).then(
        res => {
          if (res.code == "success") {
            this.$message.success("修改成功");
          }
        }
      )
    },
    getUserData() {
      getUserData().then(
        res => {
          if (res.code === "success") {
            this.userInfo = res.userVo
          }
        }
      )
    }
  }

}
</script>

<style>
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

.touxiang1 {
  background: linear-gradient(to bottom, #47ff7b,#ffffff, #ffffff);
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
  background-image: -webkit-linear-gradient(left, #1c006f, #d5df13 10%, #bb6a03 20%, #37001e 30%, #1b001d 40%, #1a000a 50%, #191a00 60%, #051600 70%, #1b001d 80%, #1a000a 90%, #191a00 100%);
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

  background-image: -webkit-linear-gradient(left, #1c006f, #d5df13 10%, #bb6a03 20%, #37001e 30%, #1b001d 40%, #1a000a 50%, #191a00 60%, #051600 70%, #1b001d 80%, #1a000a 90%, #191a00 100%);
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
