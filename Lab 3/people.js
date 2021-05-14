const axios = require('axios');
async function getPeople(){
  const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json');
  //const parsedData = JSON.parse(data); // parse the data from JSON into a normal JS Object
  //return parsedData; // this will be the array of people objects
  return data;
}
let date2age = function date2age(str) {
	let today = new Date();
	let cd = parseInt(String(today.getDate()).padStart(2, '0'));
	let cm = parseInt(String(today.getMonth() + 1).padStart(2, '0'));
	let cy = parseInt(today.getFullYear());
	
	let m = parseInt(str.substring(0,2));
	let d = parseInt(str.substring(3,5));
	let y = parseInt(str.substring(6,10));

	if(cm > m) {
		return cy - y;
		}
	else if(cm == m) {
		if(cd <= d) {
			return cy - y - 1;
		}
		else{
			return cy - y;
		}
	}
	else{
		return cy - y - 1;
	}
}
const countRepeating = function countRepeating(arr) {//YOOOOOO I get to reuse this, thats sick, also don't moss me, this is
													 //my own code I turned in for assignment 2, so like I can't plagerize
													 //myself... I hope
	let fino = new Object();
	let dcon = [];
	if(arr == null){
		throw "no input";
	}
	else if(!(Array.isArray(arr))) {
		throw "not array";
	}
	else if(arr.length == 0) {
		return fino;
	}
	else if(!(arguments.length == 1)) {
		throw "too many arguments";
	}
	else {
		for (let i of arr) {
			if((typeof i === 'string') || (Number.isInteger(i))) {
				if(dcon.includes(i)) {
					if(fino[i]) {
						fino[i] = fino[i] + 1;
					}
					else {
						fino[i] = 2;
					}
				}
				else {
					if(Number.isInteger(i)) {
						dcon.push(i.toString())
					}
					else {
						dcon.push(i);
					}
				}
			}
			else {
				return "Array must contain only numbers or strings";
			}
		}
	}
	return fino;
}

let getPersonById = async function(id){
	const peopledata = await getPeople();
	let min = 9007199254740990;
	let max = -9007199254740990;
	for(let i = 0; i < peopledata.length; i++) {
		if(peopledata[i].id > max) {max = peopledata[i].id;}
		if(peopledata[i].id < min) {min = peopledata[i].id;}
	}
	if(id == null){
		throw "ERROR: No input";
	}
	else if(typeof id != 'number') {
		throw "ERROR: Input must be a number";
	}
	else if(id > max) {
		throw "ERROR: Input is too large, max id for this data set is " + max;
	}
	else if(id < min) {
		throw "ERROR: Input is too small, min id for this data set is " + min;
	}
	else if(!(arguments.length == 1)) {
		throw "ERROR: too many arguments";
	}
	else{
		let ret;
		for(let i = 0; i < peopledata.length; i++) {
			if(peopledata[i].id == id) {
				ret = peopledata[i];
			}
		}
		return ret;
	}
}
let howManyPerState = async function(stateAbbrv) {
	const peopledata = await getPeople();
	const states = [
	 'AL','AK','AS','AZ','AR','CA','CO','CT','DE','DC','FM','FL','GA',
	 'GU','HI','ID','IL','IN','IA','KS','KY','LA','ME','MH','MD','MA',
	 'MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND',
	 'MP','OH','OK','OR','PW','PA','PR','RI','SC','SD','TN','TX','UT',
	 'VT','VI','VA','WA','WV','WI','WY'
	 ];
	//took this array from https://gist.github.com/bubblerun/a624de5b4fa8ff0980010054a7220977, I hope you won't count this
	//as cheating or anything as its just an array of abriviations, just being transparent
	if(stateAbbrv == null){
		throw "ERROR: No input";
	}
	else if(typeof stateAbbrv != 'string') {
		throw "ERROR: Input must be a string";
	}
	else if(!(arguments.length == 1)) {
		throw "ERROR: too many arguments";
	}
	else if (!(states.includes(stateAbbrv))) {
		throw "ERROR: Abbreviation input in not a State in US";
	}
	else{
		let ret = 0;
		for(let i = 0; i < peopledata.length; i++) {
			if(peopledata[i].address.state == stateAbbrv) {
				ret++;
			}
		}
		if(ret > 0){return ret;}
		else{throw "ERROR: No one found in that state"}
	}
}
let personByAge = async function(index) {
	//wrote the find age fucntion, but like for real fuck this function, how i sort this shit
	//maybe create an object with id as the key and age as the value, might work well?
	const peopledata = await getPeople();
	if(index == null){
		throw "ERROR: No input";
	}
	else if(typeof index != 'number') {
		throw "ERROR: Input must be a number";
	}
	else if(!(arguments.length == 1)) {
		throw "ERROR: too many arguments";
	}
	else if(index > (peopledata.length - 1) || index < 0) {
		throw "ERROR: index not within bounds";
	}
	else{
		let idplusdat = [];
		let ido;
		let dob;
		let fnam;
		let lnam;
		for(let i = 0; i < peopledata.length; i++) {
			ido = peopledata[i].id;
			dob = peopledata[i].date_of_birth;
			fnam = peopledata[i].first_name;
			lnam = peopledata[i].last_name;
			idplusdat.push({ido, dob, fnam, lnam})
		}
		idplusdat.sort(function(a,b) {
			return new Date(a.dob).getTime() - new Date(b.dob).getTime()
		});
		return {
			first_name: idplusdat[index].fnam,
			last_name: idplusdat[index].lnam,
			date_of_birth: idplusdat[index].dob,
			age: date2age(idplusdat[index].dob)
		};
	}
}
let peopleMetrics = async function() {
	const peopledata = await getPeople();
	let totLet = 0;
	let totCon = 0;
	let totVow = 0;
	let longName = "";
	let shortName = "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible. Yellow, black. Yellow, black. Yellow, black. Yellow, black. Ooh, black and yellow! Let's shake it up a little. Barry! Breakfast is ready! Ooming! Hang on a second. Hello? - Barry? - Adam? - Oan you believe this is happening? - I can't. I'll pick you up. Looking sharp. Use the stairs. Your father paid good money for those. Sorry. I'm excited. Here's the graduate. We're very proud of you, son. A perfect report card, all B's. Very proud. Ma! I got a thing going here. - You got lint on your fuzz. - Ow! That's me! - Wave to us! We'll be in row 118,000. - Bye! Barry, I told you, stop flying in the house! - Hey, Adam. - Hey, Barry. - Is that fuzz gel? - A little. Special day, graduation. Never thought I'd make it. Three days grade school, three days high school. Those were awkward. Three days college. I'm glad I took a day and hitchhiked around the hive. You did come back different. - Hi, Barry. - Artie, growing a mustache? Looks good. - Hear about Frankie? - Yeah. - You going to the funeral? - No, I'm not going. Everybody knows, sting someone, you die. Don't waste it on a squirrel. Such a hothead. I guess he could have just gotten out of the way."; //i'm sorry I tried to just copy the entire script, but it had quotation marks in it and I didn't care enough about the joke to go through the effort of removing them :) 
	let mostCity = "";
	let mostCityArr = [];
	let avAge = 0;
	let avAgeB4Div = 0;
	let vows = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];
	let cons = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z',
				'B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z']
	let name;
	for(let i = 0; i < peopledata.length; i++) {
		avAgeB4Div += date2age(peopledata[i].date_of_birth);
		name = (peopledata[i].first_name + peopledata[i].last_name);
		for(let j = 0; j < name.length; j++) {
			if(vows.includes(name[j])) {totVow += 1;totLet += 1;}
			else if(cons.includes(name[j])) {totCon += 1;totLet += 1;}
			//totLet += 1; only if we include stuff like ' as a letter !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		}
		if(name.length < shortName.length) {shortName = name;}
		if(name.length > longName.length) {longName = name;}
		mostCityArr.push(peopledata[i].address.city);
	}
	avAge = avAgeB4Div / peopledata.length;
	let x = Object.entries(countRepeating(mostCityArr));
	let c = 0;
	for(let i = 0; i < x.length; i++) {
		if(x[i][1] > c) {
			c = x[i][1];
			mostCity = x[i][0];
		}
	}
	//if two citys are mentions the same amount, which do we give back???!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	return {
		totalLetters: totLet,
		totalVowels: totVow,
		totalConsonants: totCon,
		longestName: longName,
		shortestName: shortName,
		mostRepeatingCity: mostCity,
		averageAge: avAge,
	}
}

module.exports = {
    firstName: "James", 
    lastName: "Leeson", 
    studentId: "10433450",
	getPeople,
	getPersonById,
	howManyPerState,
	personByAge,
	peopleMetrics
};