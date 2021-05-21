const express = require('express');
const userData = require("../data/usersCollection");
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        res.render('watB/workoutvideos',{css:["workoutvideos"]});
    } catch (e) {
        res.status(500).send();
    }
  });

module.exports = router;