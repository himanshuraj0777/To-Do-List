const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const filter = document.getElementById("filter");

function addTask() {
    if (inputBox.value.trim() === '') {
        alert("You must write something");
        return;
    }

    let li = document.createElement("li");
    li.innerHTML = `<span class="task-text">${inputBox.value}</span>`;

    // Add Edit Button
    let editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit-btn");
    editBtn.onclick = () => editTask(editBtn);

    // Add Delete (×) Button
    let deleteBtn = document.createElement("span");
    deleteBtn.innerHTML = "\u00d7";
    deleteBtn.classList.add("delete-btn");

    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    listContainer.appendChild(li);
    
    inputBox.value = "";
}

function editTask(button) {
    const taskText = button.parentElement.querySelector('.task-text');
    const newTaskText = prompt('Edit your task:', taskText.textContent);
    if (newTaskText !== null && newTaskText.trim() !== '') {
        taskText.textContent = newTaskText;
    }
}

// ✅ Fix: Clicking anywhere on the task (including the checkbox) toggles completion
listContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-btn")) {
        e.target.parentElement.remove();
    } else if (e.target.tagName === "LI" || e.target.classList.contains("task-text")) {
        e.target.closest("li").classList.toggle("checked"); // ✅ Fix: Toggles task on both text & checkbox click
    }
});

// ✅ Fix: Filter Functionality
filter.addEventListener("change", function () {
    const tasks = listContainer.querySelectorAll("li");
    tasks.forEach(task => {
        if (filter.value === "all") {
            task.style.display = "flex";
        } else if (filter.value === "pending" && !task.classList.contains("checked")) {
            task.style.display = "flex";
        } else if (filter.value === "completed" && task.classList.contains("checked")) {
            task.style.display = "flex";
        } else {
            task.style.display = "none";
        }
    });
});