// Récupérer les références aux éléments HTML pertinents
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

const apiUrl = "http://localhost:3000/api"

// méthode pour afficher les données au 1er chargement du site
fetch(apiUrl + "/")                     // on va chercher toutes les tasks 
.then((response => response.json()))    // une fois une réponse obtenue, on la transforme en objet JSON
.then((data) => {                       // Et pour chaque objet dans l'objet
  data.forEach(task => {
    console.log(task)
    addTaskToHtml(task.name, task._id)  // On va l'afficher sur le site, avec son nom et son identifiant en bdd.
  });
})


// Gestionnaire d'événement pour le formulaire de tâche
taskForm.addEventListener('submit', async (e) => {      // Quand on clique sur le bouton "Ajouter"
  e.preventDefault();
  const taskText = taskInput.value.trim();              // On récupère le nom de la task
  if (taskText !== '') {                                // Si elle n'est pas vide
    newTaskId = await addTaskToDB(taskText);            // On l'ajoute en base de donnée, et on sauvegarde l'ID assigné
    addTaskToHtml(taskText, newTaskId);                 // Puis on l'ajoute à l'HTML
    taskInput.value = '';                               // Et on vide le formulaire.
  }
});

async function addTaskToDB(taskText) {                    // On ajoute une nouvelle donnée à la bdd, via son nom
  //ajout de data
  data = {name: taskText}                                 // On crée un objet JSON pour pouvoir l'envoyer à l'API
  idOfNewTask = "";
  await fetch(apiUrl + "/addOne", {                       // Et on l'envoie.
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)                            // On sérialise la donnée en texte pour pouvoir l'envoyer en HTTP
  }).then((response) => {
    return response.json();                               // Lorsqu'on reçoit une réponse de l'API, on l'envoie au prochain .then
  }).then((data) => {
    idOfNewTask = data._id                                // et on assigne l'ID donné au nouvel objet à une variable.
  })
  console.log(idOfNewTask);
  return idOfNewTask;                                     // enfin, on l'envoie
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
  // Ici, il suffit juste de faire une requête DELETE sur localhost:3000/api/<id_de_l'objet_a_supprimer>
  // pour supprimer une donnée de l'API.
  const response = fetch(apiUrl + "/" + taskId, {
    method: "DELETE"
  })
}