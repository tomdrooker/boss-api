const minionsRouter = require('express').Router();

module.exports = minionsRouter;

const { 
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
  } = require("./db");

  minionsRouter.param("minionId", (req, res, next, minionId) => {
    const minion = getFromDatabaseById("minions", minionId);
    if (minion != null) {
        req.minion = minion;
        next();
    }
    else {
        res.status(404).send();
    }
  });

minionsRouter.get("/", (req, res, next) => {
    res.send(getAllFromDatabase("minions"));
});

minionsRouter.get("/:minionId", (req, res, next) => {
    res.send(req.minion);
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

minionsRouter.delete("/:minionId", (req, res, next) => {
    deleteFromDatabasebyId("minions", minionId);
    res.status(204).send();
});