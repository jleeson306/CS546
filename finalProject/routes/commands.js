const express = require('express');
const bcrypt = require('bcrypt')
const userData = require("../data/usersCollection");
const teamData = require("../data/teamsCollection");
const commData = require("../data/commentsCollection");
const dstaData = require("../data/dailyStats");
const dactData = require("../data/dailyActivities");

const router = express.Router();

router.get('/populate', async (req, res) => {
	await userData.createUser("Sherlock", "Holmes", "masterdetective123", "1854-01-06", "mrHOTmes@hotmail.com", "Male", "elementarymydearwatson"); 
	await userData.createUser("Liz", "Lemon", "lemon", "1970-11-19", "nemisis@gmail.com", "Female", "damnyoujackdonaghy");
	await userData.createUser("Harry", "Potter", "theboywholived", "1980-07-31", "magic@mugglemail.com", "Wizzard", "quidditch");
	await teamData.createTeam("Gryffindor");
	await teamData.createTeam("Scotland Yard");
	await teamData.addMember("theboywholived", "Gryffindor");
	await teamData.addMember("masterdetective123", "Scotland Yard");
	await teamData.addFoe("Scotland Yard", "Gryffindor");
	await commData.createComment("masterdetective123", "fucking dumb ass loser boy, magic doesn't exist and neither do wizards, fuck on out of the UK chump!!!!!", "theboywholived");
	await dstaData.createDailyStats("theboywholived", "2021-05-10", 0, 0, 0, "potions", 60, 50);
	await dactData.createDailyActivities("theboywholived", "2021-05-10", "quidditch", 60, 250);
	await dstaData.createDailyStats("theboywholived", "2021-05-11", 0, 0, 0);
	await dactData.createDailyActivities("theboywholived", "2021-05-11", "quidditch", 60, 250);
	await dactData.createDailyActivities("theboywholived", "2021-05-11", "spellcasting", 30, 200);
    res.send("three users created, their info is {username: masterdetective123, password: elementarymydearwatson}, {username: lemon, password: damnyoujackdonaghy}, {username: theboywholived, password: quidditch}");
});
router.get('/nuke', async (req, res) => {
	await userData.removeAll();
	await teamData.removeAll();
	await commData.removeAll();
    res.send("bye bye lol");
});

module.exports = router;