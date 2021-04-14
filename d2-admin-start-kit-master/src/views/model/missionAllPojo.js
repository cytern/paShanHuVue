import {JsoupMissionAllHistory} from "./missionHistoryPojo";
export function MissionAllData() {
  let mad = {
    orders: [new JsoupMissionOrder()],
    missionDataList: [new MissionData()],
    jsoupMissionAll: new JsoupMissionAll(),
    isOwner: null,
    isSuccess: null,
    missionAllHistory: new JsoupMissionAllHistory()
  }
  return mad
}

export function MissionData() {
  let md = {
    jsoupMission: new JsoupMission(),
    actionList: [new JsoupAction()],
    actionVos: [new ActionVo()],
    jsoupMissionOrder: new JsoupMissionOrder(),
    jsoupPragrams: [new JsoupPragram()],
    actionOrders: [new JsoupActionOrder()],
  }
  return md
}

export function ActionVo() {
  let av = {
    jsoupAction: new JsoupAction(),
    actionOrder: new JsoupActionOrder(),
    jsoupPragram: new JsoupPragram()
  }
  return av
}

export function JsoupMissionAll() {
  let ma = {
    maId: -1,
    maName: '未命名脚本',
    maTip: null,
    malStartUrl: null,
    maSuccessFileName: null,
    maUserId: null,
    maNoticeEmail: null,
    userId: null,
    maState: null,
    maPrice: null,
    createTime: null,
    maRate: null,
    maSaleNum: null,
    tips: null,
    userName: null,
    isAuto: null,
    maUrl: null
  }
  return ma
}

export function JsoupMissionOrder() {
  let jmo = {
    missionOrderId: -1,
    moMissionId: null,
    moMissionAllId: null,
    moAddTime: null,
    moRank: 1,
    serialVersionUID: null
  }
  return jmo
}

export function JsoupPragram() {
  let jp = {
    pragramId: -1,
    missionId: null,
    actionId: null,
    pragramType: null,
    pragramAccuracy: null,
    isRamdom: null,
    upNum: null,
    downNum: null,
    pragramValue: null,
    missionAllId: null,
    programContent: null,
    serialVersionUID: null
  }
  return jp
}

export function JsoupMission() {
  let jm = {
    missionId: -1,
    missionName: "未命名任务",
    startActionId: null,
    noticeEmail: null,
    endTagContains: null,
    missionStartUrl: null,
    missionSuccessExcelName: null,
    serialVersionUID: null
  }
  return jm
}

export function JsoupActionOrder() {
  let jo = {
    actionOrderId: -1,
    actionId: null,
    missionId: null,
    missionAllId: null,
    rank: 1,
    serialVersionUID: null
  }
  return jo
}

export function JsoupAction() {
  let ja = {
    actionId: -1,
    actionEleType: null,
    actionDoType: null,
    actionUrl: null,
    missionId: null,
    actionEleValue: null,
    actionPreId: null,
    actionAfterId: null,
    actionName: null,
    actionPragramId: null,
    actionElePragramId: null,
    serialVersionUID: null
  }
  return ja
}

export function formateMaData(ma) {
  let tips = ma.tips
  let arry = []
  arry = tips.   split(";");
  ma.tips = arry
  return ma;
}

