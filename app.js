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
const inProgessDiv = document.getElementById("inProgessDiv");
const stuckDiv = document.getElementById("stuckDiv");
const doneDiv = document.getElementById("doneDiv");

// Add card OnClick
// Showing Form on click
todoButton.addEventListener("click", () => {
  AddTask.classList.add("show");
  statusOption.options[0].selected = true;
  console.log();
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

let todoArr = [];
let inProgressArr = [];
let stuckArr = [];
let doneArr = [];

//Form submit
addTaskButton.addEventListener("click", (e) => {
let count = 1

  e.preventDefault();
  if (title.value !== "" && description.value !== "") {
    AddTask.classList.remove("show");
    if(statusOption.value == 'todoOption'){
      todoArr.push({title: title.value, description: description.value, priority:  priorityOption.value, id: count})
    }
    count++
    title.value = "";
    description.value = "";

    const mappedArr = todoArr.map(item=>{
      return `<div>${item.title}</div>`      
    })

    todoDiv.innerHTML = mappedArr
    console.log(mappedArr);
  }
});
