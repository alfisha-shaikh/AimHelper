const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('todo-list')


// load saved todos from localstorage
const saved = localStorage.getItem('todos')
const todos = saved? JSON.parse(saved) :[];

function saveTodos(){
   localStorage.setItem('todos',JSON.stringify(todos))
}

//fuction to create list items
function createItem(todo, index){
   const li = document.createElement('li');

   //checkbox for task completion
   const checkbox = document.createElement('input')
   checkbox.type = 'checkbox';
   checkbox.checked = !!todo.completed;
   checkbox.addEventListener("change",()=>{
       todo.completed = checkbox.checked;

         textSpan.style.textDecoration = todo.completed? 'line-through': "";
           li.classList.toggle('completed', todo.completed);
    saveTodos();   
   });

   //Text of the todo
   const textSpan = document.createElement('span');
   textSpan.textContent = todo.text;
   textSpan.style.margin = '0 8px';
   if(todo.completed){
    textSpan.style.textDecoration = 'line-through';
   }
    //add edit eventListener on double-click   
    textSpan.addEventListener("dblclick",()=>{
        const newText = prompt("Edit Todo",todo.text);
        if(newText !== null){
            todo.text = newText.trim();
            textSpan.textContent = todo.text;
            saveTodos();
        } 
    })

    //Delete 
    const delbtn = document.createElement('button')
    delbtn.textContent = "Delete";
    delbtn.addEventListener('click',()=>{
        todos.splice(index,1);//removes one element
        render()
        saveTodos()
    }) 
    
    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(delbtn)
    return li;
}

//function to render list items
function render(){
  list.innerHTML = '';

  //recreate each item
  todos.forEach((todo,index) => {
    const node = createItem(todo, index);
    list.appendChild(node)
  });
}

function addTodo(){
    const text = input.value.trim();
    if(!text){
        return;
    }

    //push new Todo
    todos.push({text, completed: false});
    input.value = '';
    render();
    saveTodos();
}

addBtn.addEventListener("click", addTodo);

input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTodo();
    }
});

render()