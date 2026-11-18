//const list = document.getElementById('todo-list')
//const itemCountSpan = document.getElementById('item-count')
//const uncheckedCountSpan = document.getElementById('unchecked-count')
updateCounter();

function newTodo() {
//alert('New TODO button clicked!')
const dialogue = document.createElement('dialog');
dialogue.innerHTML= `
  <div class ="modal-content">
    <h3>New TODO</h3>
    <p>Запишіть нову задачу</p>
    <input type="text" id="TODOadd" placeholder="Enter New">
    <button type="button" id="saveBtn">Save</button>
    <button type="button" id="cancelBtn">Cancel</button>
  </div>
`
document.body.appendChild(dialogue);
dialogue.showModal();

const cancelBut = dialogue.querySelector('#cancelBtn');
const inputText = dialogue.querySelector('input#TODOadd');
const saveBut = dialogue.querySelector('#saveBtn');

saveBut.addEventListener('click', ()=>{
  const savedTodoAdd=inputText.value
  try {
    localStorage.setItem('todo', savedTodoAdd);
  }
  catch {
    console.error('Помилка при збережінні даних в localStorage', error);
  }
  console.log(savedTodoAdd);
  dialogue.close();
  dialogue.remove();
  render();
});

cancelBut.addEventListener('click',() => {
  dialogue.close();
  dialogue.remove();
});
}

function renderTodo() {
  const todo=localStorage.getItem('todo');
  //const items=document.querySelectorAll('li');
  const items=counterRows();
  const todoId=items+1;
  console.log(todo, todoId)
  return` 
     <li class="list-group-item">
        <input type="checkbox" class="form-check-input me-2" id="${todoId}" />
        <label for="${todoId}"><span class="">${todo}</span></label>
        <button class="btn btn-danger btn-sm float-end">delete</button>
      </li>
  `;
}

function render() {
  const todoLi=renderTodo()
  const newItem=document.createElement("li");
  newItem.innerHTML=todoLi
  const list=document.querySelector("ul");
  list.append(newItem);
  updateCounter();
}

function updateCounter() {
  const countAll=counterRows();
  const element=document.getElementById("item-count");
  element.textContent=countAll;
  const items = document.getElementById('todo-list');
  const uncheckedBox=items.querySelectorAll('input[type="checkbox"]:not(:checked)');
  const qtyUnchecked=uncheckedBox.length;
  const elment2=document.getElementById("unchecked-count");
  elment2.textContent=qtyUnchecked;
}

function counterRows() {
  const items = document.getElementById('todo-list');
  return items.children.length
}

const list=document.getElementById('todo-list');
list.addEventListener('click', (event) => {
        const btn=event.target.closest("button");
        const item = btn.closest('li');
        item.remove();
        updateCounter()          
    })


const check=document.getElementById("todo-list")
check.addEventListener('change', (event) => {
  if(event.target.classList.contains("me-2")) {
     updateCounter();
   }
   })