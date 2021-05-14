const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.usersCollection;
const {ObjectId} = require('mongodb');
const moment = require('moment');
const bcrypt = require("bcrypt");
const { usersCollection } = require('../config/mongoCollections');

const removeAll = async function() {
	const usersCollection = await users();
	usersCollection.deleteMany({});
	return 0;
}

//function validateEmail(email) {		//https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
//	const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//	return re.test(email);
//}

const createUser = async function(firstName, lastName, displayName, birth, email, gender, pass) {
	if(arguments.length != 7 || firstName == undefined || lastName == undefined || displayName == undefined || email == undefined || gender == undefined || pass == undefined || birth == undefined) {
		throw("createUser: you are missing one of these - firstName, lastName, displayName, birth, email, gender, pass");
	}
	if(typeof firstName !== 'string' || firstName.trim() == "") {
		//throw("createUser: firstName must be a string with letters");
		//in case user wants to not give some of this info??
		firstName = "";
	}
	if(typeof lastName !== 'string' || lastName.trim() == "") {
		//throw("createUser: lastName must be a string with letters");
		//in case user wants to not give some of this info??
		lastName = "";
	}
	if(typeof displayName !== 'string' || displayName.trim() == "") {
		throw("createUser: displayName must be a string with letters");
	}
	if(typeof email !== 'string' || email.trim() == "") {
		throw("createUser: email must be a string with letters");
	}
	let bbool = false;
	if(typeof birth !== 'string' || birth.trim() == "") {
		throw("createUser: birth must be a string with letters");
		//in case user wants to not give some of this info??
		bbool = true;
	}
	if(typeof pass !== 'string' || pass.trim() == "") {
		throw("createUser: pass must be a string with letters");
	}
	if(typeof gender !== 'string' || gender.trim() == "") {
		//throw("createUser: gender must be a string with letters");
		//in case user wants to not give some of this info??
		gender = "";
	}
	
	let beeboy = moment(birth, 'YYYY-MM-DD', true).isValid();
	if(!beeboy) {
		throw("createUser: birth is invalid or in inncorect format");
	}
	if(bbool) {
		birth = "";
	}
	
	const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if(!re.test(email)) {
		throw("createUser: not a valid email");
	}
	
	const usersCollection = await users();
	
	const nameExist = await usersCollection.findOne({userDisplayName: displayName});
	if(nameExist != null) {
		throw("createUser: a user with that display name already exists");
	}
	
	let newUser = {						//Default team is right now "", should it instead be like "N/A", "NONE", some shit like that???
		userFirstName: firstName,
		userLastName: lastName,
		userDisplayName: displayName,
		userBirthday: new Date(birth),
		userEmail: email,
		userGender: gender,
		userPasswordHashed: bcrypt.hashSync(pass,16),
		userBio: "",
		userTeam: "",			
		userComments: [],
		dailyStats: []
	};
	
	const inIn = await usersCollection.insertOne(newUser);
	if(inIn.insertCount === 0) {
		throw("createUser: unable to add this user");
	}
	else{
		return 0;
		//return getUser(displayName);
	}

	
}

const updateFirstName = async function(name, dName){
	if(arguments.length != 2 || name == undefined || dName == undefined) {
		throw("updateFirstName: You must have a name and a dName");
	}
	if(typeof name !== 'string' || name.trim() == "") {
		//throw("updateFirstName: name must be a string with letters");
		//in case user wants to not give some of this info??
		name = "";
	}
	if(typeof dName !== 'string' || dName.trim() == "") {
		throw("updateFirstName: dName must be a string with letters");
	}

	const usersCollection = await users();
	let user = await usersCollection.findOne({userDisplayName: dName});
	if(user == null) {
		throw("updateFirstName: user could not be found");
	}
	
	const upin = await usersCollection.updateOne({userDisplayName: dName}, {$set: {userFirstName: name}});
	if (upin === 0) {
		throw("updateFirstName: failed to update");
	}
	
	return 0;
}
const updateLastName = async function(name, dName){
	if(arguments.length != 2 || name == undefined || dName == undefined) {
		throw("updateLastName: You must have a name and a dName");
	}
	if(typeof name !== 'string' || name.trim() == "") {
		//throw("updateLastName: name must be a string with letters");
		//in case user wants to not give some of this info??
		name = "";
	}
	if(typeof dName !== 'string' || dName.trim() == "") {
		throw("updateLastName: dName must be a string with letters");
	}

	const usersCollection = await users();
	let user = await usersCollection.findOne({userDisplayName: dName});
	if(user == null) {
		throw("updateLastName: user could not be found");
	}
	
	const upin = await usersCollection.updateOne({userDisplayName: dName}, {$set: {userLastName: name}});
	if (upin === 0) {
		throw("updateLastName: failed to update");
	}
	
	return 0;
}
const updateBirthday = async function(date, dName){
	if(arguments.length != 2 || date == undefined || dName == undefined) {
		throw("updateBirthday: You must have a date and a dName");
	}
	let dbool = false;
	if(typeof date !== 'string' || date.trim() == "") {
		//throw("updateBirthday: date must be a string with letters");
		//in case user wants to not give some of this info??
		dbool = true;
	}
	if(typeof dName !== 'string' || dName.trim() == "") {
		throw("updateBirthday: dName must be a string with letters");
	}
	let beeboy = moment(date, 'YYYY-MM-DD', true).isValid();
	if(!beeboy) {
		throw("updateBirthday: date is invalid or in inncorect format");
	}
	if(dbool) {
		date = "";
	}
	
	const usersCollection = await users();
	let user = await usersCollection.findOne({userDisplayName: dName});
	if(user == null) {
		throw("updateBirthday: user could not be found");
	}
	
	const upin = await usersCollection.updateOne({userDisplayName: dName}, {$set: {userBirthday: new Date(date)}});
	if (upin === 0) {
		throw("updateBirthday: failed to update");
	}
	
	return 0;
}
const updateEmail = async function(mail, dName){
	if(arguments.length != 2 || mail == undefined || dName == undefined) {
		throw("updateEmail: You must have a mail and a dName");
	}
	if(typeof mail !== 'string' || mail.trim() == "") {
		throw("updateEmail: mail must be a string with letters");
	}
	if(typeof dName !== 'string' || dName.trim() == "") {
		throw("updateEmail: dName must be a string with letters");
	}
	const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if(!re.test(mail)) {
		throw("updateEmail: not a valid email");
	}
	
	const usersCollection = await users();
	let user = await usersCollection.findOne({userDisplayName: dName});
	if(user == null) {
		throw("updateEmail: user could not be found");
	}
	
	const upin = await usersCollection.updateOne({userDisplayName: dName}, {$set: {userEmail: mail}});
	if (upin === 0) {
		throw("updateEmail: failed to update");
	}
	
	return 0;
}
const updateGender = async function(gen, dName){
	if(arguments.length != 2 || gen == undefined || dName == undefined) {
		throw("updateGender: You must have a gen and a dName");
	}
	if(typeof gen !== 'string' || gen.trim() == "") {
		//throw("updateGender: gen must be a string with letters");
		//in case user wants to not give some of this info??
		gen = "";
	}
	if(typeof dName !== 'string' || dName.trim() == "") {
		throw("updateGender: dName must be a string with letters");
	}
	
	const usersCollection = await users();
	let user = await usersCollection.findOne({userDisplayName: dName});
	if(user == null) {
		throw("updateGender: user could not be found");
	}
	
	const upin = await usersCollection.updateOne({userDisplayName: dName}, {$set: {userGender: gen}});
	if (upin === 0) {
		throw("updateGender: failed to update");
	}
	
	return 0;
}
const updatePassword = async function(pass, dName){
	if(arguments.length != 2 || pass == undefined || dName == undefined) {
		throw("updatePassword: You must have a pass and a dName");
	}
	if(typeof pass !== 'string' || pass.trim() == "") {
		throw("updatePassword: pass must be a string with letters");
	}
	if(typeof dName !== 'string' || dName.trim() == "") {
		throw("updatePassword: dName must be a string with letters");
	}
	
	const usersCollection = await users();
	let user = await usersCollection.findOne({userDisplayName: dName});
	if(user == null) {
		throw("updatePassword: user could not be found");
	}
	
	const upin = await usersCollection.updateOne({userDisplayName: dName}, {$set: {userPasswordHashed: pass}});
	if (upin === 0) {
		throw("updatePassword: failed to update");
	}
	
	return 0;
}
const updateBio = async function(bio, dName){
	if(arguments.length != 2 || bio == undefined || dName == undefined) {
		throw("updateBio: You must have a bio and a dName");
	}
	if(typeof bio !== 'string' || bio.trim() == "") {
		//throw("updateBio: bio must be a string with letters");
		//in case user wants to not give some of this info??
		bio = "";
	}
	if(typeof dName !== 'string' || dName.trim() == "") {
		throw("updateBio: dName must be a string with letters");
	}
	
	const usersCollection = await users();
	let user = await usersCollection.findOne({userDisplayName: dName});
	if(user == null) {
		throw("updateBio: user could not be found");
	}
	
	const upin = await usersCollection.updateOne({userDisplayName: dName}, {$set: {userBio: bio}});
	if (upin === 0) {
		throw("updateBio: failed to update");
	}
	
	return 0;
}
const updateTeam = async function(team, dName){
	if(arguments.length != 2 || team == undefined || dName == undefined) {
		throw("updateTeam: You must have a team and a dName");
	}
	if(typeof team !== 'string') {
		throw("updateTeam: team must be a string");
	}
	if(team.trim() == "") {
		team = "";
	}
	if(typeof dName !== 'string' || dName.trim() == "") {
		throw("updateTeam: dName must be a string with letters");
	}
	
	const usersCollection = await users();
	let user = await usersCollection.findOne({userDisplayName: dName});
	if(user == null) {
		throw("updateTeam: user could not be found");
	}
	
	const upin = await usersCollection.updateOne({userDisplayName: dName}, {$set: {userTeam: team}});
	if (upin === 0) {
		throw("updateTeam: failed to update");
	}
	
	return 0;
}
const updateAny = async function(obj, dName){
	if(arguments.length != 2 || obj == undefined || dName == undefined) {
		throw("updateAny: You must have a object and a dName");
	}
	if(typeof obj !== 'object') {
		throw("updateAny: obj must be a object");
	}
	
	if("userFirstName" in obj) {
		await this.updateFirstName(obj.userFirstName, dName);
	}
	if("userLastName" in obj) {
		await this.updateLastName(obj.userLastName, dName);
	}
	if("userBirthday" in obj) {
		await this.updateBirthday(obj.userBirthday, dName);
	}
	if("userEmail" in obj) {
		await this.updateEmail(obj.userEmail, dName);
	}
	if("userGender" in obj) {
		await this.updateGender(obj.userGender, dName);
	}
	if("userPasswordHashed" in obj) {
		await this.updatePassword(obj.userPasswordHashed, dName);
	}
	if("userBio" in obj) {
		await this.updateBio(obj.userBio, dName);
	}
	if("userTeam" in obj) {
		await this.updateTeam(obj.userTeam, dName);
	}
	const usersCollection = await users();
	let user = await usersCollection.findOne({userDisplayName: dName});
	if(user == null){
		throw("updateAny: User could not be found");
	}
	return user;
}

// Nick wrote this :)
// Given a user's display name, pulls the entire user from the database (including daily stats)
const getUser = async function(userDisplayName){
	if(typeof userDisplayName !== 'string') throw "Error - getUser: userDisplayName must be a string";
	if(userDisplayName.trim() == "") {
		throw("userDisplayName must contain letters");
	}
	const userColl = await users();
	const user = await userColl.findOne({userDisplayName: userDisplayName});
	if(user == null) throw "Error - getUser: No user with that display name";
	return user;
}

// Nick wrote this :)
// Given a user's id as a string formatted for ObjectId, returns the entire user
// Has the same functionality as getUser, but I thought it might be useful
// to have both options
const getUserById = async function(id){
	if(typeof id !== 'string') throw "Error - getUserById: id must be a string";
	let idObj;
	try{
		idObj = new ObjectId(id);
	}
	catch(e){
		throw "Error - getUserById: id is not in the right format";
	}
	const userColl = await users();
	const user = await userColl.findOne({_id: idObj});
	// if(user == null) throw "Error - getUser: No user with that id";
	return user;
}

//Leo wrote this :japanese_goblin:
//given a username, gets the totalSteps, totalWater, totalCalories, and average lifetime calories
const getStats= async function(username)
{
	let stats = {stepsTaken: 0,
				totalWater: 0,
				totalCalories: 0,
				averageCalories: 1
				};
	let user = await getUser(username)
	if (user.dailyStats)
	{
		for (let i = 0; i < user.dailyStats.length; ++i)
		{
			stats.stepsTaken += user.dailyStats[i].stepsTaken
			stats.totalWater += user.dailyStats[i].waterConsumed
			stats.totalCalories += user.dailyStats[i].caloriesConsumed
			stats.averageCalories+=1 //count the number of days
		}
	}	
	stats.averageCalories = stats.totalCalories /stats.averageCalories
	return stats;
}

//Leo wrote this :japanese_goblin:
//queries the user collection for the full list of users, then calculates the average stats
const getAverageStats = async function()
{
	let stats = {totalSteps: 0,
				totalWater: 0,
				totalCalories: 0,
				averageCalories: 1
				};
	(await (await users()).find()).forEach(
		doc => {
			if (doc.dailyStats) // we don't call getStats here because that would involve querying the database again. This solution is slightly faster
			{
				for (let i = 0; i < doc.dailyStats.length; ++i)
				{
					stats.totalSteps += doc.dailyStats[i].stepsTaken
					stats.totalWater += doc.dailyStats[i].waterConsumed
					stats.totalCalories += doc.dailyStats[i].caloriesConsumed
					stats.averageCalories+=1 //count the number of days
				}
			}
		}
	)
	stats.averageCalories = stats.totalCalories /stats.averageCalories
	return stats
	//console.log(allUsers)
}

const getAllNames = async function(){
	let allUsers = [];
	const userColl = await users();
	let cursor = await userColl.find({}, {_id: 0, userDisplayName: 1});
	await cursor.forEach(x => {
		allUsers.push(x.userDisplayName);
	});
	return(allUsers)
}

module.exports = {
	removeAll,
	createUser,
	getUser,
	getUserById,
	getAllNames,
	getStats,
	getAverageStats,
	updateFirstName,
	updateLastName,
	updateBirthday,
	updateEmail,
	updateGender,
	updatePassword,
	updateBio,
	updateTeam,
	updateAny
}
