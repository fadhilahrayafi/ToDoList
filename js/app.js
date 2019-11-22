//Select Element
const clear = document.querySelector(".clear");

const datelement = document.getElementById("date");

const list = document.getElementById("list");

const input = document.getElementById("input");

// classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//variables
let LIST, id;

//get item from local storage
let data = localStorage.getItem("TODO");

//check if data is not empty
if (data) {
  LIST = JSON.parse(data);
  id = LIST.length;
  loadList(LIST);
} else {
  //if data is not empty
  LIST = [];
  id = 0;
}

//load items to user's interface
function loadList(array) {
  array.forEach(function(item) {
    addToDo(item.name, item.id, item.done, item.trash);
  });
}

//clear local storage
clear.addEventListener("click", function() {
  localStorage.clear();
  location.reload();
});

//Show todays date
const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();

datelement.innerHTML = today.toLocaleDateString("en-US", options);

//add function toDo
function addToDo(toDo, id, done, trash) {
  if (trash) {
    return;
  }

  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";

  const item = `<li class="item">
  <i class="fa ${DONE} co" job="complete" id="${id}"></i>
  <p class="text ${LINE}">${toDo}</p>
  <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
  </li>
  `;

  const position = "beforeend";
  list.insertAdjacentHTML(position, item);
}

// add an item to list
document.addEventListener("keyup", function(event) {
  if (event.keyCode == 13) {
    const toDo = input.value;

    //if the input is not empty
    if (toDo) {
      addToDo(toDo, id, false, false);

      LIST.push({
        name: toDo,
        id: id,
        done: false,
        trash: false
      });

      //add item to local storage
      localStorage.setItem("TODO", JSON.stringify(LIST));

      id++;
    }
    input.value = "";
  }
});

//complete to do
function completeToDo(element) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

  LIST[element.id].done = LIST[element.id].done ? false : true;
}

//remove to do
function removeToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);

  LIST[element.id].trash = true;
}

//target the item dynamically
list.addEventListener("click", function(event) {
  const element = event.target; // return the click element inside list
  const elementJob = element.attributes.job.value; //complete or delete

  if (elementJob == "complete") {
    completeToDo(element);
  } else if (elementJob == "delete") {
    removeToDo(element);
  }

  //add item to local storage
  localStorage.setItem("TODO", JSON.stringify(LIST));
});
