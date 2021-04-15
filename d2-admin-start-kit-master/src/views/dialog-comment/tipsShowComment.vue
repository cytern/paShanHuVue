<template>
   <div>
     <el-tag @click="removeTip(item)" v-for="(item , index) in tipsProp" :key="index" style="margin-right: 20px">{{item}}</el-tag>
   </div>
</template>

<script>
export default {
  name: "tipsShowComment",
  data () {
    return {
       tipsProp:[]
    }
  },
  methods: {
    initData(jsoupMissionAll) {
      if (jsoupMissionAll.tips == null) {
        return
      }
      this.tipsProp = jsoupMissionAll.tips.split(";");
    },
    removeTip (item) {
      for (let i = 0; i < this.tipsProp.length; i++) {
        if (this.tipsProp[i] == item) {
          this.tipsProp.splice(i,1)
          break;
        }
      }
      this.$emit('func',this.tipsProp.toString())
    }
  }
}
</script>

<style scoped>

</style>
