<template>
  <d2-container>
    <template slot="header">
      <el-button type="text" disabled>编写教程</el-button>
      <el-input style="width: 50%;margin-left: 50px" v-model="article.title" placeholder="标题"></el-input>
      <el-button type="primary" style="margin-left: 50px" @click="sendSubmit">发布</el-button>
    </template>
    <quill-editor class="editor"
                  ref="myTextEditor"
                  v-model="article.body"
              >
    </quill-editor>

  </d2-container>
</template>

<script>
  import leidatu from "../../echart-comment/leidatu";
  import leidatu2 from "../../echart-comment/leidatu2";
  import leidatu3 from "../../echart-comment/leidatu3";
  import {sendArticle} from "../../netWork/apiMethod";
  import {JsoupArticle} from "../../model/ArticleSearchVo";
export default {
  name: 'studentCharts',
  components:{
    leidatu,
    leidatu2,
    leidatu3,
  },
  data () {
    return{
     article:new JsoupArticle()
    }


  },
  mounted() {
  },
  methods: {
    sendSubmit () {
      sendArticle(this.article).then(
        res => {
          if (res.code == "success") {
            this.$message.success("发布成功")
            this.article = new JsoupArticle()
          }
        }
      )
    }
  }

}
</script>
<style scoped>

</style>
