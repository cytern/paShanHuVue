<template>
  <el-pagination
    background
    layout="prev, pager, next"
    :total="pageNum"
    :current-page="index"
    :page-size="pageSize"
    @current-change="reFlashPage"
  >
  </el-pagination>
</template>

<script>
export default {
  name: "PageComment",
  data () {
    return {
      pageNum: 10,
      index:1,
      pageSize: 10,
    }
  },
  methods: {
    reFlashPage(currentPage) {
      this.index = currentPage;
    },
    backData() {
      this.$emit('func',this.index,this.pageSize)
    },
    initData (pageNum) {
      this.pageNum = pageNum
    }

  }
}
</script>

<style scoped>

</style>
