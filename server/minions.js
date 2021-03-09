const express = require("express");
const minionsRouter = express.Router();
const db = require("./db");

minionsRouter.get("/", (req, res, next) => {
    res.send(db.getAllFromDatabase("minions"));
});

minionsRouter.get("/:minionId", (req, res, next) => {
    const id = req.params.minionId;
    const minion = db.getFromDatabaseById("minions", id);
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
        tile: req.body.title,
        salary: Number(req.body.salary),
        weaknesses: req.body.weaknesses
    };
    db.addToDatabase("minions", minionToAdd);
});

module.exports = minionsRouter;