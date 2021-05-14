const mongoCollections = require('../config/mongoCollections');
const stats = mongoCollections.usersCollection;
const {ObjectId} = require('mongodb');
//const usersData = require('./userCollection');
const users = mongoCollections.usersCollection
const moment = require('moment');

let createDailyStats = async function(name, date, calories, steps, water) {
	if(arguments.length != 5 || name == undefined || date == undefined || calories == undefined || steps == undefined || water == undefined) {
		throw("createDailyStats: you must provide an name, date, calories, steps, water");
	}
	if(typeof name !== 'string' || name.trim() == "") {
		throw("createDailyStats: Given name must be a string.");
	}
	if(typeof date !== 'string' || date.trim() == "") {
		throw("createDailyStats: date must be a string with letters");
	}
	let beeboy = moment(date, 'YYYY-MM-DD', true).isValid();
	if(!beeboy) {
		throw("createDailyStats: date is invalid or in inncorect format");
	}
	if(typeof calories !== 'number') {
		throw("createDailyStats: given calories must be a number");
	}
	if(typeof steps !== 'number') {
		throw("createDailyStats: given steps must be a number");
	}
	if(typeof water !== 'number') {
		throw("createDailyStats: given water must be a number");
	}
	const usersCollection = await users();
	
	const user = await usersCollection.findOne({userDisplayName: name});
	if(user == null) {
		throw("createDailyStats: No user with that name exists.");
	}
	else {
		let dailyS = user.dailyStats;
		
		//let stat = await dailyS.findOne({date: date});
		let stat = await usersCollection.findOne({"dailyStats.date": date});
		if(stat == null) {
			let newDayStats = {
				date: date,
				caloriesConsumed: calories,
				stepsTaken: steps,
				waterConsumed: water,
				dailyActivities: []
			};
			
			let whatIsThis = dailyS.push(newDayStats);
			
			const upin = await usersCollection.updateOne({userDisplayName: name}, {$set: {dailyStats: dailyS}});
			if (upin === 0) {
				throw("createDailyStats: unable to update that memeber's dailyStats");
			}
			
			return 0;
		}
		else {
			throw("createDailyStats: A daily stat for today's date already exists");
		}
	}
}
let createDailyStatsEmpty = async function(name) {
	if(arguments.length != 1 || name == undefined) {
		throw("createDailyStatsEmpty: you must provide an name");
	}
	if(typeof name !== 'string' || name.trim() == "") {
		throw("createDailyStatsEmpty: Given name must be a string.");
	}
	
	const usersCollection = await users();
	
	const user = await usersCollection.findOne({userDisplayName: name});
	if(user == null) {
		throw("createDailyStatsEmpty: No user with that name exists.");
	}
	else {	//date code mainly taken from here https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript, sick
		let date = new Date();
		let dd = String(date.getDate()).padStart(2, '0');
		let mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
		let yyyy = date.getFullYear();
		//date = mm + '/' + dd + '/' + yyyy;
		date = yyyy + '-' + mm + '-' + dd;
		
		let dailyS = user.dailyStats;
		
		//let stat = await dailyS.findOne({date: date});
		let stat = await usersCollection.findOne({"dailyStats.date": date});
		if(stat == null) {
			let newDayStats = {
				date: date,
				caloriesConsumed: 0,
				stepsTaken: 0,
				waterConsumed: 0,
				dailyActivities: []
			};
			
			let whatIsThis = dailyS.push(newDayStats);
			
			const upin = await usersCollection.updateOne({userDisplayName: name}, {$set: {dailyStats: dailyS}});
			if (upin === 0) {
				throw("createDailyStatsEmpty: unable to update that memeber's dailyStats");
			}
			
			return 0;
		}
		else {
			throw("createDailyStatsEmpty: A daily stat for today's date already exists");
		}
	}
}

let getDailyStat = async function (username, date) {
	const usersCollection = await users();
	
	const user = await usersCollection.findOne({userDisplayName: username});
	if(user == null) {
		throw("createDailyStats: No user with that name exists.");
	}
	else {
		let stat = await usersCollection.findOne({"dailyStats.date": date});
		if(stat == null) {
			throw(`getDailyStat: No stat exists for that date`);
		}
		else {
			return stat;
		}

	}
}
let updateDailyStats = async function (username, date, calories, steps, water) {
	const usersCollection = await users();
	const user = await usersCollection.findOne({userDisplayName: username});
	let caloriesConsumed = calories;
	let stepsTaken = steps;
	let waterConsumed = water;
	let dailyStatsList = [];
	// console.log(user.dailyStats);
	user.dailyStats.forEach(stat => {
		if (stat.date == date) {
				if(!calories) {
					calories = 0;
				}
				if(!steps) {
					steps = 0;
				}
				if(!water) {
					water = 0;
				}
				// vvv This probably has to be fixed as it is a list of activities
				// if(!updatedStats.dailyActivities) {
				// 	dailyActivities = stat.dailyActivities;
				// }
				stat.caloriesConsumed = stat.caloriesConsumed +calories;
				stat.stepsTaken = stat.stepsTaken +steps;
				stat.waterConsumed = stat.waterConsumed+water;
			}
		dailyStatsList.push(stat);
		//console.log(stat);

	})
	// console.log(dailyStatsList);

	const updateInfo = await usersCollection.updateOne(
	  { userDisplayName: username },
	  { $set: {dailyStats : dailyStatsList} }
	);
	// if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
	//   throw 'Update failed';
	
}

/* 		

accidentally wrote this as I didn't know cassie made update already, leving it here in just in case
						*
let updateCalories = async function(id, date, calories) {
	if(arguments.length != 3 || id == undefined || date == undefined || calories == undefined) {
		throw("updateCalories: you must provide an id, date, and calories");
	}
	if(typeof id !== 'string') {
		throw("updateCalories: Given id must be a string.");
	}
	let objID;
	try{
		objID = new ObjectId(botID);
	}
	catch(e){
		throw("updateCalories: id(s) not in correct objectid format.");
	}
	if(typeof date !== 'string' || date.trim() == "") {
		throw("updateCalories: date must be a string with letters");
	}
	let beeboy = moment(date, 'MM/DD/YYYY', true).isValid();
	if(!beeboy) {
		throw("updateCalories: date is invalid or in inncorect format");
	}
	if(typeof calories !== 'number') {
		throw("updateCalories: given calories must be a number");
	}
	
	const user = await usersCollection.findOne({_id: objID});
	if(user == null) {
		throw("updateCalories: No user with that id exists.");
	}
	else {
		let dailyS = user.dailyStats;
		
		let stat = await dailyS.findOne({date: date});
		if(stat == null) {
			throw("updateCalories: no daily stats exist for that date");
		}
		else {
			let tot = stat.caloriesConsumed + calories;
			const upin = await dailyS.updateOne({date: date}, {$set: {caloriesConsumed: tot}});
			if (upin === 0) {
				throw("updateCalories: unable to update that memeber's dailyStats");
			}
			return 0;
		}
	}
}
let updateSteps = async function(id, date, steps) {
	if(arguments.length != 3 || id == undefined || date == undefined || steps == undefined) {
		throw("updateSteps: you must provide an id, date, and steps");
	}
	if(typeof id !== 'string') {
		throw("updateSteps: Given id must be a string.");
	}
	let objID;
	try{
		objID = new ObjectId(botID);
	}
	catch(e){
		throw("updateSteps: id(s) not in correct objectid format.");
	}
	if(typeof date !== 'string' || date.trim() == "") {
		throw("updateSteps: date must be a string with letters");
	}
	let beeboy = moment(date, 'MM/DD/YYYY', true).isValid();
	if(!beeboy) {
		throw("updateSteps: date is invalid or in inncorect format");
	}
	if(typeof steps !== 'number') {
		throw("updateSteps: given steps must be a number");
	}
	
	const user = await usersCollection.findOne({_id: objID});
	if(user == null) {
		throw("updateSteps: No user with that id exists.");
	}
	else {
		let dailyS = user.dailyStats;
		
		let stat = await dailyS.findOne({date: date});
		if(stat == null) {
			throw("updateSteps: no daily stats exist for that date");
		}
		else {
			let tot = stat.stepsTaken + steps;
			const upin = await dailyS.updateOne({date: date}, {$set: {stepsTaken: tot}});
			if (upin === 0) {
				throw("updateSteps: unable to update that memeber's dailyStats");
			}
			return 0;
		}
	}
}
let updateWater = async function(id, date, water) {
	if(arguments.length != 3 || id == undefined || date == undefined || water == undefined) {
		throw("updateWater: you must provide an id, date, and water");
	}
	if(typeof id !== 'string') {
		throw("updateWater: Given id must be a string.");
	}
	let objID;
	try{
		objID = new ObjectId(botID);
	}
	catch(e){
		throw("updateWater: id(s) not in correct objectid format.");
	}
	if(typeof date !== 'string' || date.trim() == "") {
		throw("updateWater: date must be a string with letters");
	}
	let beeboy = moment(date, 'MM/DD/YYYY', true).isValid();
	if(!beeboy) {
		throw("updateWater: date is invalid or in inncorect format");
	}
	if(typeof water !== 'number') {
		throw("updateWater: given water must be a number");
	}
	
	const user = await usersCollection.findOne({_id: objID});
	if(user == null) {
		throw("updateWater: No user with that id exists.");
	}
	else {
		let dailyS = user.dailyStats;
		
		let stat = await dailyS.findOne({date: date});
		if(stat == null) {
			throw("updateWater: no daily stats exist for that date");
		}
		else {
			let tot = stat.waterConsumed + water;
			const upin = await dailyS.updateOne({date: date}, {$set: {waterConsumed: tot}});
			if (upin === 0) {
				throw("updateWater: unable to update that memeber's dailyStats");
			}
			return 0;
		}
	}
}

 * 								*/

module.exports = {
		createDailyStats,
		createDailyStatsEmpty,
		updateDailyStats,
		getDailyStat
}