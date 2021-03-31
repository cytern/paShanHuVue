/**
 * 详情页面 数据
 * @returns 
 */
export function goodDetail(){
    let ad = {
        id:null,
        name:null,
        des: "大师大管家省略号发客户端老客户了的哈沙鲁克汗发布看看开大上看不到多吃点卡莎是不打开包括对巴萨看不出看吧禁端口坝办事处间羟胺比较快不开的CSABC看吧大师大管家省略号发客户端老客户了的哈沙鲁克汗发布看看开大上看不到多吃点卡莎是不打开包括对巴萨看不出看吧禁端口坝办事处间羟胺比较快不开的CSABC看吧大师大管家省略号发客户端老客户了的哈沙鲁克汗发布看看开大上看不到多吃点卡莎是不打开包括对巴萨看不出看吧禁端口坝办事处间羟胺比较快不开的CSABC看吧大师大管家省略号发客户端老客户了的哈沙鲁克汗发布看看开大上看不到多吃点卡莎是不打开包括对巴萨看不出看吧禁端口坝办事处间羟胺比较快不开的CSABC看吧大师大管家省略号发客户端老客户了的哈沙鲁克汗发布看看开大上看不到多吃点卡莎是不打开包括对巴萨看不出看吧禁端口坝办事处间羟胺比较快不开的CSABC看吧",
        time: null,
        price: null,
        rate: null,
        tips: null,
        userName: null,
        isAuto: null,
        url: null,
        price: null ,
        saleNum: null,
        type: null,    //是脚本 1还是数据 2 
        userId: 1
    }
    return ad;
}
/**
 * 任务变成标准数据
 * @param {} temp 
 * @returns 
 */
export function maToDetail(temp) {
    let acc =new goodDetail();
    acc.id = temp.maId
    acc.name = temp.maName
    acc.des = temp.maTip
    acc.time = temp.createTime
    acc.price = temp.maPrice
    acc.rate = temp.maRate
    acc.tips = temp.tips
    acc.userName = temp.userName
    acc.isAuto = temp.isAuto
    acc.url = temp.maUrl
    acc.price = temp.maPrice
    acc.saleNum = temp.maSaleNum
    acc.type = 1
    acc.userId = temp.userId
    return acc;
}
/**
 * 数据变成标准数据
 * @param {数据} temp 
 * @returns 
 */
export function mhToDetail (temp) {
    let acc =new goodDetail();
    acc.id = temp.missionAllHistoryId
    acc.name = temp.missionAllName
    acc.des = temp.missionAllDis
    acc.time = temp.finishTime
    acc.price = temp.salePrice
    acc.rate = temp.saleRate
    acc.tips = temp.tips
    acc.userName = temp.userName
    acc.isAuto = temp.isAoto
    acc.url = temp.hsUrl
    acc.price = temp.salePrice
    acc.saleNum = temp.saleNum
    acc.userId = temp.userId
    acc.type = 2
    return acc;
}