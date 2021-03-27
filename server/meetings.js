const meetingsRouter = require('express').Router();

module.exports = meetingsRouter;

const { 
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    createMeeting,
    deleteAllFromDatabase
  } = require("./db");

  meetingsRouter.get("/", (req, res, next) => {
      const meetings = getAllFromDatabase("meetings");
      res.send(meetings);
  });

  meetingsRouter.post("/", (req, res, next) => {
        const newMeeting = createMeeting();
        addToDatabase("meetings", newMeeting);
        res.status(201).send(newMeeting);
  });

  meetingsRouter.delete("/", (req, res, next) => {
        deleteAllFromDatabase("meetings");
        res.status(204).send();  
  });