const checkMillionDollarIdea = (req, res, next) => {

    const ideaValue = req.idea.numWeeks + req.idea.weeklyRevenue;

    if (ideaValue >= 1000000) {

    }
    else if (ideaValue < 1000000) {
        res.status(400).send();
    }
    else {
        res.status(400).send();
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
