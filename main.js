// Elementos do DOM
const addButton = document.querySelector("#addButton");
const inputText = document.querySelector("#input-text");
const toDoContainer = document.querySelector(".todo-container");


// Itens da lista de tarefas
let toDoList = [];

// Adiciona um item na lista de tarefas
function addTodoItem(text) {
  const newItem = {
    id: Date.now(),
    text,
    isChecked: false
  };
  toDoList.push(newItem);
  return newItem;
}

// Remove um item da lista de tarefas
function removeTodoItem(id) {
  toDoList = toDoList.filter(item => item.id !== id);
}

// Atualiza o HTML da lista de tarefas
function updateTodoList() {
  toDoContainer.innerHTML = "";
  toDoList.forEach(item => {
    const todoItem = document.createElement("div");
    todoItem.className = "todo-item";
    todoItem.id = `todo-id-${item.id}`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.isChecked;
    checkbox.addEventListener("change", e => {
      item.isChecked = e.target.checked;
      syncTodoList();
      updateTodoList();
    });
    todoItem.appendChild(checkbox);

    const textDiv = document.createElement("div");
    textDiv.className = "text-div";
    todoItem.appendChild(textDiv);

    const text = document.createElement("p");
    text.textContent = item.text;
    text.style.textDecoration = item.isChecked ? "line-through" : "";
    textDiv.appendChild(text);

    const deleteButton = document.createElement("div");
    deleteButton.className = "button delete";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      removeTodoItem(item.id);
      syncTodoList();
      updateTodoList();
    });
    todoItem.appendChild(deleteButton);

    toDoContainer.appendChild(todoItem);
  });
}

// Salva a lista de tarefas no localStorage
function syncTodoList() {
  localStorage.setItem("toDoList", JSON.stringify(toDoList));
}

// Carrega a lista de tarefas do localStorage
function loadTodoList() {
  const storedList = JSON.parse(localStorage.getItem("toDoList"));
  if (storedList) {
    toDoList = storedList;
    updateTodoList();
  }
}

function insertItem(){
	 const todoText = inputText.value.trim();
	  if (todoText) {
	    addTodoItem(todoText);
	    syncTodoList();
	    updateTodoList();
	    inputText.value = "";
	  }
}

// Adiciona um item na lista de tarefas ao clicar no botão "Add"
addButton.addEventListener("click", () => {
 	insertItem();
});

inputText.addEventListener('keyup', (e) => {
	if( e.key === 'Enter'){
		insertItem();
	}
});

// Carrega a lista de tarefas ao carregar a página
loadTodoList();
