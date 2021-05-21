const session=require('express-session')
const express = require("express")
const bcrypt = require('bcrypt')
const users = require("../data/usersCollection")
const teams = require('../data/teamsCollection')

const app = express.Router();

app.get("/:teamName/comments/:isTeam", async (req,res) => 
{
	return res.redirect(`/profiles/${req.params.teamName}/comments/${req.params.isTeam}`);
})

app.post("/joinClan",async (req,res)=>
{
	if (req.session && req.session.username && req.body && req.body.teamName)
	{	try {
			let interact = await teams.interactClan(req.session.username, req.body.teamName)
			if (interact === "join") //if not on a team, join this team!
			{
				await teams.addMember(req.session.username,req.body.teamName);
			}
			else if (interact === "leave") //if already on this team, leave it
			{
				await teams.removeMember(req.session.username,req.body.teamName)
			}
			else if (interact === "peace") //if on a team and at war with this team, end the war <3
			{
				await teams.removeFoe((await users.getUser(req.session.username)).userTeam, req.body.teamName);
			}
			else //if on a team but not this team, declare war!
			{
				await teams.addFoe((await users.getUser(req.session.username)).userTeam,req.body.teamName)
			}
			res.json(await teams.interactClan(req.session.username,req.body.teamName)); //return new interaction
		}
		catch(e)
		{
			res.status(404).render("watB/error",{error: e.toString()})
		}
		return;
	}
	res.json(0);
	//return res.redirect(req.body)
})

app.get("/:clanName", async (req,res) => {
	let team = null
	try{
	    team = await teams.getTeam(req.params.clanName);
	}
	catch(e)
	{
		res.status(404).render("watB/error",{error: e.toString()})
		return;
	}
    let clanInfo = {userDisplayName: team.teamName};
	enemyObj = []
	for (const enemy in team.enemies)
	{
		try {
		enemyObj.push({name:team.enemies[enemy], score: (await teams.getTeamStats(team.enemies[enemy])).totalWater})
				}
		catch(e)
		{
			res.status(404).render("watB/error",{error: e.toString()})
		}
	}

	let func = (a,b) => (a.score - b.score) //compares scores to order enemies/members by their water consumption
	enemyObj.sort(func)
	members =[]
	for (const member in team.members)
	{
		try{
		members.push({name: team.members[member], score: (await users.getStats(team.members[member])).totalWater})
				}
		catch(e)
		{
			res.status(404).render("watB/error",{error: e.toString()})
		}
	}

	members.sort(func)
	    if(req.session && req.session.username){
        clanInfo.loggedIn = true;
		try {
		clanInfo.button = await teams.interactClan(req.session.username,team.teamName)//button text
		}
		catch(e)
		{
			res.status(500).render("watB/error",{error: e.toString()})
		}
    }
	try{
    let stats = await teams.getTeamStats(team.teamName);
    clanInfo.totalWater = stats.totalWater;
    clanInfo.totalSteps = stats.stepsTaken;
    clanInfo.caloriesBurnt = stats.totalCalories;
	}
	catch(e)
	{
		res.status(500).render("watB/error",{error: e.toString()})
	}

	clanInfo.members = members
	clanInfo.enemies = enemyObj
	clanInfo.isClan = true;
	clanInfo.css = ["profiles"]
	res.render("watB/profile",clanInfo)
})



module.exports = app;
