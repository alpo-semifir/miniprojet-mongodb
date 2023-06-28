const express = require("express");
const Model = require("../model/model");
const router = express.Router();

// Dans ce fichier, on définit toutes les méthodes et leur logique métier.
// Ici, (POST) localhost:3000/api/addOne est la route pour ajouter une task.

router.post('/addOne', async (request, response) => {
    // On créé un nouvel objet task, avec en nom le nom que l'on a reçu dans la requête
    const data = new Model({
        name: request.body.name
    })
    try{
        // On essaie de sauvegarder ce nouvel objet, en cas d'erreur, tout est annulé, et le catch() est lancé
        const dataToSave = await data.save();
        // Si on réussit, alors on envoie un code 200 (OK), et le nouvel objet !
        response.status(200).json(dataToSave)
    } catch(error){
        // Sinon, on envoie un code 400 (Bad Request), et l'erreur
        response.status(400).json()
    }
})

// Ici, (GET) localhost:3000/api/ est la route pour afficher toutes les tasks.

router.get('/', async (request, response) => {
    try{
        // On essaie de trouver toutes les données dans la collection qui correspondent à notre modèle.
        const data = await Model.find();
        // Si on y arrive, alors on les retourne, avec un code 200.
        response.json(data).status(200);
    } catch(error){
        // Sinon, on envoie un code 500 (Internal Server Error).
        response.status(500).json({"messsage": error.messsage})
    }
})

// Ici, (GET) localhost:3000/api/<id_task> est la route pour afficher une task en particulier

router.get('/:id', async (request, response) => {
    try{
        // On essaie de trouver dans la collection une donnée qui correspond à notre modèle ET à l'id renseigné
        const data = await Model.findById(request.params.id);
        // Si on le retrouve, alors on le renvoie, avec un code 200
        response.json(data).status(200);
    } catch(error){
        // Sinon, on envoie un code 500 (Internal Server Error).
        response.status(500).json({"messsage": error.messsage})
    }
})

// Ici, (PATCH) localhost:3000/api/<id_task> est la route pour modifier une task.

router.patch('/:id', async (request, response) => {
    try{
        // On récupère les nouvelles données, et l'id actuel de l'objet,
        const id = req.params.id;
        const newData = request.body;
        const options = { new: true };

        // et on le sauvegarde dans la collection,
        const result = await Model.findByIdAndUpdate(
            id, newData, options
        )
        // enfin, on le renvoie, avec un code 200 (OK)
        response.send(result).status(200)
    } catch(error){
        // En cas d'erreur, on la renvoie avec un code 400 (Bad Request)
        response.status(400).json({"messsage": error.messsage})
    }
})

// Ici, (DELETE) localhost:3000/api/<id_task> est la route pour supprimer une task.

router.delete('/:id', async (request, response) => {
    try{
        // Enfin, on obtient l'ID de l'objet à supprimer,
        const id = request.params.id;
        // On le récupère, puis on le supprime
        const data = await Model.findByIdAndDelete(id);
        // Et on retourne à l'utilisateur qu'il a bien été supprimé.
        response.send(`Task ${data.name} has been deleted.`);
    } catch(error){
        // En cas d'erreur, on la renvoie avec un code 400 (Bad Request).
        response.status(400).json({"messsage": error.messsage})
    }
})

// Et on exporte le routeur pour pouvoir l'utiliser dans les autres scripts!
module.exports = router;