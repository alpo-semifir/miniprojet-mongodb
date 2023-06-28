const mongoose = require("mongoose")

// On définit ici notre modèle de données, l'objet task est relativement simple :
// {
//   "name":"Nom_de_la_tâche"
// }

const dataSchema = new mongoose.Schema({
    name: {
        required: true, // Pour préciser que le nom est obligatoire
        type: String    // Pour préciser le type de la donnée, ici une chaîne de caractères
    }
})

// On exporte ensuite notre modèle de données pour que les autres scripts puissent l'utiliser avec un require()
module.exports = mongoose.model('tasks', dataSchema)