const express = require("express");
const Model = require("../model/model");
const router = express.Router();

// Méthode Post

router.post('/addOne', async (request, response) => {
    const data = new Model({
        name: request.body.name
    })
    try{
        const dataToSave = await data.save();
        response.status(200).json(dataToSave)
    } catch(error){
        response.status(400).json()
    }
})

// Méthode GetAll

router.get('/', async (request, response) => {
    try{
        const data = await Model.find();
        response.json(data);
    } catch(error){
        response.status(500).json({"messsage": error.messsage})
    }
})

// Méthode GetByID

router.get('/:id', async (request, response) => {
    try{
        const data = await Model.findById(request.params.id);
        response.json(data);
    } catch(error){
        response.status(500).json({"messsage": error.messsage})
    }
})

// Méthode UpdateByID

router.patch('/:id', async (request, response) => {
    try{
        const id = req.params.id;
        const newData = request.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, newData, options
        )

        response.send(result)
    } catch(error){
        response.status(400).json({"messsage": error.messsage})
    }
})

// Méthode DeleteByID

router.delete('/:id', async (request, response) => {
    try{
        const id = request.params.id;
        const data = await Model.findByIdAndDelete(id);

        response.send(`Task ${data.name} has been deleted.`);
    } catch(error){
        response.status(400).json({"messsage": error.messsage})
    }
})

module.exports = router;