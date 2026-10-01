let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

// Save data
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add task
function addTask() {
  let input = document.getElementById("taskInput");
  let text = input.value.trim();

  if (text === "") return;

  tasks.push({
    text: text,
    completed: false
  });

  input.value = "";
  saveTasks();
  displayTasks();
}

// Display tasks
function displayTasks() {
  let list = document.getElementById("taskList");
  list.innerHTML = "";

  let filteredTasks = tasks;

  if (currentFilter === "completed") {
    filteredTasks = tasks.filter(t => t.completed);
  } else if (currentFilter === "pending") {
    filteredTasks = tasks.filter(t => !t.completed);
  }

  filteredTasks.forEach((task, index) => {
    let li = document.createElement("li");

    let span = document.createElement("span");
    span.textContent = task.text;

    if (task.completed) {
      span.classList.add("completed");
    }

    // Toggle complete
    span.onclick = () => {
      task.completed = !task.completed;
      saveTasks();
      displayTasks();
    };

    // Delete button
    let delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.classList.add("delete-btn");

    delBtn.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      displayTasks();
    };

    li.appendChild(span);
    li.appendChild(delBtn);
    list.appendChild(li);
  });

  updateCounter();
}

// Filter
function filterTasks(type) {
  currentFilter = type;
  displayTasks();
}

// Counter
function updateCounter() {
  let total = tasks.length;
  let completed = tasks.filter(t => t.completed).length;

  document.getElementById("counter").innerText =
    `Total: ${total} | Completed: ${completed}`;
}

// Enter key support
document.getElementById("taskInput").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    addTask();
  }
});

// Load on start
displayTasks();