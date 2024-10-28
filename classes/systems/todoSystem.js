import Toolbox from "/classes/tools.js";
import TodoList from "/classes/todolist.js";
import Todo from "/classes/todo.js";

class TodoSystem {
  constructor() {
    this.list = new TodoList();
    this.toolbox = new Toolbox("Todo System");

    this.toolbox.tools = {
      addTodo: (name) => {
        let todo = new Todo(name);
        this.list.todos[todo.id] = todo;
        this.triggers.todoAdded(todo);
      },
      removeTodo: (id) => {
        let fordelete = this.list.todos[id];
        delete this.list.todos[id];
        this.triggers.todoRemoved(fordelete);
      },
      finishTodo: (id) => {
        this.list.todos[id].finish((res) => {
          if (res == false) {this.list.todos[id].finished = false}
          this.updateView();
        });
        this.triggers.todoFinished(this.list.todos[id]);
      },
      clearFinished: () => {
        for (let id in this.list.todos) {
          if (this.list.todos[id].finished) {
            this.list.removeTodo(id);
          }
        }
        this.updateView();
      },
      clearAll: () => {
        this.list.todos = {};
        this.triggers.todoCleared();
      },
      update: () => {
        this.updateView();
      },
    };

    this.todoAdded = (todo) => {
      console.log("todo added");
    };
    this.todoRemoved = (todo) => {
      console.log("todo removed");
    };
    this.todoFinished = (todo) => {
      console.log("todo finished");
    };
    this.todoCleared = () => {
      console.log("todo cleared");
    };

    this.triggers = {
      todoAdded: (todo) => {
        this.todoAdded(todo);
        this.updateView();
      },
      todoRemoved: (todo) => {
        this.todoRemoved(todo);
        this.updateView();
      },
      todoFinished: (todo) => {
        this.todoFinished(todo);
        this.updateView();
      },
      todoCleared: () => {
        this.todoCleared();
        this.updateView();
      },
    };

    let inputdiv = document.querySelector(".inputdiv");
    inputdiv.onsubmit = (e) => {
      e.preventDefault();
      if (inputdiv.querySelector("input").value == "") {
        return;
      }
      this.toolbox.tools.addTodo(inputdiv.querySelector("input").value);
      inputdiv.querySelector("input").value = "";
    };
  }

  updateView() {
    const todoDiv = document.querySelector("#todoList");

    const embed = (name, finished, id) => {
      let tick = finished
        ? `<ion-icon name="checkmark-outline"></ion-icon>`
        : ``;
      let style = finished ? `text-decoration: line-through; color: grey` : ``;

      let code = `<div class="todo" id="${id}">
                        <div class="circle">
                            <div class="innercircle">
                                ${tick}
                            </div>
                        </div>
                        <p class="name" style="${style}">${name}</p>
                    </div>`;
      return code;
    };
    var substitution = ``;
    todoDiv.innerHTML = ``;
    for (let id in this.list.todos) {
      let current = this.list.todos[id];
      substitution += embed(current.todo, current.finished, id);
    }
    todoDiv.innerHTML = substitution;

    document.querySelectorAll(".todo").forEach((b) => {
      b.style.cursor = "pointer";
      b.onclick = () => {
        this.finishTodo(b.id);
      };
    });
  }

  addTodo(name) {
    this.toolbox.tools.addTodo(name);
  }
  removeTodo(id) {
    this.toolbox.tools.removeTodo(id);
  }
  finishTodo(id) {
    this.toolbox.tools.finishTodo(id);
  }
  clearFinished() {
    this.toolbox.tools.clearFinished();
  }
  clearAll() {
    this.toolbox.tools.clearAll();
  }
}

export default TodoSystem;
