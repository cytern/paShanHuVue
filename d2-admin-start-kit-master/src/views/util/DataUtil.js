import missionDataPojo from "../model/missionAllPojo"
import store from "@/store/index"

/**
 * 点击编辑时 将数据增加到 本地内存，与vue-x 中
 */
export function pushMissionData(missionData){
  let datas =  store.state.missionDatas
  let tempIndex = null;
   for (let index = 0; index < datas.length; index++) {
       const element = datas[index];
       if(element.jsoupMissionAll.maId == missionData.jsoupMissionAll.maId){
           tempIndex = index
       }
   }
   if(tempIndex == null){
    datas.push(missionData)
   }else{
      datas[tempIndex] = missionData
   }
   //增加 到vue-x 中
   store.state.missionDatas = datas
    reflashMissionData()
}

/**
 * 删除一个maId 对应的对象
 * @param {maId} maId 
 */
export function deleteMissionData(maId){
    let datas =  store.state.missionDatas
    let falg = false
    let indexs = 0;
    for (let index = 0; index < datas.length; index++) {
        const element = datas[index];
        if(element.jsoupMissionAll.maId == maId){
           falg = true
           indexs = index
           break;
        }
    }
    if(falg) {
       datas.splice(indexs,1)
    }
    //同步 到vue-x 中
    store.state.missionDatas = datas
     reflashMissionData()
}



/**
 * 排序  任务 数据
 * @param missionAllDatas missionall的数组对象
 */
export function getIndexOfMissionData (missionAllDatas) {
   //定义一个结果集数组
    let resultList = []
   //第一次for 循环 拿出数组对象中的一个missionallDatas
 for (let a = 0; a < missionAllDatas.length; a++) {
     let element = missionAllDatas[a];
     let missionAllData = element.missionDataList
     //定义一个排序完成的数组
     let indexMissionAllData = []
     //第二次for 循环  拿出一个mission 对象
     for (let b = 0; b < missionAllData.length; b++) {
         const mission = missionAllData[b];
         //获得action 数组
         let actionData = mission.actionVos
         //定义排序好的action 数组
         let indexAction = actionData.sort(compare('actionOrder.rank'))
         //反向赋值 给mission
         mission.actionVos = indexAction
         indexMissionAllData.push(mission)
     }
     //排序 missionAll
     let indexMissionDataAll = indexMissionAllData.sort(compare('jsoupMissionOrder.moRank'))
     element.missionDataList = indexMissionDataAll
     resultList.push(element)
 }

 return resultList;
}
/**
 * 刷新localstorage   的数据  从 vue-x 中
 */
function reflashMissionData() {
  let missionDatas = store.state.missionDatas;
  if(missionDatas == null || missionDatas == []) {
      missionDatas = new missionDataPojo;   
  }
  window.localStorage.setItem('missionData', JSON.stringify(missionDatas))
}


/**
 * 比较方法
 * @param {比较属性} property 
 */
function compare(property){
    return function(a,b){
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
    }
}