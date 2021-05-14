import {JsoupUserDetail} from "./userPojo";

export function ArticleSearchVo() {
  let temp = {
    userId: null,
    title: null
  }
  return temp;
}

export function ArticleTitleListVo() {
  let temp = {
    title: null,
    userId: null,
    userName: null,
    id: null,
    updateTime: null
  }
  return temp;
}

export function ArticleVo () {
  let temp = {
    jsoupArticle: new JsoupArticle(),
    userDetail: new JsoupUserDetail()
  }
  return temp;
}


export function JsoupArticle() {
  let temp  = {
    id: null,
    createTime: null,
    updateTime: null,
    userId: null,
    title: null,
    body: null,
    upNum: null,
    downNum: null,
    serialVersionUID: null
  }
  return temp;
}
