<template>
  <el-dialog
    title="举报"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose">
      <el-form>
        <el-form-item label="举报内容">
            <el-input
              type="textarea"
              v-model="complaint.des"
            ></el-input>
        </el-form-item>
        <el-form-item label="举报类别">
          <el-select v-model="complaint.desType">
            <el-option value="描述不符合"></el-option>
            <el-option value="无法执行"></el-option>
            <el-option value="内容不适"></el-option>
            <el-option value="违反相关政策法规"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
  </el-dialog>
</template>

<script>
import {sendComplaint} from "./netWork/apiMethod";
import {ComplaintVo} from "./model/ComplaintVo";

export default {
  name: "SendCommentComponent",
  methods:{
    onSubmit() {
      sendComplaint(this.complaint).then(
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
      this.complaint.typeId = type
      this.complaint.connectId = id
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
      complaint:new ComplaintVo(),
      colors: ['#007cff', '#F7BA2A', '#ff0010']  // 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
    }
  },

}
</script>

<style scoped>

</style>
