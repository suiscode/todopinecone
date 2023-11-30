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

let count = 1;

//Form submit
addTaskButton.addEventListener("click", (e) => {
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

  e.preventDefault();
  if (title.value !== "" && description.value !== "") {
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
    title.value = "";
    description.value = "";

    let todorender = "";
    let inprogressrender = "";
    let stuckrender = "";
    let donerender = "";

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
          <img src="delete.svg" alt="" onclick="logger(${item.id},${item.position})"/>
          <img src="edit.svg" alt="" />
        </div>
      </div>`;
    };
    
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
});

const logger = (id, position) => {
  if(position == '0'){
    console.log(todoArray[0][0]);
    todoArray[0][0].filter(item=> item.id !==id)
  }
};
