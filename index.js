import {Toolbox} from "./classes/tools"

let toolbox1 = new Toolbox("toolbox1")
toolbox1.addSetting("pSats", (a,b) => {
  return Math.sqrt((a*a)+(b*b))
})

console.log(toolbox1.tools.pSats(4,3))