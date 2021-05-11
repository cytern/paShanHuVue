import {JsoupPragram} from "@/views/model/missionAllPojo";
import {TimeTask} from "@/views/model/timeTaskVo";

export function TaskAddVo () {
  let temp = {
    pragrams: [new JsoupPragram()],
    timeTaskVo: new TimeTask()
  }
  return temp;
}
