import apiBook from "@/views/netWork/apiBook";
import {axiosGet, axiosPost, axiosPostJson} from "@/views/netWork/axiosAll";
import userPojo from "@/views/model/userPojo"

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
export function sendJsoupMission(maId){
    let url = apiBook.customer.sendExcutor
    return axiosPostJson(url+"/"+maId)
}
/**
 * 保存任务
 * @param {参数} missionAllData 
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
   let userVo = userPojo; 
   userVo.jsoupUser.username = userName;
   userVo.jsoupUser.password = userPassword;
   return  axiosPostJson(url,userVo)

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