
const linuxUrl = "http://62.234.29.109:2060/"
const windowsUrl = "http://localhost:2060/"
const baseUrl = linuxUrl
export default {
  everyOne:{
    login:  baseUrl + "server/everyone/login",
    register: baseUrl + "server/everyone/register",
    forgetPassword: baseUrl + "server/everyone/forgetPassword",
    resetPassword: baseUrl + "server/everyone/resetPassword"


  },
  customer: {
    getMyScript : baseUrl + "server/customer/getMyOrders",
    getMyMissionHistorys : baseUrl + "server/customer/getMyMissionHistory" ,
    getOneScript: baseUrl + "server/customer/getScript",
    saveOneScript: baseUrl + "server/customer/saveMyScript",
    sendExcutor: baseUrl + "server/customer/runJavaSoup",
    getUserInfo: baseUrl + "server/customer/getUserInfo",
    setMaState: baseUrl + "server/customer/setMissionAllState",
    getSalesMa: baseUrl + "server/customer/getSalesMa",
    getSalesMh: baseUrl + "server/customer/getSalesMh",
    setMhState: baseUrl + "server/customer/setMhState",
    buyMa: baseUrl + "server/customer/buyMa",
    buyMh: baseUrl + "server/customer/buyMh",
    getDetailComment:baseUrl + "server/customer/getGoodDetailComment",
    getDetailUser: baseUrl + "server/customer/getGoodDetailUsaer",
    updateUserDetail: baseUrl + "server/customer/updateUserInfo",
    /**
     * maId  corn times
     */
    addTimeTaskMission: baseUrl + "server/customer/addTimeTaskMission",
    /**
     * mhId corn times
     */
    updateTimeTaskMission: baseUrl + "server/customer/updateTimeTaskMission",
    /**
     * mhId
     */
    deleteTimeTaskMission: baseUrl + "server/customer/deleteTimeTaskMission",
    /**
     * 获取商品列表
     */
    getGoodList: baseUrl + "server/customer/getGoodsList",

    /**
     * 发送评价
     */
    sendComment: baseUrl + "server/customer/sendComment",
    /**
     * 发送举报
     */
    sendComplaint: baseUrl + "server/customer/sendComplaint",
    /**
     * 获取订单列表
     */
    getGoodsOrder: baseUrl + "server/customer/getGoodsOrder",
    /**
     * 获取文章标题列表
     */
    getArticleList: baseUrl + "server/customer/getArticleList",
    /**
     * 发送文章
     */
    sendArticle: baseUrl + "server/customer/sendArticle",
    /**
     * 获取全部的参数
     */
    getAllParams: baseUrl + "server/customer/getAllParameters",
    /**
     * 更新一个参数
     */
    updateOneParams: baseUrl + "server/updateOneParameter"
  },
  other: {
    downloadExcel: baseUrl + "server/other/downloadFile"
  }
}
