export default class Todo {
  constructor(todo) {
    this.todo = todo
    this.id = String(Math.floor(Math.random()*1000000))
    this.finished = false
  }

  finish(callback) {
    if (this.finished == false) {this.finished = true; callback(true)} else {callback(false)}
  }
}