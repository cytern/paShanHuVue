const baseUrl = "http://localhost:2060/"
export default {
  everyOne:{
    login:  baseUrl + "server/everyone/login",
    register: baseUrl + "server/everyone/register"

  },
  customer: {
    getMyScript : baseUrl + "server/customer/getMyOrders",
    getMyMissionHistorys : baseUrl + "server/customer/getMyMissionHistory" ,
    getOneScript: baseUrl + "server/customer/getScript",
    saveOneScript: baseUrl + "server/customer/saveMyScript"    
  },
  student:{
    getAbility: baseUrl + "student/getMyAbility",
    getTitle: baseUrl + "student/getTiles",
    editTitle: baseUrl + "student/updateTitle",
    deleteTitle: baseUrl  +"student/deleteTitle/",
    addTitle: baseUrl  + "student/addTitle"
  }
}
