const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/routes")
const cors = require("cors")

// Connexion à la base de données

const mongostring = "mongodb://root:example@localhost:27017"; //TODO: ajouter .env pour ne pas avoir cette data en dur
mongoose.connect(mongostring, {
    dbName: "tasks"
});
const database = mongoose.connection;

// Si il y a une erreur => on l'affiche
database.on('error', (error) => {
    console.log(error)
})

// Une fois connecté à la db, on affiche un message de succès !
database.once('connected', () => {
    console.log("Successfully connected to database.")
})

// On peut maintenant lancer express pour écouter les ports
const app = express();

app.use(cors());

// Pour que le serveur réponde avec un format JSON
app.use(express.json());

// Maintenant que express est lancé, on lui dit de découvrir les routes
app.use('/api', routes)

// On précise que l'app écoute le port 3000 de la machine
app.listen(3000, () => console.log("Server listening at port 3000"));