export default {
    jsoupUser:jsoupUser(),
    jsoupUserDetail: new JsoupUserDetail(),
    jsoupUserAssets: {
        userAssetsId: null,
        userId: null,
        cornNum: null,
        goldNum: null,
        serialVersionUID: null
    },
    orders: [{
        orderId: null,
        userId: null,
        missionAllId: null,
        createTime: null,
        serialVersionUID: null
    }],
    list: [{
        orders: [{
            missionOrderId: null,
            moMissionId: null,
            moMissionAllId: null,
            moAddTime: null,
            moRank: null,
            serialVersionUID: null
        }],
        missionDataList: [
            {
                jsoupMission: {
                    missionId: null,
                    missionName: null,
                    startActionId: null,
                    noticeEmail: null,
                    endTagContains: null,
                    missionStartUrl: null,
                    missionSuccessExcelName: null,
                    serialVersionUID: null
                },
                actionList: [{
                    action: {
                        actionId: null,
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
                }],
                jsoupMissionOrder: {
                    missionOrderId: null,
                    moMissionId: null,
                    moMissionAllId: null,
                    moAddTime: null,
                    moRank: null,
                    serialVersionUID: null
                },
                jsoupPragrams: [
                    {
                        pragramId: null,
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
                ],

            }


        ],
        jsoupMissionAll: {
            maId: null,
            maName: null,
            maTip: null,
            malStartUrl: null,
            maSuccessFileName: null,
            maUserId: null,
            maNoticeEmail: null,
            userId: null,
            serialVersionUID: null
        }

    }]
}
/**
 * 构造方法
 */
export function userPojo(){
 let userPojo = {
    jsoupUser:jsoupUser(),
    jsoupUserDetail: new JsoupUserDetail(),
    jsoupUserAssets: {
        userAssetsId: null,
        userId: null,
        cornNum: null,
        goldNum: null,
        serialVersionUID: null
    },
    orders: [{
        orderId: null,
        userId: null,
        missionAllId: null,
        createTime: null,
        serialVersionUID: null
    }],
    list: [{
        orders: [{
            missionOrderId: null,
            moMissionId: null,
            moMissionAllId: null,
            moAddTime: null,
            moRank: null,
            serialVersionUID: null
        }],
        missionDataList: [
            {
                jsoupMission: {
                    missionId: null,
                    missionName: null,
                    startActionId: null,
                    noticeEmail: null,
                    endTagContains: null,
                    missionStartUrl: null,
                    missionSuccessExcelName: null,
                    serialVersionUID: null
                },
                actionList: [{
                    action: {
                        actionId: null,
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
                }],
                jsoupMissionOrder: {
                    missionOrderId: null,
                    moMissionId: null,
                    moMissionAllId: null,
                    moAddTime: null,
                    moRank: null,
                    serialVersionUID: null
                },
                jsoupPragrams: [
                    {
                        pragramId: null,
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
                ],

            }


        ],
        jsoupMissionAll: {
            maId: null,
            maName: null,
            maTip: null,
            malStartUrl: null,
            maSuccessFileName: null,
            maUserId: null,
            maNoticeEmail: null,
            userId: null,
            serialVersionUID: null
        }

    }]
}
return userPojo;
}


export function jsoupUser () {
    let user = {
        userId: null,
        username: null,
        password: null,
        createTime: null,
        userToken: null,
       userType: null,
        serialVersionUID: null
    }
    return user;
}


export  function JsoupUserDetail () {
  let userDetail ={
    userDetailId: null,
    userRealName: null,
    userNickName: null,
    userImageUrl: null,
    userDes: null,
    userId: null,
    userEmail: null,
    userPhone: null,
    userSalenum: null,
    userGoodrate: null,
    userLever: null,
    serialVersionUID: null
  }
  return userDetail;
}

export function JsoupUserAssets () {
  let temp = {
    userAssetsId: null,
    userId: null,
    cornNum: null,
    goldNum: null,
    serialVersionUID: null
  }
  return temp
}

export function UserVo () {
  let userVo = {
    jsoupUser:new jsoupUser(),
    jsoupUserDetail: new JsoupUserDetail(),
    jsoupUserAssets: new JsoupUserAssets(),
    jsoupUserOrderList: [],
    missionAllDataList: []

  }
  return userVo
}
