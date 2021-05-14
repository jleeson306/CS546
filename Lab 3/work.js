const axios = require('axios');
const people = require("./people");
//const util = require('util')
async function getWork(){
  const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/febcdd2ca91ddc685c163158ee126b4f/raw/c9494f59261f655a24019d3b94dab4db9346da6e/work.json');
  //const parsedData = JSON.parse(data); // parse the data from JSON into a normal JS Object
  //return parsedData; // this will be the array of people objects
  return data;
}
	
let listEmployees = async function() {
	const peopledata = await people.getPeople();
	const workdata = await getWork();
	let cname = [];
	let allemps = [];
	let emps = [];
	let x;
	let fir;
	let las;
	let e;
	for(let i = 0; i < workdata.length; i++) {
		cname.push(workdata[i].company_name);
		e = workdata[i].employees;
		for(let j = 0; j < e.length; j++) {
			//console.log("waiting" + i);
			x = await people.getPersonById(e[j])
			fir = x.first_name;
			las = x.last_name;
			emps.push({first_name: fir, last_name: las});
		}
		allemps.push(emps);
		emps = [];
	}
	let fin = [];
	let t1;
	let t2;
	let t3;
	for(let i = 0; i < cname.length; i++) {
		t1 = cname[i];
		t2 = allemps[i];
		t3 = {company_name: t1, employees: t2};
		fin.push(t3);
	}
	return fin;
}
let fourOneOne = async function(phoneNumber) {
	const workdata = await getWork();
	let validnums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
	if(phoneNumber == null){
		throw "ERROR: No input";
	}
	else if(typeof phoneNumber != 'string') {
		throw "ERROR: Input must be a string";
	}
	else if(!(arguments.length == 1)) {
		throw "ERROR: too many arguments";
	}
	else{
		if(!validnums.includes(phoneNumber[0])){
			throw "ERROR: Must be in the format ###-###-####";
		}
		else if(!validnums.includes(phoneNumber[1])){
			throw "ERROR: Must be in the format ###-###-####";
		}
		else if(!validnums.includes(phoneNumber[2])){
			throw "ERROR: Must be in the format ###-###-####";
		}
		else if(phoneNumber[3] != '-'){
			throw "ERROR: Must be in the format ###-###-####";
		}
		else if(!validnums.includes(phoneNumber[4])){
			throw "ERROR: Must be in the format ###-###-####";
		}
		else if(!validnums.includes(phoneNumber[5])){
			throw "ERROR: Must be in the format ###-###-####";
		}
		else if(!validnums.includes(phoneNumber[6])){
			throw "ERROR: Must be in the format ###-###-####";
		}
		else if(phoneNumber[7] != '-'){
			throw "ERROR: Must be in the format ###-###-####";
		}
		else if(!validnums.includes(phoneNumber[8])){
			throw "ERROR: Must be in the format ###-###-####";
		}
		else if(!validnums.includes(phoneNumber[9])){
			throw "ERROR: Must be in the format ###-###-####";
		}
		else if(!validnums.includes(phoneNumber[10])){
			throw "ERROR: Must be in the format ###-###-####";
		}
		else if(!validnums.includes(phoneNumber[11])){
			throw "ERROR: Must be in the format ###-###-####";
		}
		else {
			let eee = true;
			let myo;
			for(let i = 0; i < workdata.length; i++) {
				if (workdata[i].company_phone == phoneNumber) {
					myo = {company_name: workdata[i].company_name, company_address: workdata[i].company_address};
					eee = false;
				}
			}
			if(eee){throw "ERROR: Phone Number unable to be found";}
			else{return myo;}
		}
	}
}
let whereDoTheyWork = async function(ssn) {
	const workdata = await getWork();
	const peopledata = await people.getPeople();
	let validnums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
	if(ssn == null){
		throw "ERROR: No input";
	}
	else if(typeof ssn != 'string') {
		throw "ERROR: Input must be a string";
	}
	else if(!(arguments.length == 1)) {
		throw "ERROR: too many arguments";
	}
	else{
		if(!validnums.includes(ssn[0])){
			throw "ERROR: Must be in the format ###-##-####";
		}
		else if(!validnums.includes(ssn[1])){
			throw "ERROR: Must be in the format ###-##-####";
		}
		else if(!validnums.includes(ssn[2])){
			throw "ERROR: Must be in the format ###-##-####";
		}
		else if(ssn[3] != '-'){
			throw "ERROR: Must be in the format ###-##-####";
		}
		else if(!validnums.includes(ssn[4])){
			throw "ERROR: Must be in the format ###-##-####";
		}
		else if(!validnums.includes(ssn[5])){
			throw "ERROR: Must be in the format ###-##-####";
		}
		else if(ssn[6] != '-'){
			throw "ERROR: Must be in the format ###-##-####";
		}
		else if(!validnums.includes(ssn[7])){
			throw "ERROR: Must be in the format ###-##-####";
		}
		else if(!validnums.includes(ssn[8])){
			throw "ERROR: Must be in the format ###-##-####";
		}
		else if(!validnums.includes(ssn[9])){
			throw "ERROR: Must be in the format ###-##-####";
		}
		else if(!validnums.includes(ssn[10])){
			throw "ERROR: Must be in the format ###-##-####";
		}
		else {
			let oid;
			let fir;
			let las;
			let cna;
			let eee = true;
			for(let i = 0; i < peopledata.length; i++) {
				if(peopledata[i].ssn == ssn) {
					oid = peopledata[i].id;
					fir = peopledata[i].first_name;
					las = peopledata[i].last_name;
					eee = false;
				}
			}
			if(eee){throw "ERROR: SSN unable to be found";}
			for(let i = 0; i < workdata.length; i++) {
				if(workdata[i].employees.includes(oid)){
					cna = workdata[i].company_name;
				}
			}
			return fir + " " + las + " works at " + cna;
		}
	}
}

/*
async function main(){
    try{
		let p = await listEmployees();
		//let p = await fourOneOne();
		//let p = await whereDoTheyWork();
		console.log(util.inspect(p, {depth: null, maxArrayLength: null}));
    }catch(e){
        console.log (e);
    }
}*/
//main();




module.exports = {
    firstName: "James", 
    lastName: "Leeson", 
    studentId: "10433450",
	getWork,
	listEmployees,
	fourOneOne,
	whereDoTheyWork
};