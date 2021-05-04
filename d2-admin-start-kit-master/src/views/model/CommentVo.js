/**
 * 评论实体类
 * @returns {{deep: null, rootId: null, userName: null, userId: null, cteateTime: null, upNum: null, userLever: null, fatherId: null, typeId: null, comment: null, id: null, connectId: null, downNum: null, userDes: null}}
 * @constructor 构造器
 */
export function CommentVo () {
  let commentVo = {
    id: null,
    fatherId: null,
    typeId: null,
    comment: null,
    upNum: null,
    downNum: null,
    userId: null,
    connectId: null,
    cteateTime: null,
    rootId: null,
    deep: null,
    userName: null,
    userDes: null,
    userLever: null,
    sonList: null
  }
  return commentVo;
}
