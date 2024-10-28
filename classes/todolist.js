import Todo from "./todo.js"

export default class TodoList {
  constructor() {
    this.todos = {}
    this.id = String(Math.floor(Math.random()*1000000))
  }

  hey() {console.log("words")}
  addTodo(todo) {
    
    let t = new Todo(todo)
    this.todos[t.id] = t
    return t
  }
  removeTodo(id) {
    delete this.todos[id]
  }
  
}