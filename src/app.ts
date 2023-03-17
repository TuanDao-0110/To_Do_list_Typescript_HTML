// Define the types and interfaces
interface Todo {
  name: string;
  done: boolean;
}

type Card = {
  id: string;
  todo: Todo;
  element: HTMLElement;
};

const todoForm = document.querySelector("#todo_form") as HTMLFormElement;
const doneList = document.querySelector(".finished") as HTMLDivElement;
const todoList = document.querySelector(".list") as HTMLDivElement;
const cards: Card[] = [];

const handleTodoFormSubmit = (event: Event) => {
  event.preventDefault();
  const form = event.target as HTMLFormElement;
  for (const input of form.elements as unknown as HTMLInputElement[]) {
    if (input.value) {
      const todo: Todo = { name: input.value, done: false };
      addCard(todo);
      input.value = "";
    }
  }
};

const handleTodoListClick = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  const cardElement = target.closest(".card") as HTMLElement;
  const card = cards.find((c) => c.element === cardElement);
  if (!card) return;

  if (target.matches(".toDo")) {
    deleteCard(card);
  } else if (target.matches(".done")) {
    toggleCardDone(card);
  }
};

const addCard = (todo: Todo) => {
  const index = cards.length + Math.random() * 10000
  const id = `card_${index + Math.random() * 10000}`;
  const element = document.createElement("form");
  element.className = "card";
  element.id = id;
  element.innerHTML = `
    <p><span class="title">${todo.name}</span></p>
    <input type="checkbox" id="done_${index}" name="done_${index}" class="done" ${todo.done ? "checked" : ""} />
    <label for="done_${index}"><i class="fa check fa-check"></i></label>
    <input type="checkbox" id="trash_${index}" name="trash_${index}" class="toDo" />
    <label for="trash_${index}"><i class="fa trash fa-trash-alt"></i></label>
  `;
  todoList.appendChild(element);
  const card: Card = { id, todo, element };
  cards.push(card);
};

const deleteCard = (card: Card) => {
  card.element.remove();
  cards.splice(cards.indexOf(card), 1);
};

const toggleCardDone = (card: Card) => {
  const doneInput = card.element.querySelector(".done") as HTMLInputElement;
  if (!doneInput) return;
  if (doneInput.checked) {
    card.element.classList.add("done__card");
  } else {
    card.element.classList.remove("done__card");
  }
  card.todo.done = doneInput.checked;
};

const render = () => {};

todoForm.addEventListener("submit", handleTodoFormSubmit);
todoList.addEventListener("click", handleTodoListClick);
