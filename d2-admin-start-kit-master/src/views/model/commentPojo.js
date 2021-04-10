/**
 * 评论实体类
 * @returns {{commentDes: null, orderId: number, sentTime: null, userNickName: null, lever: null, userId: number, userDes: null, downNum: null, upNum: null}}
 * @constructor 构造器
 */
export function CommentVo () {
  let commentVo = {
    userId: 0,
    orderId: 0,
    userNickName: null,
    lever: null,
    sentTime: null,
    commentDes: null,
    userDes: null,
    upNum: null,
    downNum: null,
    count: null,
  }
  return commentVo;
}
