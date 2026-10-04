const form = document.querySelector("form");
const tasksDiv = document.querySelector(".tasks");
const cancelBtn = document.querySelector(".cancel-btn");
const completedDiv = document.querySelector(".completedTask");
const navigationDiv = document.querySelector(".navigation");
const topbarDiv = document.querySelector(".topbar");
const themeCheckbox = document.querySelector(".theme-checkbox");

let taskArr = JSON.parse(localStorage.getItem("tasks")) || [];
let editId = null;
let completedTask = JSON.parse(localStorage.getItem("completedTask")) || [];

// all task ui
const ui = () => {
  tasksDiv.innerHTML = " ";

  taskArr.forEach((elem) => {
    const isCompleted = completedTask.some(
      (completedEle) => completedEle.id == elem.id,
    );
    const card = document.createElement("div");
    card.className = "task-card";
    card.dataset.id = elem.id;
    card.innerHTML += `

          <div class="task-left">

              <input type="checkbox" class="task-checkbox jsCheckbox"
              ${isCompleted ? "checked" : ""}>

              <div class="task-info">

                  <div class="task-title-row">
                      <h3>${elem.title}</h3>

                      <span class="priority ${elem.priority}">
                          ● ${elem.priority}
                      </span>
                  </div>

                  <p>
                      ${elem.description}.
                  </p>

                  <span class="date">
                      📅${elem.date}
                  </span>

              </div>

          </div>

          <div class="task-actions">
              <button class="edit">✎</button>
              <button class="delete">🗑</button>
     </div> `;

    tasksDiv.appendChild(card);
  });
};

ui();

// completed task ui
const secUi = () => {
  const header = completedDiv.querySelector("h1");
  completedDiv.innerHTML = "";
  completedDiv.appendChild(header);

  completedTask.forEach((elem) => {
    const card = document.createElement("div");
    card.className = "task-card";
    card.dataset.id = elem.id;

    card.innerHTML += `

    
      <div class="task-left">
        
        <div class="task-info">
          <div class="task-title-row">
            <h3>${elem.title}</h3>

          </div>

          <p>${elem.description}.</p>

          <span class="date"> 📅 ${elem.date} </span>
        </div>
      </div>

      <div class="task-actions">
        
        <button class="delete">🗑 <span> Delete</span></button>
      </div>`;

    completedDiv.appendChild(card);
  });
};

// right side form ke liye
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = e.target[0].value;
  const description = e.target[1].value;
  const date = e.target[2].value;
  const priority = e.target[3].value;

  if (
    title.trim() === "" ||
    description.trim() === "" ||
    date.trim() === "" ||
    priority.trim() === ""
  ) {
    alert("please fill all the forms");
    return;
  }

  const obj = {
    id: Date.now(),
    title,
    description,
    date,
    priority,
  };

  if (editId !== null) {
    const task = taskArr.find((elem) => elem.id === editId);
    editId = null;
    Object.assign(task, { title, description, date, priority });
    localStorage.setItem("tasks", JSON.stringify(taskArr));
  } else {
    taskArr.push(obj);
    localStorage.setItem("tasks", JSON.stringify(taskArr));
  }

  ui();

  form.reset();
});

// right side cancel btn
cancelBtn.addEventListener("click", () => {
  form.reset();
});

// task ke inside functionality
tasksDiv.addEventListener("click", (e) => {
  const card = e.target.closest(".task-card");
  if (!card) return;
  const id = Number(card.dataset.id);

  // delete functionality
  if (e.target.closest(".delete")) {
    taskArr = taskArr.filter((elem) => elem.id !== id);

    completedTask = completedTask.filter((elem) => elem.id !== id);

    localStorage.setItem("tasks", JSON.stringify(taskArr));

    localStorage.setItem("completedTask", JSON.stringify(completedTask));
    ui();
    secUi();
  }

  // edit functionality
  if (e.target.closest(".edit")) {
    const task = taskArr.find((elem) => {
      return elem.id === id;
    });

    form[0].value = task.title;
    form[1].value = task.description;
    form[2].value = task.date;
    form[3].value = task.priority;
    editId = id;
  }

  // checkbox functionality
  if (e.target.closest(".jsCheckbox")) {
    const isChecked = e.target.checked;

    if (isChecked) {
      const task = taskArr.find((elem) => elem.id === id);

      if (completedTask.find((elem) => elem.id === task.id)) {
        return;
      } else {
        completedTask.push(task);

        localStorage.setItem("completedTask", JSON.stringify(completedTask));
      }
    } else {
      const task = taskArr.find((elem) => elem.id === id);

      const index = completedTask.findIndex((elem) => elem.id == task.id);
      completedTask.splice(index, 1);
      localStorage.setItem("completedTask", JSON.stringify(completedTask));
      secUi();
    }
  }
});

// sidebar change ke liye
navigationDiv.addEventListener("click", (e) => {
  if (e.target.closest(".jsCom")) {
    localStorage.setItem("currentView", "completed");

    topbarDiv.style.display = "none";
    tasksDiv.style.display = "none";
    completedDiv.style.display = "flex";
    secUi();
  }

  if (e.target.closest(".active")) {
    localStorage.setItem("currentView", "all");
    topbarDiv.style.display = "flex";
    tasksDiv.style.display = "flex";
    completedDiv.style.display = "none";
  }
});

const currentView = localStorage.getItem("currentView");

if (currentView === "completed") {
  topbarDiv.style.display = "none";
  tasksDiv.style.display = "none";
  completedDiv.style.display = "flex";

  secUi();
} else {
  topbarDiv.style.display = "flex";
  tasksDiv.style.display = "flex";
  completedDiv.style.display = "none";
}

// delete task from completed
completedDiv.addEventListener("click", (e) => {
  const card = e.target.closest(".task-card");
  if (!card) return;
  const id = Number(card.dataset.id);
  console.log(id);
  if (e.target.closest(".delete")) {
    completedTask = completedTask.filter((elem) => elem.id !== id);

    taskArr = taskArr.filter((elem) => elem.id !== id);

    localStorage.setItem("tasks", JSON.stringify(taskArr));

    localStorage.setItem("completedTask", JSON.stringify(completedTask));

    secUi();
    ui();
  }
});

// dark and light mode ke liye
themeCheckbox.addEventListener("change", () => {
  const isDark = document.body.classList.toggle("dark");

  localStorage.setItem("theme", isDark ? "dark" : "light");
});

const savedTheme = localStorage.getItem("theme");
console.log(savedTheme);

if (savedTheme === "dark") {
  document.body.classList.add("dark");
  themeCheckbox.checked = true;
} else {
  document.body.classList.remove("dark");
  themeCheckbox.checked = false;
}
