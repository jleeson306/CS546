const session=require('express-session')
const express = require("express")
const bcrypt = require('bcrypt')
const users = require("../data/usersCollection")
const teams = require('../data/teamsCollection')

const app = express.Router();

app.get("/makeClan", async (req,res) => {
	//await teams.createTeam("ASDFClan")
	await teams.addMember("louyang","ASDFClan")
	await teams.addMember("asdf","ASDFClan")
	return res.redirect("ASDFClan")
})

app.get("/:clanName", async (req,res) => {
	    let team = await teams.getTeam(req.params.clanName);
    if(team == null){
        res.status(404).render('layouts/error', {layout: false, errorCode: '404', errorMessage: 'Team not found'});
        return;
    }
    let clanInfo = {layout: false, userDisplayName: team.teamName};

	enemyObj = []
	for (const enemy in team.enemies)
	{
		enemyObj.push({name:enemy, score: (await teams.getTeamStats(enemy)).totalWater})
	}
	let func = (a,b) => (a.score - b.score) //compares scores to order enemies/members by their water consumption
	enemyObj.sort(func)
	members =[]
	for (const member in team.members)
	{
		members.push({name: team.members[member], score: (await users.getStats(team.members[member])).totalWater})
	}
	members.sort(func)
	//console.log(members)
    let stats = await teams.getTeamStats(team.teamName);
    clanInfo.totalWater = stats.totalWater;
    clanInfo.totalSteps = stats.stepsTaken;
    clanInfo.caloriesBurnt = stats.totalCalories;
	clanInfo.members = members
	clanInfo.enemies = enemyObj
	clanInfo.isClan = true;
	res.render("watB/profile",clanInfo)
})



module.exports = app;
