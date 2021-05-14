const express = require('express');
const userData = require("../data/usersCollection");
const router = express.Router();

router.get('/:userDisplayName', async (req, res) => {
    try {
        const user = await userData.getUser(req.params.userDisplayName);
        // Error throw based on Error throw in profile.js
        if(user == null) throw "Error - profile not found";

        res.render('watB/workoutvideos', {userDisplayName: user.userDisplayName, dailyStats: user.dailyStats});
    } catch (e) {
        res.status(500).send();
    }
  });

module.exports = router;