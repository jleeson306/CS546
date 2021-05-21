const userData = require("./data/usersCollection");
const teamData = require("./data/teamsCollection");
const commData = require("./data/commentsCollection");
const dstaData = require("./data/dailyStats");
const dactData = require("./data/dailyActivities");

async function main(){
	try {
		console.log("please wait for database to be populate");
		await userData.removeAll();
		await teamData.removeAll();
		await commData.removeAll();
		console.log("0/10 users added");
		await userData.createUser("Sherlock", "Holmes", "masterdetective123", "1854-01-06", "mrHOTmes@hotmail.com", "Male", "elementarymydearwatson"); 
		console.log("1/10 users added");
		await userData.createUser("Liz", "Lemon", "lemon", "1970-11-19", "nemisis@gmail.com", "Female", "damnyoujackdonaghy");
		console.log("2/10 users added");
		await userData.createUser("Harry", "Potter", "theboywholived", "1980-07-31", "magic@mugglemail.com", "Wizzard", "quidditch");
		console.log("3/10 users added");
		await userData.createUser("Uncle", "Sam", "america", "1776-07-04", "usa@state.com", "Male", "oil");
		console.log("4/10 users added");
		await userData.createUser("Arthur", "Dent", "hitchhiker1337", "1979-10-12", "towels@space.com", "Male", "life=42");
		console.log("5/10 users added");
		await userData.createUser("Mario", "Mario", "redplumber", "1981-09-02", "red@mushroom.com", "Male", "manthewingcapstarssucked");
		console.log("6/10 users added");
		await userData.createUser("Luigi", "Mario", "greenplumber", "1983-03-28", "green@mushroom.com", "Male", "luigismansionwassick");
		console.log("7/10 users added");
		await userData.createUser("Peach", "Toadstool", "theprincess", "1985-05-15", "pink@mushroom.com", "Female", "stitchfaceop");
		console.log("8/10 users added");
		await userData.createUser("King", "Koopa", "bowser", "1985-09-13", "theking@koopakingdom.com", "Koopa", "kart>kidnapping");
		console.log("9/10 users added");
		await userData.createUser("Kid", "Koopa", "bowser_jr", "2008-09-28", "theprince@mugglemail.com", "Koopa", "mansunshineisslepton");
		console.log("10/10 users added");
		console.log("Adding teams");
		await teamData.createTeam("Gryffindor");
		await teamData.createTeam("Scotland Yard");
		await teamData.createTeam("The World Police");
		await teamData.createTeam("The Toadstool Kingdom");
		await teamData.createTeam("The Koopa Kingdom");
		await teamData.addMember("theboywholived", "Gryffindor");
		await teamData.addMember("masterdetective123", "Scotland Yard");		//I know he isn't actually part of scotland yard, just the team name
		await teamData.addMember("america", "The World Police");
		await teamData.addMember("redplumber", "The Toadstool Kingdom");
		await teamData.addMember("greenplumber", "The Toadstool Kingdom");
		await teamData.addMember("theprincess", "The Toadstool Kingdom");
		await teamData.addMember("bowser", "The Koopa Kingdom");
		await teamData.addMember("bowser_jr", "The Koopa Kingdom");
		await teamData.addFoe("The Toadstool Kingdom", "The Koopa Kingdom");
		console.log("Teams have been added");
		console.log("Adding Comments");
		await commData.createComment("masterdetective123", "f**king dumb ass loser boy, magic doesn't exist and neither do wizards, f**k on out of the UK chump!!!!!", "theboywholived");
		await commData.createComment("theprincess", "Bowser, would you kindly stop telling your son that I am his mother, it is irresponsible.", "bowser");
		await commData.createComment("bowser_jr", "Hey mom, when are you coming home, I got an A on my spelling test recently and I want to show it to you.", "theprincess");
		await commData.createComment("bowser", "Hey, I was wondering if after school you would be intersted in enlisting in the Koopa Kingdom Army?", "theboywholived");
		await commData.createComment("redplumber", "Hey bro, wanna go golfing on the 2nd???", "bowser");
		await commData.createComment("greenplumber", "Hey bro, wanna go karting on the 7th???", "bowser");
		console.log("Comments added");
		console.log("Adding Stats");
		await dstaData.createDailyStats("masterdetective123", "2021-05-10", 1600, 2500, 2, "investigating a so called potions class", 60, 25);
		
		await dstaData.createDailyStats("theboywholived", "2021-05-10", 2250, 4500, 4, "potions", 60, 50);
		await dactData.createDailyActivities("theboywholived", "2021-05-10", "quidditch", 60, 250);
		await dstaData.createDailyStats("theboywholived", "2021-05-11", 2600, 4350, 5);
		await dactData.createDailyActivities("theboywholived", "2021-05-11", "quidditch", 60, 250);
		await dactData.createDailyActivities("theboywholived", "2021-05-11", "spellcasting", 30, 200);
		await dstaData.createDailyStats("theboywholived", "2021-05-12", 2000, 3900, 5, "magic stuff", 70, 40);
		await dstaData.createDailyStats("theboywholived", "2021-05-13", 2250, 4500, 4, "magic stuff 2 electric boogaloo", 65, 45);
		await dstaData.createDailyStats("theboywholived", "2021-05-14", 2250, 4500, 5, "magic stuff 3 yippee", 55, 55);

		await dstaData.createDailyStats("redplumber", "2021-05-07", 2300, 1200, 5, "karting", 120, 150);
		await dstaData.createDailyStats("greenplumber", "2021-05-07", 1800, 1000, 4, "karting", 120, 150);
		await dstaData.createDailyStats("theprincess", "2021-05-07", 1575, 750, 3, "karting", 120, 150);
		await dstaData.createDailyStats("bowser", "2021-05-07", 3800, 900, 8, "karting", 120, 150);
		await dstaData.createDailyStats("bowser_jr", "2021-05-07", 1900, 200, 5, "karting", 120, 150);

		await dstaData.createDailyStats("redplumber", "2021-05-02", 2300, 2000, 6, "golfing", 180, 125);
		await dstaData.createDailyStats("greenplumber", "2021-05-02", 1800, 1900, 4, "golfing", 180, 125);
		await dstaData.createDailyStats("theprincess", "2021-05-02", 1575, 1750, 4, "golfing", 180, 125);
		await dstaData.createDailyStats("bowser", "2021-05-02", 3800, 4500, 7, "golfing", 180, 125);
		await dstaData.createDailyStats("bowser_jr", "2021-05-02", 1900, 2050, 4, "golfing", 180, 125);

		// await dstaData.createDailyStats("lemon", "2021-03-21", 1500, 10000, 2, "push-ups", 3, 200);
		// await dactData.createDailyActivities("lemon", "2021-03-21", "jogging", 30, 500);
		// await dstaData.createDailyStats("lemon", "2020-12-3", 2500, 4000, 0.1, "sit-ups", 30, 160);

		console.log("Stats added");
		console.log("database has been populated");
		process.exit();
	}catch(e){
		console.log(e);
	}
};

main().catch((error) => {
  console.log(error);
});