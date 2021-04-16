export function CronSelectType () {
  let temp = [
    {
      name:"30分钟一次",
      value:"0 */30 * * * ?"
    },
    {
      name:"一小时一次",
      value:"0 0 */1 * * ?"
    },
    {
      name:"每天早八点",
      value:"0 0 8 * * ?"
    },
    {
      name:"每天凌晨一点",
      value:"0 0 1 * * ?"
    },
    {
      name:"周一到周五凌晨一点",
      value:"0 0 1 ? * MON-FRI"
    },
  ]
return temp
}
