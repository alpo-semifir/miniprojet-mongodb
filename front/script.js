// Récupérer les références aux éléments HTML pertinents
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

const apiUrl = "http://localhost:3000/api"

fetch(apiUrl + "/")
.then((response => response.json()))
.then((data) => {
  data.forEach(task => {
    console.log(task)
    addTaskToHtml(task.name, task._id)
  });
})


// Gestionnaire d'événement pour le formulaire de tâche
taskForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    newTaskId = await addTaskToDB(taskText);
    addTaskToHtml(taskText, newTaskId);
    taskInput.value = '';
  }
});

// Ajouter une nouvelle tâche à la liste
async function addTaskToDB(taskText) {
  //ajout de data
  data = {name: taskText}
  idOfNewTask = "";
  const response = await fetch(apiUrl + "/addOne", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then((response) => {
    return response.json();
  }).then((data) => {
    idOfNewTask = data._id
  })
  console.log(idOfNewTask);
  return idOfNewTask;
}

function addTaskToHtml(taskText, taskId){
  const taskItem = document.createElement('li');
  taskItem.className = 'task-item';
  taskItem.id = taskId

  const taskSpan = document.createElement('span');
  taskSpan.textContent = taskText;
  taskItem.appendChild(taskSpan);

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Supprimer';
  deleteButton.addEventListener('click', () => {
    removeTaskFromDB(taskItem.id)
    taskList.removeChild(taskItem);
  });
  taskItem.appendChild(deleteButton);

  taskList.appendChild(taskItem);
}

function removeTaskFromDB(taskId){
  //suppression de data
  const response = fetch(apiUrl + "/" + taskId, {
    method: "DELETE"
  })
}