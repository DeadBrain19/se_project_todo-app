import { initialTodos, validationConfig } from "../utils/constants.js";
import { Todo } from "../components/Todo.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../utils/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

//DOM Elements
const addTodoButton = document.querySelector(".button_action_add");
const addTodoForm = document.forms["add-todo-form"];

//Enable form validation
const formValidator = new FormValidator(validationConfig, addTodoForm);
formValidator.enableValidation();

//Function to create new todos
const renderTodo = (item) => {
  const todo = new Todo(item, "#todo-template", {
    handleTodoDelete: (wasCompleted) => {
      todoCounter.updateTotal(false);
      if (wasCompleted) {
        todoCounter.updateCompleted(false);
      }
    },
    handleTodoComplete: (isCompleted) => {
      isCompleted
        ? todoCounter.updateCompleted(true)
        : todoCounter.updateCompleted(false);
    },
  });
  todoListSection.addItem(todo.getView());
};

//Add new todos upon form submission
const popupForm = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (formInputValues) => {
    formInputValues.date = new Date(formInputValues.date);
    formInputValues.date.setMinutes(
      formInputValues.date.getMinutes() +
        formInputValues.date.getTimezoneOffset()
    );
    renderTodo(formInputValues);
    formValidator.resetValidation();
    popupForm.close();
    todoCounter.updateTotal(true);
  },
});

popupForm.setEventListeners();

addTodoButton.addEventListener("click", () => {
  popupForm.open();
});

const todoListSection = new Section({
  items: initialTodos,
  renderer: (item) => {
    renderTodo(item);
  },
  containerSelector: ".todos__list",
});

todoListSection.renderItems();

const todoCounter = new TodoCounter(initialTodos, ".counter__text");
