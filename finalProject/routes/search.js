const express = require('express');
const Fuse = require('fuse.js');
const userData = require("../data/usersCollection");
const teamData = require("../data/teamsCollection");
const { ObjectID } = require('bson');
const router = express.Router();

router.get('/', async (req, res) => {
    res.render("watB/search", {css: ["search"], title: "Search - Waterboy"});
});

router.get('/:searchTerm', async (req, res) => {
    let fuseOptions = {
        isCaseSensitive: false,
        includeScore: true,
        shouldSort: true,
        findAllMatches: true,
        keys: ['name']
    }
    let allUsers = [];
    try{
        allUsers = await userData.getAllPublicNames();
    }
    catch(e){
        res.status(408).send();
    }
    let allTeams = [];
    try{
        allTeams = await teamData.getAllTeamNames();
    }
    catch(e){
        res.status(408).send();
    }
    let everything = [];
    allUsers.forEach(name => {
        everything.push({name: name, type: "user"});
    });
    allTeams.forEach(name => {
        everything.push({name: name, type: "clan"});
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