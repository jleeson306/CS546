const express = require('express');
const Fuse = require('fuse.js');
const userData = require("../data/usersCollection");
const teamData = require("../data/teamsCollection");
const { ObjectID } = require('bson');
const router = express.Router();

router.get('/', async (req, res) => {
    res.render("watB/search", {css: ["search"]});
});

router.get('/:searchTerm', async (req, res) => {
    let fuseOptions = {
        isCaseSensitive: false,
        includeScore: true,
        shouldSort: true,
        findAllMatches: true,
        keys: ['name']
    }
    let allUsers = await userData.getAllNames();
    let allTeams = await teamData.getAllTeamNames();
    let everything = [];
    allUsers.forEach(name => {
        everything.push({name: name, type: "user"});
    });
    allTeams.forEach(name => {
        everything.push({name: name, type: "team"});
    });
    let fuse = new Fuse(everything, fuseOptions);
    const searchResults = fuse.search(req.params.searchTerm);
    let retArray = [];
    searchResults.forEach(x => {
        retArray.push(x.item);
    });
    res.json(retArray);
});

module.exports = router;