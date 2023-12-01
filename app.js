// Add card doms
const todoButton = document.getElementById("todoButton");
const inProgressButton = document.getElementById("inProgressButton");
const stuckButton = document.getElementById("stuckButton");
const doneButton = document.getElementById("doneButton");

// form doms
const AddTask = document.getElementById("AddTask");
const addTaskButton = document.getElementById("addTaskButton");
const title = document.getElementById("title");
const description = document.getElementById("description");
const statusOption = document.getElementById("status");
const priorityOption = document.getElementById("priority");

// form containerDivs

const todoDiv = document.getElementById("todoDiv");
const inProgressDiv = document.getElementById("inProgressDiv");
const stuckDiv = document.getElementById("stuckDiv");
const doneDiv = document.getElementById("doneDiv");

let editMode = false;
let editModeTaskId = null;
let editModePosition = null;



// Add card OnClick
// Showing Form on click
todoButton.addEventListener("click", () => {
  AddTask.classList.add("show");
  statusOption.options[0].selected = true;
});
inProgressButton.addEventListener("click", () => {
  AddTask.classList.add("show");
  statusOption.options[1].selected = true;
});
stuckButton.addEventListener("click", () => {
  AddTask.classList.add("show");
  statusOption.options[2].selected = true;
});
doneButton.addEventListener("click", () => {
  AddTask.classList.add("show");
  statusOption.options[3].selected = true;
});

const escapeScreen = (e) => {
  if (e.key === "Escape") {
    AddTask.classList.remove("show");
    title.value = "";
    description.value = "";
  }
};

document.onkeydown = escapeScreen;

// Todo Arrays

let todoArray = [
  {
    0: [],
  },
  {
    1: [],
  },
  {
    2: [],
  },
  {
    3: [],
  },
];



const render = (renderTarget, item) => {
  return renderTarget + `<div class="containerOfTodo">
   <div class="checkcontainer">
   <h1 class="checksvg"> ✓ </h1>
   <div class="infobox">
     <h2>${item.title}</h2>
     <h5>${item.description}</h5>
     <p class="prioritybox">${item.priority}</p>
   </div>
   </div>
   <div class="buttons">
     <img src="delete.svg" alt="" onclick="deleteTask(${item.id}, ${item.position})" />
     <img src="edit.svg" alt="" onclick="editTask(${item.id}, ${item.position})" />
   </div>
 </div>`;
};

const addToRender=()=>{
  let todorender = "";
  let inprogressrender = "";
  let stuckrender = "";
  let donerender = "";

  for (let i = 0; i < todoArray.length; i++) {
    todoArray[i][i].forEach((item) => {
      if (item.stat == "todoOption") {
        todorender = render(todorender, item);
      } else if (item.stat == "inprogressOption") {
        inprogressrender = render(inprogressrender, item);
      } else if (item.stat == "stuckOption") {
        stuckrender = render(stuckrender, item);
      } else {
        donerender = render(donerender, item);
      }
    });
  }
  todoDiv.innerHTML = todorender;
  inProgressDiv.innerHTML = inprogressrender;
  stuckDiv.innerHTML = stuckrender;
  doneDiv.innerHTML = donerender;
}



let count = 1;

//Form submit
addTaskButton.addEventListener("click", (e) => {
  e.preventDefault();

  if (title.value !== "" && description.value !== "") {
    if(editMode){
        editExistingTask()
    } else {
      const pushToArr = (i) => {
        todoArray[i][i].push({
          title: title.value,
          description: description.value,
          priority: priorityOption.value,
          stat: statusOption.value,
          id: count,
          position: i
        });
      };
      AddTask.classList.remove("show");
      if (statusOption.value == "todoOption") {
        pushToArr(0);
      } else if (statusOption.value == "inprogressOption") {
        pushToArr(1);
      } else if (statusOption.value == "statusOption") {
        pushToArr(2);
      } else {
        pushToArr(3);
      }
      count++;
    }
    

    title.value = "";
    description.value = "";
    addToRender()

  }
});

// DELETE TASK

function deleteTask(taskId, position) {
  todoArray[position][position] = todoArray[position][position].filter(task => task.id !== taskId);
  addToRender();
}

// EDIT TASK

function editTask(taskId, position) {
  const taskToEdit = todoArray[position][position].find(task => task.id === taskId);

  editMode = true;
  editModeTaskId = taskId;
  editModePosition = position;

  title.value = taskToEdit.title;
  description.value = taskToEdit.description;
  priorityOption.value = taskToEdit.priority;
  statusOption.value = taskToEdit.stat;

  AddTask.classList.add("show");
}

function editExistingTask() {
  const editedTask = {
    title: title.value,
    description: description.value,
    priority: priorityOption.value,
    stat: statusOption.value,
    id: editModeTaskId,
    position: editModePosition
  };

  const tasks = todoArray[editedTask.position][editedTask.position];
  const taskIndex = tasks.findIndex(task => task.id === editModeTaskId);
  tasks.splice(taskIndex, 1, editedTask);

  editMode = false;
  editModeTaskId = null;
  editModePosition = null;

  title.value = "";
  description.value = "";
  addToRender();
  AddTask.classList.remove("show");
}

