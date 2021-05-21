const mongoCollections = require('../config/mongoCollections');
const teams = mongoCollections.teamsCollection;
const {ObjectId} = require('mongodb');
const userC = require('./usersCollection');

let removeAll = async function() {
	const teamsCollection = await teams();
	teamsCollection.deleteMany({});
	return 0;
}

let createTeam = async function(name) {
	if(arguments.length != 1 || name == undefined) {
		throw("createTeam: you must provide a name");
	}
	if(typeof name !== 'string' || name.trim() == "") {
		throw("createTeam: name must be a string, and cannot be just empty spaces");
	}
	
	const teamsCollection = await teams();
	
	const nameExist = await teamsCollection.findOne({teamName: name});
	if(nameExist != null) {
		throw("createTeam: Team Name already Exists.");
	}
	
	let newTeam = {
		teamName: name,
		members: [],
		enemies: []
	};
	
	const inIn = await teamsCollection.insertOne(newTeam);
	if(inIn.insertCount === 0) {
		throw("createTeam: unable to add this team");
	}
	else{
		//should I return the team I just created??? would I need to???
		return 0;
		//return getTeam(name);
	}
}

let getTeam = async function(name){
	if(arguments.length != 1 || name == undefined) {
		throw("getTeam: You must provide a name");
	}
	if(typeof name !== 'string' || name.trim().length === 0) {
		throw("getTeam: name must be a string, and cannot be just empty spaces");
	}
	
	const teamsCollection = await teams();
	
	const team = await teamsCollection.findOne({teamName: name});
	if(team == null) {
		throw("getTeam: No team with that name exists: " + name);
	}
	else {
		return team;
	}
}


//Leo wrote this :japanese_goblin:
//given a team name, returns the total amount of amounts by that team. 
let getTeamStats = async function(name)
{
	let team = await getTeam(name);
	let stats = {
		stepsTaken: 0,
		totalWater: 0,
		totalCalories: 0
	};
	for (let i = 0;i <team.members.length;++i)
	{
		let userStat = await userC.getStats(team.members[i])
		stats.stepsTaken +=userStat.stepsTaken;
		stats.totalWater += userStat.totalWater;
		stats.totalCalories += userStat.totalCalories;
	}
	return stats;
}
let getAllTeamNames = async function(){
	let allTeams = [];
	const teamColl = await teams();
	let cursor = await teamColl.find({}, {_id: 0, teamName: 1});
	await cursor.forEach(x => {
		allTeams.push(x.teamName);
	});
	return(allTeams)
}

let addMember = async function(nameD, name){ //decided to use team name instead of id, team names should always be unique, but if it needs to change no big deal
	if(arguments.length != 2 || name == undefined || nameD == undefined) {
		throw("addMember: You must provide a nameD and team name.");
	}
	if(typeof name !== 'string' || name.trim() == "") {
		throw("addMember: name must be a string, and cannot be just empty spaces");
	}
	if(typeof nameD !== 'string' || nameD.trim() == "") {
		throw("addMember: nameD must be a string, and cannot be just empty spaces");
	}
	
	const teamsCollection = await teams();
	
	const team = await teamsCollection.findOne({teamName: name});
	if(team == null) {
		throw("addMember: No team with that name exists.");
	}
	else if (!team.members.includes(nameD)){
		let mems = team.members;
		let whatIsThis = mems.push(nameD);
		
		const upin = await teamsCollection.updateOne({teamName: name}, {$set: {members: mems}});
		if (upin === 0) {
			throw("addMember: unable to update that teams memebers");
		}
		let user = await userC.getUser(nameD);
		if (user.userTeam != name && user.userTeam > 0) //remove from old team
		{
			await removeMember(nameD,user.userTeam)
		}
		await userC.updateTeam(name, nameD);

		
		return 0;
		//return getTeam(name);
	}
}

//TEAMS change this shit, members can't be eniems only teams

let addFoe = async function(nameE, name){ //decided to use team name instead of id, team names should always be unique, but if it needs to change no big deal
	if(arguments.length != 2 || name == undefined || nameE == undefined) {
		throw("addFoe: You must provide two team name.");
	}
	if(typeof name !== 'string' || name.trim() == "") {
		throw("addFoe: name must be a string, and cannot be just empty spaces");
	}
	if(typeof nameE !== 'string' || nameE.trim() == "") {
		throw("addFoe: nameE must be a string, and cannot be just empty spaces");
	}
	
	const teamsCollection = await teams();
	
	const tester = await teamsCollection.findOne({teamName: nameE});
	if(tester == null) {
		throw("addFoe: No team with that nameE exists.");
	}
	
	const team = await teamsCollection.findOne({teamName: name});
	if(team == null) {
		throw("addFoe: No team with that name exists.");
	}
	else {
		
		let foes = team.enemies;
		let whatIsThis = foes.push(nameE);
		
		const upin = await teamsCollection.updateOne({teamName: name}, {$set: {enemies: foes}});
		if (upin === 0) {
			throw("addFoe: unable to update that teams enemies");
		}
		
		if (!tester.enemies.includes(name))
		{
			await addFoe(name,nameE);
		}
		return 0;
		//return getTeam(name);
	}
}

let removeMember = async function(nameD, name){ //decided to use team name instead of id, team names should always be unique, but if it needs to change no big deal
	if(arguments.length != 2 || name == undefined || nameD == undefined) {
		throw("removeMember: You must provide an nameD and team name.");
	}
	if(typeof name !== 'string' || name.trim() == "") {
		throw("removeMember: name must be a string, and cannot be just empty spaces");
	}
	if(typeof nameD !== 'string' || nameD.trim() == "") {
		throw("removeMember: nameD must be a string, and cannot be just empty spaces");
	}

	const teamsCollection = await teams();
	
	const team = await teamsCollection.findOne({teamName: name});
	if(team == null) {
		throw("removeMember: No team with that name exists.");
	}
	else {
		let mems = team.members;
		let index = mems.indexOf(nameD);
		if(index == -1) {
			throw("removeMember: user is not a member of given team");
		}
		mems.splice(index, 1);
		
		const upin = await teamsCollection.updateOne({teamName: name}, {$set: {members: mems}});
		if (upin === 0) {
			throw("removeMember: unable to update that teams memebers");
		}
		
		await userC.updateTeam("", nameD);
		return 0;
		//return getTeam(name);
	}
}

let removeFoe = async function(nameE, name){ //decided to use team name instead of id, team names should always be unique, but if it needs to change no big deal
	if(arguments.length != 2 || name == undefined || nameE == undefined) {
		throw("removeFoe: You must provide two team name.");
	}
	if(typeof name !== 'string' || name.trim() == "") {
		throw("removeFoe: name must be a string, and cannot be just empty spaces");
	}
	if(typeof nameE !== 'string' || nameE.trim() == "") {
		throw("removeFoe: nameE must be a string, and cannot be just empty spaces");
	}
	
	const teamsCollection = await teams();
	
	const tester = await teamsCollection.findOne({teamName: nameE});
	if(nameE == null) {
		throw("removeFoe: No team with that nameE exists.");
	}
	
	const team = await teamsCollection.findOne({teamName: name});
	if(team == null) {
		throw("removeFoe: No team with that name exists.");
	}
	else {
		let foes = team.enemies;
		let index = foes.indexOf(nameE);
		if(index == -1) {
			throw("removeFoe: team is not a enemy of given team");
		}
		foes.splice(index, 1);
		
		const upin = await teamsCollection.updateOne({teamName: name}, {$set: {enemies: foes}});
		if (upin === 0) {
			throw("removeFoe: unable to update that teams enemies");
		}
		if (tester.enemies.includes(name)) //remove foes from both teams. 
		{
			await removeFoe(name,nameE);
		}
		return 0;
		//return getTeam(name);
	}
}

//Leo wrote this
//given a user name and a team, returns a string suggesting if the player can join the team, leave the team, declare war on the team, or declare peace on the team
async function interactClan(username, teamname)
{
	let currentTeam = (await userC.getUser(username)).userTeam
	let team= await getTeam(teamname)
	if (!currentTeam || currentTeam.trim().length ===0) //if not on a team, join this team!
	{
		//await teams.addMember(req.session.username,req.body.teamName);
		return ("join");	
	}
	else if ( currentTeam === teamname) //if already on this team, leave it
	{
		//await teams.removeMember(req.session.username,req.body.teamName)
		return ("leave");
	}
	else if (team.enemies.includes(currentTeam)) //if on a team and at war with this team, end the war <3
	{
		//await teams.removeFoe(currentTeam);
		return "peace"
	}
	else if (currentTeam) //if on a team but not this team, declare war!
	{
		return "war";
	}
}


module.exports = {
	removeAll,
	createTeam,
	getTeam,
	getTeamStats,
	getAllTeamNames,
	addMember,
	addFoe,
	removeMember,
	removeFoe,
	interactClan
}