import apiBook from "@/views/netWork/apiBook";
import {axiosGet, axiosPost, axiosPostJson} from "@/views/netWork/axiosAll";
import {userPojo,jsoupUser} from "@/views/model/userPojo"
import store from '@/store/index'
import {Notification} from 'element-ui'
import {TaskAddVo} from "@/views/model/TaskAddVo";


/**
 * 获取一个人的执行器
 * @returns {*}
 */
export function getOnesExecutor() {
  let url  = apiBook.customer.getOneExecutor
  return axiosPostJson(url)
}
/**
 * 获取一个人的历史
 * @returns {*}
 */
export function getOneHistory() {
  let url = apiBook.customer.getOneHistory
  return axiosPostJson(url)
}
/**
 * 管理工厂 获取对应的参数
 * @param index
 * @param pageSize
 * @param typeUrl
 */
export function managerMethod (index, pageSize, typeUrl, data) {
  let url = apiBook.manager.switchManagerUrl(index,pageSize,typeUrl)
  return axiosPostJson(url,data)
}
/**
 * 更新某个参数
 * @param jsoup
 * @returns {*}
 */
export function updateParameters (jsoup) {
  let url = apiBook.customer.updateOneParams
  return axiosPostJson(url,jsoup)
}
/**
 * 获取参数列表
 * @param maId
 * @returns {*}
 */
export function getAllParameters(maId) {
  let url = apiBook.customer.getAllParams  + "/" + maId
  return axiosPostJson(url)
}
/**
 * 发布文章
 * @param article
 * @returns {*}
 */
export function sendArticle(article) {
  let url = apiBook.customer.sendArticle
  return axiosPostJson(url,article)
}
/**
 * 获取文章列表
 * @param pageSize
 * @param index
 * @returns {*}
 */
export function getArticleList(pageSize,index,searchVo) {
  let url = apiBook.customer.getArticleList + "/" +index + "/" + pageSize
  return axiosPostJson(url,searchVo)
}
/**
 * 获取订单列表
 * @returns {*}
 */
export function getGoodOrders () {
  let url = apiBook.customer.getGoodsOrder
  return axiosPostJson(url)
}
/**
 * 发送举报
 * @param complaint
 */
export function sendComplaint(complaint){
  let url = apiBook.customer.sendComplaint
  return axiosPostJson(url,complaint)
}
/**
 * 发送评价
 * @param type
 * @param connectId
 * @param commentRequest
 * @returns {*}
 */
export function sendComment(type,connectId,commentRequest){
  let url = apiBook.customer.sendComment + "/" + type +"/" + connectId
  return axiosPostJson(url,commentRequest)
}
/**
 * 获取商品列表
 * @param index 页码
 * @param pageSize 页面容量
 * @param type 类型 1脚本 2数据
 */
export function getGoodList(index,pageSize,type,searchData) {
   let url = apiBook.customer.getGoodList + "/" + pageSize + "/" + index + "/" + type
   return axiosPostJson(url,searchData)
}
/**
 * 删除定时任务
 * @param mhId
 * @returns {*}
 */
export function deleteTimeTask (mhId) {
  let url = apiBook.customer.deleteTimeTaskMission + "/" +mhId
  return axiosGet(url)
}
/**
 * 修改定时任务
 * @param mhId
 * @param times
 * @param corn
 * @returns {*}
 */
export function updateTimeTask (mhId,times,corn) {
  let param = {
    id: mhId,
    times: times,
    corn: corn
  }
  let url = apiBook.customer.updateTimeTaskMission
  return axiosPostJson(url,param)
}

/**
 * 添加定时任务
 * @param maId
 * @param times
 * @param corn
 * @returns {*}
 */
export function addTimeTaskMission (maId,times,corn,params) {
  let time = new TaskAddVo();
  time.timeTaskVo.id = maId;
  time.timeTaskVo.times = times,
    time.timeTaskVo.corn = corn
  time.pragrams = params
  let url = apiBook.customer.addTimeTaskMission
  return axiosPostJson(url,time)
}
/**
 * 更新用户信息
 * @param userVo
 * @returns {*}
 */
export function updateUserDetail (userVo) {
  let url = apiBook.customer.updateUserDetail
  return axiosPostJson(url,userVo)
}

/**
 * 获取用户信息
 * @returns {*}
 */
export function getUserData () {
  let url = apiBook.customer.getUserInfo
  return axiosPostJson(url)
}
/**
 * 获取作品的用户信息
 * @param id
 * @param type
 * @returns {*}
 */
export function getDetailUser (id,type) {
  let url = apiBook.customer.getDetailUser + "/" + id + "/"  + type
  return axiosGet(url)
}
/**
 * 获取评论列表
 * @param {*} pageSize  页面大小
 * @param {*} index     页码
 * @param {*} id        id
 * @param {*} type      是否是脚本或者数据集
 */
export function getDetailComment (pageSize,index,id,type) {
    let url = apiBook.customer.getDetailComment + "/" + id + "/" + type + "/" + pageSize + "/" +index
    return axiosPostJson(url)
}
/**
 * 购买一个结果集
 * @param  mhId
 * @returns 提示消息
 */
export function buyMh (mhId) {
  let url = apiBook.customer.buyMh + "/" + mhId
  return axiosPostJson(url)

}
/**
 * 购买一个脚本
 */
export function buyMa (maId) {
  let url = apiBook.customer.buyMa + "/" + maId
  return axiosPostJson(url)

}

/**
 * 设置结果集市场化数据
 * @param {结果集}} mh
 * @returns
 */
export function setMhState (mh) {
  let url = apiBook.customer.setMhState
  return axiosPostJson(url,mh)
}
/**
 * 设置总任务状态
 * @param {总任务}} missionAll
 * @returns
 */
export function setMissionAllState(missionAll){
  let url = apiBook.customer.setMaState
   return axiosPostJson(url,missionAll)

}
/**
 * 获取用户信息  并且存入store 中
 */
export function getUserInfo(){
    let url = apiBook.customer.getUserInfo
       axiosPostJson(url).then(res => {
      if(res.code == "success"){
        store.state.userVo = res.userVo
        window.localStorage.setItem('userVo',JSON.stringify(res.userVo))
          return true;
      }else{
        //提示获取失败
      Notification({
          message: res.msg,
          type: "warning",
        })
      }
    })
}
/**
 * 重设密码
 * @param {用户名} username
 * @param {密码} password
 * @param {验证码} code
 */
export function resetPassword (username,password,code){
    let url = apiBook.everyOne.resetPassword
    let user = new jsoupUser();
    user.username = username
    user.password = password
    user.userToken = code
    return axiosPostJson(url,user)
}
/**
 * 忘记密码
 * @param {忘记密码} userVo
 * @returns
 */
export function forgetPassword(username){
   let url = apiBook.everyOne.forgetPassword + "/" + username
   return axiosPostJson(url)
}
/**
 * 注册用户
 */
export function registerUser(userVo){
        let url = apiBook.everyOne.register
        return axiosPostJson(url,userVo)
}


/**
 * 下载结果集
 * @param {历史id} hisId
 */
export function downloadExcel(hisId){
      let url = apiBook.other.downloadExcel + "/" + hisId
      window.open(url)
}
/**
 * 发送执行任务
 * @param {总任务id} maId
 * @returns
 */
export function sendJsoupMission(maId,timeTaskRequest){
    let url = apiBook.customer.sendExcutor +"/"+maId
    return axiosPostJson(url,timeTaskRequest)
}
/**
 * 保存任务
 * @param {{missionAllHistory: JsoupMissionAllHistory, jsoupMissionAll: JsoupMissionAll, isOwner: null, missionDataList: [MissionData], orders: [JsoupMissionOrder], isSuccess: null}} missionAllData
 */
export function saveOneMissionAll(missionAllData){
    let url = apiBook.customer.saveOneScript
    return axiosPostJson(url,missionAllData)
}
/**
 * 登录
 * @param {用户名} userName
 * @param {密码} userPassword
 */
export function everyOneLogin(userName,userPassword) {
   let url = apiBook.everyOne.login
   let userVo =new userPojo();
   userVo.jsoupUser.username = userName;
   userVo.jsoupUser.password = userPassword;
   return  axiosPostJson(url,userVo)

}
/**
 * 获取能购买的脚本列表
 * @param {页容量}} pageSize
 * @param {页码} index
 * @returns
 */
export function getSalesMa (pageSize,index) {
  let url = apiBook.customer.getSalesMa
  return axiosGet(subPageHelpUrl(url,pageSize,index))
}

/**
 * 获取能购买的结果集列表
 * @param {页容量}} pageSize
 * @param {页码} index
 * @returns
 */
 export function getSalesMh (pageSize,index) {
  let url = apiBook.customer.getSalesMh
  return axiosGet(subPageHelpUrl(url,pageSize,index))
}

/**
 * 获取个人脚本
 */
export function getAllScript (pageSize,index) {
   let url = apiBook.customer.getMyScript
   return axiosGet(subPageHelpUrl(url,pageSize,index))
}
/**
 * 获取个人执行历史
 * @param {页面大小} pageSize
 * @param {页面序号} index
 */
export function getMyMissionHistorys(pageSize,index) {
  let url = apiBook.customer.getMyMissionHistorys
  return axiosGet(subPageHelpUrl(url,pageSize,index))
}

/**
 * 获取一个脚本
 * @param {脚本id} missionAllId
 */
export function getOneScript (missionAllId){
  let url = apiBook.customer.getOneScript
  return axiosGet(url + "/" + missionAllId)
}

/**
 * 分页公共方法 拼接url
 * @param {原始url} url
 * @param {页面大小} pageSize
 * @param {页面序号} index
 */
function subPageHelpUrl (url,pageSize,index) {
  let newUrl = url + "/" + pageSize + "/" + index
  return newUrl;
}
