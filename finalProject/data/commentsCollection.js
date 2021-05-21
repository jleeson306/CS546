const mongoCollections = require('../config/mongoCollections');
const comments = mongoCollections.commentsCollection;
const users = mongoCollections.usersCollection;
const teams = mongoCollections.teamsCollection;
const {ObjectId} = require('mongodb');
const userC = require('./usersCollection');
const teamsC = require('./teamsCollection');

const removeAll = async function() {
	const commentsCollection = await comments();
	commentsCollection.deleteMany({});
	return 0;
}

let createCommentTeam = async function(topName,message,botName)//adds a comment to a team page
{
	if(arguments.length != 3 || message == undefined || topName == undefined || botName == undefined) {
		throw("createComment: you must provide both ids and message");
	}
	if(typeof message !== 'string' || message.trim() == "") {
		throw("createComment: message must be a string, and cannot be just empty spaces");
	}
	if(typeof topName !== 'string' || topName.trim() == "") {
		throw("createComment: topName must be a string, and cannot be just empty spaces");
	}
	if(typeof botName !== 'string') {
		throw("createComment: Given botName must be a string.");
	}
	
	const commentsCollection = await comments();
	if (!isTeam)
	{
		const usersCollection = await users();
		user = await usersCollection.findOne({userDisplayName: botName});
	}
	else
	{
		teams.getTeam(botName);
	}
	//const nameExist = await usersCollection.findOne({userDisplayName: displayName});
	if(user == null) {
		throw("createComment: No user with that id exists.");
	}
	else {	//date code mainly taken from here https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript, sick
		let date = new Date();
		let dd = String(date.getDate()).padStart(2, '0');
		let mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
		let yyyy = date.getFullYear();
		date = yyyy + '-' + mm + '-' + dd;
		
		let newComment = {
			date: date,
			userDisplayName: topName,
			message: message
		};
		
		const inIn = await commentsCollection.insertOne(newComment);
		if(inIn.insertCount === 0) {
			throw("createComment: unable to add this comment");
		}
		else {

			let coms = user.userComments;
			if(!Array.isArray(coms)) {
					coms = [];
			}
			let whatIsThis = coms.push(inIn.insertedId);
			const upin = await usersCollection.updateOne({userDisplayName: botName}, {$set: {userComments: coms}});
			if (upin === 0) {
				throw("createComment: unable to update that memeber's comments");
			}
			let returnComment = await commentsCollection.findOne({_id: inIn.insertedId});
			return returnComment;
		}
	}	
}

//format is createComment(poster's ID, message, user recieving comment ID)
let createComment = async function(topName, message, botName, isTeam) {
	
	if(arguments.length < 3 || message == undefined || topName == undefined || botName == undefined) {
		throw("createComment: you must provide both ids and message");
	}
	if(typeof message !== 'string' || message.trim() == "") {
		throw("createComment: message must be a string, and cannot be just empty spaces");
	}
	if(typeof topName !== 'string' || topName.trim() == "") {
		throw("createComment: topName must be a string, and cannot be just empty spaces");
	}
	if(typeof botName !== 'string') {
		throw("createComment: Given botName must be a string.");
	}
	
	const commentsCollection = await comments();
	let user= null
	const usersCollection = await users();
	const teamsCollection = await teams();
	if (!isTeam){
		user = await usersCollection.findOne({userDisplayName: botName});
		if(user == null) {
			throw("createComment: No user with that id exists.");
		}
	}
	else
	{
		user = await teamsC.getTeam(botName)
		if (user == null)
		{
			throw ("createComment: No team with that id exists.");
		}
	}
	//const nameExist = await usersCollection.findOne({userDisplayName: displayName});

	 	//date code mainly taken from here https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript, sick
		let date = new Date();
		let dd = String(date.getDate()).padStart(2, '0');
		let mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
		let yyyy = date.getFullYear();
		date = yyyy + '-' + mm + '-' + dd;
		
		let newComment = {
			date: date,
			userDisplayName: topName,
			message: message
		};
		
		const inIn = await commentsCollection.insertOne(newComment);
		if(inIn.insertCount === 0) {
			throw("createComment: unable to add this comment");
		}
		else {

			let coms = user.userComments;
			if(!Array.isArray(coms)) {
					coms = [];
			}
			let whatIsThis = coms.push(inIn.insertedId);
			let upin = null;
			if (!isTeam)
			{
				upin = await usersCollection.updateOne({userDisplayName: botName}, {$set: {userComments: coms}});
			}
			else
			{
				upin = await teamsCollection.updateOne({teamName: botName}, {$set: {userComments: coms}});
			}
			if (upin === 0) {
				throw("createComment: unable to update that memeber's comments");
			}
			let returnComment = await commentsCollection.findOne({_id: inIn.insertedId});
			return returnComment;
		}
}

const getComment = async function(id){
	if(arguments.length != 1 || id == undefined) {
		throw("getComment: you must provide a comment id");
	}
	if(typeof id !== 'string') {
		throw("getComment: id must be a string");
	}
	let objID;
	try{
		objID = new ObjectId(id);
	}
	catch(e){
		throw("getComment: id not in correct objectid format.");
	}
	
	const commentsCollection = await comments();
	
	const comment = await commentsCollection.findOne({_id: objID});
	if(comment == null) {
		throw("getComment: no comment with that id found");
	}
	
	return comment;
}

module.exports = {
	getComment,
	createComment,
	removeAll
}