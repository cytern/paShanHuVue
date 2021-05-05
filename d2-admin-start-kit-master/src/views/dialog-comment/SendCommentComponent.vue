<template>
  <el-dialog
    title="编写评价"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose">
      <el-form>
        <el-form-item label="评价内容">
            <el-input
              type="textarea"
              v-model="sendComment.comment"
            ></el-input>
        </el-form-item>
        <el-form-item label="评分">
          <el-rate
            v-model="sendComment.rate"
            :colors="colors">
          </el-rate>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
  </el-dialog>
</template>

<script>
import {sendComment} from "../netWork/apiMethod";

export default {
  name: "SendCommentComponent",
  methods:{
    onSubmit() {
      sendComment(this.type,this.id,this.sendComment).then(
        res => {
          if (res.code == "success") {
            this.$message.success(res.msg)
            this.dialogVisible = false
          }
        }
      )
    },
    initData (id,type) {
       this.id = id
       this.type = type
      this.dialogVisible = true
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  },
  data () {
    return{
      dialogVisible: false,
      id: null,
      type: null,
      sendComment: {
        rate: 0,
        comment: null,
      },
      colors: ['#007cff', '#F7BA2A', '#ff0010']  // 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
    }
  },

}
</script>

<style scoped>

</style>
