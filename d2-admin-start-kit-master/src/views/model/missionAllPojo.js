export default    {
    orders: [
      {
        missionOrderId: null,
        moMissionId: null,
        moMissionAllId: null,
        moAddTime: null,
        moRank: null
      }
    ],
    missionDataList: [
      {
        jsoupMission: {
          missionId: null,
          missionName: null,
          startActionId: null,
          noticeEmail: null,
          endTagContains: null,
          missionStartUrl: null,
          missionSuccessExcelName: null
        },
        actionList: [
          {
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
            actionElePragramId: null
          },
        ],
        actionVos: [
          {
            jsoupAction: {
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
              actionElePragramId: null
            },
            actionOrder: {
              actionOrderId: null,
              actionId: null,
              missionId: null,
              missionAllId: null,
              rank: null
            },
            jsoupPragram: {
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
              programContent: null
            }
          },
        ],
        jsoupMissionOrder: {
          missionOrderId: null,
          moMissionId: null,
          moMissionAllId: null,
          moAddTime: null,
          moRank: null
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
            programContent: null
          }
        ],
        actionOrders: [
          {
            actionOrderId: null,
            actionId: null,
            missionId: null,
            missionAllId: null,
            rank: null
          },
        ]
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
      userId: null
    },
    isOwner: null
  }

/**
 * 返回一个mission 对象
 */
  export function newMission () {
    return     {
      jsoupMission: {
        missionId: null,
        missionName: null,
        startActionId: null,
        noticeEmail: null,
        endTagContains: null,
        missionStartUrl: null,
        missionSuccessExcelName: null
      },
      actionList: [
        {
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
          actionElePragramId: null
        },
      ],
      actionVos: [
        {
          jsoupAction: {
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
            actionElePragramId: null
          },
          actionOrder: {
            actionOrderId: null,
            actionId: null,
            missionId: null,
            missionAllId: null,
            rank: null
          },
          jsoupPragram: {
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
            programContent: null
          }
        },
      ],
      jsoupMissionOrder: {
        missionOrderId: null,
        moMissionId: null,
        moMissionAllId: null,
        moAddTime: null,
        moRank: null
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
          programContent: null
        }
      ],
      actionOrders: [
        {
          actionOrderId: null,
          actionId: null,
          missionId: null,
          missionAllId: null,
          rank: null
        },
      ]
    }
  }


  export function newMissionAll (){
    return  {
      orders: [
        {
          missionOrderId: null,
          moMissionId: null,
          moMissionAllId: null,
          moAddTime: null,
          moRank: 1
        }
      ],
      missionDataList: [
        {
          jsoupMission: {
            missionId: -1,
            missionName: null,
            startActionId: null,
            noticeEmail: null,
            endTagContains: null,
            missionStartUrl: null,
            missionSuccessExcelName: null
          },
          actionList: [
            {
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
              actionElePragramId: null
            },
          ],
          actionVos: [
            {
              jsoupAction: {
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
                actionElePragramId: null
              },
              actionOrder: {
                actionOrderId: null,
                actionId: null,
                missionId: null,
                missionAllId: null,
                rank: 1
              },
              jsoupPragram: {
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
                programContent: null
              }
            },
          ],
          jsoupMissionOrder: {
            missionOrderId: null,
            moMissionId: null,
            moMissionAllId: null,
            moAddTime: null,
            moRank: null
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
              programContent: null
            }
          ],
          actionOrders: [
            {
              actionOrderId: null,
              actionId: null,
              missionId: null,
              missionAllId: null,
              rank: null
            },
          ]
        }
      ],
      jsoupMissionAll: {
        maId: -1,
        maName: '未命名脚本',
        maTip: null,
        malStartUrl: null,
        maSuccessFileName: null,
        maUserId: null,
        maNoticeEmail: null,
        userId: null
      },
      isOwner: null
    }
  }
  
  
