const connection = require('./config/mongoConnection');
const movies = require('./data/movies');

async function main(){
	//This is to reset the database at the start of each test. This is for testing purposes
	try{
		let why = await movies.removeAll();
	}catch(e){
		console.log(e);
	}
	
    try{
		let a = await movies.create("title1", "plot1", "rating1", "runtime1", "genre1", ["cast1"], {director: "director1", yearReleased: 2001});
		console.log(a);
		let b = await movies.create("title2", "plot2", "rating2", "runtime2", "genre2", ["cast2"], {director: "director2", yearReleased: 2002});
		let c = await movies.getAll();
		console.log(c);
		let d = await movies.create("title3", "plot3", "rating3", "runtime3", "genre3", ["cast3"], {director: "director3", yearReleased: 2003});
		console.log(d);
		let f = await movies.rename(a._id.toString(), "newtitle1");
		console.log(f);
		let g = await movies.remove(b._id.toString());
		let h = await movies.getAll();
		console.log(h);
    }catch(e){
        console.log(e);
		console.log("test failed");
    }
	
	//All of these should fail
	try{
		let p = await movies.create("title1", "plot1", "rating1", "runtime1", "genre1", ["cast1"], {director: "director1", yearReleased: 3000});
		console.log("test failed unsuccesfully");
	}catch(e){
        console.log(e);
		console.log("test failed succesfully");
    }
	try{
		let p = await movies.remove('123123123123123123123123');
		console.log("test failed unsuccesfully");
	}catch(e){
        console.log(e);
		console.log("test failed succesfully");
    }
	try{
		let p = await movies.rename('123123123123123123123123', "newTitle");
		console.log("test failed unsuccesfully");
	}catch(e){
        console.log(e);
		console.log("test failed succesfully");
    }
	try{
		let p = await movies.rename('123123123123123123123123', "       ");
		console.log("test failed unsuccesfully");
	}catch(e){
        console.log(e);
		console.log("test failed succesfully");
    }
	try{
		let p = await movies.get('123123123123123123123123');
		console.log("test failed unsuccesfully");
	}catch(e){
        console.log(e);
		console.log("test failed succesfully");
    }
	
	const db = await connection();
	await db.serverConfig.close();
};


main().catch((error) => {
  console.log(error);
});