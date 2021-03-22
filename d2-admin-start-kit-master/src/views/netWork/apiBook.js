
const linuxUrl = "http://10.147.19.98:2060/"
const windowsUrl = "http://localhost:2060/"
const baseUrl = windowsUrl
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
  },
  other: {
    downloadExcel: baseUrl + "server/other/downloadFile"    
  }
}
