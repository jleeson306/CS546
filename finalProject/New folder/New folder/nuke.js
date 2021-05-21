const express = require('express');
const app = express();
const static = express.static(__dirname + '/public');
const userData = require("./data/usersCollection");
const teamData = require("./data/teamsCollection");
const commData = require("./data/commentsCollection");
const dstaData = require("./data/dailyStats");
const dactData = require("./data/dailyActivities");

async function main(){
	try {
		await userData.removeAll();
		await teamData.removeAll();
		await commData.removeAll();
		console.log("database has been wiped");
	}catch(e){
		console.log(e);
	}
	process.exit();
};

main().catch((error) => {
  console.log(error);
});