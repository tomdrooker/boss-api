const ideasRouter = require("express").Router();

module.exports = ideasRouter;

const checkMillionDollarIdea = require("./checkMillionDollarIdea");

const {
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
} = require("./db");

ideasRouter.param("ideaId", (req, res, next, ideaId) => {

    const idea = getFromDatabaseById("ideas", ideaId);

    if (idea) {
        req.idea = idea;
        next();
    }
    else {
        res.status(404).send();
    }

});

ideasRouter.get("/", (req, res, next) => {
    const ideas = getAllFromDatabase("ideas");
    res.send(ideas);
});

ideasRouter.get("/:ideaId", (req, res, next) => {
    res.send(req.idea);
});

ideasRouter.post("/", checkMillionDollarIdea, (req, res, next) => {
    const newIdea = addToDatabase("ideas", req.body);
    res.status(201).send(newIdea);
});

ideasRouter.put("/:ideaId", (req, res, next) => {
    const updatedIdea = updateInstanceInDatabase("ideas", req.body);
    res.status(201).send(updatedIdea);
});

ideasRouter.delete("/:ideaId", (req, res, next) => {
    deleteFromDatabasebyId("ideas", req.idea.id);
    res.status(204).send();
});