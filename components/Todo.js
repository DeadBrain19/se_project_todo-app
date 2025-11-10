import { v4 as uuidv4 } from "https://jspm.dev/uuid";

class Todo {
  constructor(data, selector, { handleTodoDelete, handleTodoComplete }) {
    this._id = data.id;
    this._name = data.name;
    this._completed = data.completed;
    this._date = data.date;
    this._templateElement = document.querySelector(selector);
    this._handleTodoDelete = handleTodoDelete;
    this._handleTodoComplete = handleTodoComplete;
  }

  _toggleCheckBox() {
    this._completed = !this._completed;
  }

  _setEventListeners() {
    this._todoDeleteBtnEl.addEventListener("click", () => {
      this._handleTodoDelete(this._completed);
      this._todoElement.remove();
      this._todoElement = null;
    });

    this._todoCheckboxEl.addEventListener("click", () => {
      this._toggleCheckBox();
      this._handleTodoComplete(this._completed);
    });
  }

  getView() {
    // todo template element
    const todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    this._todoElement = todoElement;

    // todo name element
    const todoNameEl = todoElement.querySelector(".todo__name");
    todoNameEl.textContent = this._name;

    // todo checkbox and label elements
    const todoCheckboxEl = todoElement.querySelector(".todo__completed");
    const todoLabelEl = todoElement.querySelector(".todo__label");
    this._todoCheckboxEl = todoCheckboxEl;
    todoCheckboxEl.checked = this._completed;
    todoCheckboxEl.id = uuidv4();
    todoLabelEl.setAttribute("for", `${todoCheckboxEl.id}`);

    // todo date element
    const todoDateEl = todoElement.querySelector(".todo__date");
    const dueDate = new Date(this._date);
    if (!isNaN(dueDate)) {
      todoDateEl.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }

    // todo delete button element
    this._todoDeleteBtnEl = todoElement.querySelector(".todo__delete-btn");
    this._setEventListeners();
    return todoElement;
  }
}

export { Todo };
