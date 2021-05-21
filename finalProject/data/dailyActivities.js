const mongoCollections = require('../config/mongoCollections');
const activities = mongoCollections.usersCollection;
const users = mongoCollections.usersCollection;
const {ObjectId} = require('mongodb');
const moment = require('moment');
const dStats = require('./dailyStats');


const util = require('util')

let createDailyActivities = async function(name, date, type, duration, burnt) {
	if(arguments.length != 5 || name == undefined || date == undefined || type == undefined || duration == undefined || burnt == undefined) {
		throw("createDailyActivities: you must provide an name, date, type, duration, burnt");
	}
	if(typeof name !== 'string' || name.trim() == "") {
		throw("createDailyActivities: Given name must be a string.");
	}
	if(typeof date !== 'string' || date.trim() == "") {
		throw("createDailyActivities: date must be a string with letters");
	}
	let beeboy = moment(date, 'YYYY-MM-DD', true).isValid();
	if(!beeboy) {
		throw("createDailyActivities: date is invalid or in inncorect format");
	}
	if(typeof type !== 'string' || type.trim() == "") {
		throw("createDailyActivities: type must be a string with letters");
	}
	if(typeof duration !== 'number') {
		throw("createDailyActivities: given duration must be a number");
	}
	if(typeof burnt !== 'number' || burnt <= 0) {
		throw("createDailyActivities: given burnt must be a  positive number");
	}
	
	const usersCollection = await users();
	
	const user = await usersCollection.findOne({userDisplayName: name});
	if(user == null) {
		throw("createDailyActivities: No user with that name exists.");
	}
	else {
		//let dailyS = user.dailyStats;
		
		//let stat = await dailyS.findOne({date: date})
		//let stat = await usersCollection.findOne({"dailyStats.date": date});
		//if(stat == null) {
		//	throw("createDailyActivities: no daily stats for that date exist yet");
		//}
		let dailySs = user.dailyStats;
		if(!Array.isArray(dailySs)) {
				dailySs = [];
		}
		let place = -1;
		for(let i = 0; i < dailySs.length; i++) {
			if(dailySs[i].date == date) {
				place = i;
				dailySo = dailySs[i];
			}
		}
		if(place == -1) {
			throw("createDailyActivities: no daily stats for that date exist yet");
		}
		
		let dailyA = dailySo.dailyActivities;
		
		let newDayAct = {
			exerciseType: type,
			exerciseDuration: duration,
			caloriesBurnt: burnt
		};
		
		if(!Array.isArray(dailyA)) {
				dailyA = [];
		}
		let whatIsThis = dailyA.push(newDayAct);
		dailySo.dailyActivities = dailyA;
		dailySs.splice(place, 1, dailySo);
		const upin = await usersCollection.updateOne({userDisplayName: name}, {$set: {dailyStats: dailySs}});
		if (upin === 0) {
			throw("createDailyActivities: unable to update that memeber's dailyStats");
		}
		
		//perhaps we could automatically update out total counter for calories????
		//dStats.updateCalories(id, date, burnt);
		
		return 0
	}
}

let updateDailyActivities = async function (userid, actsid, updatedActivities) {
	const user = await this.get(userid);
	const acts = await user.dailyActivities.get(actsid);
	//console.log(acts);
	let actsidobj = ObjectId(id);
	let exerciseType = updatedActivities.exerciseType;
	let exerciseDuration = updatedActivities.exerciseDuration;
	let caloriesBurnt = updatedActivities.caloriesBurnt;
	if(!updatedActivities.exerciseType) {
		exerciseType = acts.exerciseType;
	}
	if(!updatedActivities.exerciseDuration) {
		exerciseDuration = acts.exerciseDuration;
	}
	if(!updatedActivities.caloriesBurnt) {
		caloriesBurnt = acts.caloriesBurnt;
	}
	let actsUpdateInfo = {
		exerciseType: exerciseType,
		exerciseDuration: exerciseDuration,
		caloriesBurnt: caloriesBurnt
	};

	const usersActivities = await user.dailyActivities;
	const updateInfo = await usersActivities.updateOne(
	  { _id: actsidobj },
	  { $set: actsUpdateInfo }
	);
	if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
	  throw 'Update failed';

	//return await this.get(id);
}

module.exports = {
	createDailyActivities,
	updateDailyActivities
}