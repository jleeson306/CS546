const people = require("./people");
const work = require("./work");
const axios = require('axios');
//const util = require('util')

async function main(){
	//test getPersonById !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    try{
		let p = await people.getPersonById(43);
		console.log (p);
		console.log('getPersonById passed successfully \n');
    }catch(e){
        console.log (e);
		console.error('getPersonById failed test case \n');
    }
	try{
		let p = await people.getPersonById(-20);
		console.log (p);
		console.log('getPersonById did not error \n');
	}catch(e){
		console.log (e);
		console.error('getPersonById failed successfully \n');
	}
	try{
		let p = await people.getPersonById(15000);
		console.log (p);
		console.log('getPersonById did not error \n');
	}catch(e){
		console.log (e);
		console.error('getPersonById failed successfully \n');
	}
	try{
		let p = await people.getPersonById();
		console.log (p);
		console.log('getPersonById did not error \n');
	}catch(e){
		console.log (e);
		console.error('getPersonById failed successfully \n');
	}
	
	//test howManyPerState !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	try{
		let p = await people.howManyPerState('CO');
		console.log (p);
		console.log('howManyPerState passed successfully \n');
    }catch(e){
        console.log (e);
		console.error('howManyPerState failed test case \n');
    }
	try{
		let p = await people.howManyPerState(5000);
		console.log (p);
		console.log('howManyPerState did not error \n');
	}catch(e){
		console.log (e);
		console.error('howManyPerState failed successfully \n');
	}
	try{
		let p = await people.howManyPerState('WY');
		console.log (p);
		console.log('howManyPerState did not error \n');
	}catch(e){
		console.log (e);
		console.error('howManyPerState failed successfully \n');
	}
	try{
		let p = await people.howManyPerState();
		console.log (p);
		console.log('howManyPerState did not error \n');
	}catch(e){
		console.log (e);
		console.error('howManyPerState failed successfully \n');
	}
	
	//test personByAge !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	try{
		let p = await people.personByAge(500);
		console.log (p);
		console.log('personByAge passed successfully \n');
    }catch(e){
        console.log (e);
		console.error('personByAge failed test case \n');
    }
	try{
		let p = await people.personByAge(50000);
		console.log (p);
		console.log('personByAge did not error \n');
	}catch(e){
		console.log (e);
		console.error('personByAge failed successfully \n');
	}
	try{
		let p = await people.personByAge('WY');
		console.log (p);
		console.log('personByAge did not error \n');
	}catch(e){
		console.log (e);
		console.error('personByAge failed successfully \n');
	}
	try{
		let p = await people.personByAge();
		console.log (p);
		console.log('personByAge did not error \n');
	}catch(e){
		console.log (e);
		console.error('personByAge failed successfully \n');
	}
	
	//test peopleMetrics !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	try{
		let p = await people.peopleMetrics();
		console.log (p);
		console.log('peopleMetrics passed successfully \n');
	}catch(e){
		console.log (e);
		console.error('peopleMetrics failed test case \n');//I never throw here, so I don't think it can actually go here, keeping it just in case
	}
	
	//test listEmployees !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	try{
		let p = await work.listEmployees();
		//console.log(util.inspect(p, {depth: null, maxArrayLength: null}));
		console.log(p);
		console.log('listEmployees passed successfully \n'); //takes like 2 minutes to run, but was told on slack it didn't matter
	}catch(e){
		console.log (e);
		console.error('listEmployees failed test case \n');//I never throw here, so I don't think it can actually go here, keeping it just in case
	}
	
	//test fourOneOne !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	try{
		let p = await work.fourOneOne('240-144-7553');
		console.log (p);
		console.log('fourOneOne passed successfully \n');
    }catch(e){
        console.log (e);
		console.error('fourOneOne failed test case \n');
    }
	try{
		let p = await work.fourOneOne(50000);
		console.log (p);
		console.log('fourOneOne did not error \n');
	}catch(e){
		console.log (e);
		console.error('fourOneOne failed successfully \n');
	}
	try{
		let p = await work.fourOneOne('212-208-8371');
		console.log (p);
		console.log('fourOneOne did not error \n');
	}catch(e){
		console.log (e);
		console.error('fourOneOne failed successfully \n');
	}
	try{
		let p = await work.fourOneOne('abc-123-5783');
		console.log (p);
		console.log('fourOneOne did not error \n');
	}catch(e){
		console.log (e);
		console.error('fourOneOne failed successfully \n');
	}
	try{
		let p = await work.fourOneOne();
		console.log (p);
		console.log('fourOneOne did not error \n');
	}catch(e){
		console.log (e);
		console.error('fourOneOne failed successfully \n');
	}
	
	//test whereDoTheyWork !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	try{
		let p = await work.whereDoTheyWork('277-85-0056');
		console.log (p);
		console.log('whereDoTheyWork passed successfully \n');
    }catch(e){
        console.log (e);
		console.error('whereDoTheyWork failed test case \n');
    }
	try{
		let p = await work.whereDoTheyWork('123-45-');
		console.log (p);
		console.log('whereDoTheyWork did not error \n');
	}catch(e){
		console.log (e);
		console.error('whereDoTheyWork failed successfully \n');
	}
	try{
		let p = await work.whereDoTheyWork('264-67-0084');
		console.log (p);
		console.log('whereDoTheyWork did not error \n');
	}catch(e){
		console.log (e);
		console.error('whereDoTheyWork failed successfully \n');
	}
	try{
		let p = await work.whereDoTheyWork();
		console.log (p);
		console.log('whereDoTheyWork did not error \n');
	}catch(e){
		console.log (e);
		console.error('whereDoTheyWork failed successfully \n');
	}
	
}

//call main
main();