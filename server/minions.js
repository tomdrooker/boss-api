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
    if (minion) {
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
    const newMinion = addToDatabase("minions", req.body);
    res.status(201).send(newMinion);
});

minionsRouter.put("/:minionId", (req, res, next) => {
    const updatedMinion = updateInstanceInDatabase("minions", req.body);
    res.status(200).send(updatedMinion);
});

minionsRouter.delete("/:minionId", (req, res, next) => {
    deleteFromDatabasebyId("minions", req.minion.id);
    res.status(204).send();
});