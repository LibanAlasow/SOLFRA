export default class Toolbox {
  constructor(name) {
    this.name = name
    this.tools = {}
  }

  addSetting(name, func) {
    this.tools[name] = func
  }
}