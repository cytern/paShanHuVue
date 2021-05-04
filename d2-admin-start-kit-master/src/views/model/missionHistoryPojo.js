export default {
    missionAllHistoryId: null,
    missionAllId: null,
    missionState: null,
    missionResultUrl: null,
    userId: null,
    missionFailReason: null,
    sentTime: null,
    finishTime: null,
    missionAllName: null,
    missionAllDis: null
  };
  export function JsoupMissionAllHistory() {
    let mah = {
      missionAllHistoryId: null,
      missionAllId: null,
      missionState: null,
      missionResultUrl: null,
      userId: null,
      missionFailReason: null,
      sentTime: null,
      finishTime: null,
      missionAllName: null,
      missionAllDis: null,
      onSale: null,
      salePrice: null,
      saleRate: null,
      saleNum: null,
      tips: null,
      userName: null,
      isAoto: null,
      hsUrl: null,
      isTimeTask: null,
      timeNum: null,
      timeCorn: null
    }
    return mah;
  }

  export function formateMhData(mh) {
    if (mh == null) {
      return null;
    }
    if (mh.tips == null) {
      return null;
    }
    let tips = mh.tips
    let arry = new Array()
    arry = tips.split(";");
    mh.tips = arry
    return mh;
  }
