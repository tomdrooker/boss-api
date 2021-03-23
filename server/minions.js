const minionsRouter = require('express').Router();

module.exports = minionsRouter;

const { 
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
  } = require("./db");

minionsRouter.get("/", (req, res, next) => {
    res.send(getAllFromDatabase("minions"));
});

minionsRouter.get("/:minionId", (req, res, next) => {
    const id = req.params.minionId;
    const minion = getFromDatabaseById("minions", id);
    if (minion != null) {
        res.send(minion);
    }
    else {
        res.status(404).send();
    }
});

minionsRouter.post("/", (req, res, next) => {
    const minionToAdd = {
        name: req.body.name,
        title: req.body.title,
        salary: Number(req.body.salary),
        weaknesses: req.body.weaknesses
    };
    const newMinion = addToDatabase("minions", minionToAdd);
    res.status(201).send(newMinion);
});

minionsRouter.put("/:minionId", (req, res, next) => {
    const minionToUpdate = {
        id: req.body.id,
        name: req.body.name,
        title: req.body.title,
        salary: Number(req.body.salary),
        weaknesses: req.body.weaknesses
    };
    const updatedMinion = updateInstanceInDatabase("minions", minionToUpdate);
    res.status(200).send(updatedMinion);
});