const mongoCollections = require('../config/mongoCollections');
const movies = mongoCollections.movies;
const {ObjectId} = require('mongodb');

let removeAll = async function() {
	console.log("heelo");
	const movieCollection = await movies();
	console.log("heelo");
	movieCollection.deleteMany({});
	return 0;
}
//oh my god this is a long error checking, should I have made a funciton like validString()????? might be faster/cleaner
let create = async function(title, plot, rating, runtime, genre, cast, info) {
	if(arguments.length != 7) {
		throw new Error("You must supply a title, plot, rating, runtime, genre, cast, and info");
	}
	else if(title === undefined || title === undefined) {
		throw new Error("title cannot be undefined");
	}
	else if(plot === undefined || plot === undefined) {
		throw new Error("plot cannot be undefined");
	}
	else if(rating === undefined || rating === undefined) {
		throw new Error("rating cannot be undefined");
	}
	else if(runtime === undefined || runtime === undefined) {
		throw new Error("runtime cannot be undefined");
	}
	else if(genre === undefined || genre === undefined) {
		throw new Error("genre cannot be undefined");
	}
	else if(cast === undefined || cast === undefined) {
		throw new Error("cast cannot be undefined");
	}
	else if(info === undefined || info === undefined) {
		throw new Error("info cannot be undefined");
	}
	else {
		if(typeof title !== 'string' || title.trim() == "") {
			throw new Error("title must be a string and not empty or just spaces");
		}
		else if(typeof plot !== 'string' || plot.trim() == "") {
			throw new Error("plot must be a string and not empty or just spaces");
		}
		else if(typeof rating !== 'string' || rating.trim() == "") {
			throw new Error("rating must be a string and not empty or just spaces");
		}
		else if(typeof runtime !== 'string' || runtime.trim() == "") {
			throw new Error("runtime must be a string and not empty or just spaces");
		}
		else if(typeof genre !== 'string' || genre.trim() == "") {
			throw new Error("genre must be a string and not empty or just spaces");
		}
		else {
			if(!(Array.isArray(cast))) {
				throw new Error("cast must be an array");
			}
			if(cast.length == 0) {
				throw new Error("cast must have at least 1 element");
			}
			let checker = true;
			for(let i of cast){
				if(typeof i === 'string' && i.trim() != ""){
					checker = false;
				}
			}
			if(checker){
				throw new Error("at least one element in cast must be a string");
			}
			if(typeof info !== 'object') {
				throw new Error("info must be an object");
			}
			if(!("director" in info)){
				throw new Error("info must include director");
			}
			if(!("yearReleased" in info)){
				throw new Error("info must include yearReleased");
			}
			if(typeof info.director !== 'string' || info.director.trim() == "") {
				throw new Error("info.director must be a string and not empty or just spaces");
			}
			else if(typeof info.yearReleased !== 'number' || info.yearReleased.toString().length !== 4) {
				throw new Error("yearReleased must be a 4 digit number");
			}
			else if(info.yearReleased < 1930 || info.yearReleased > 2026) {
				throw new Error("yearReleased must be between 1930 and current year + 5"); 
			}
			else{
				const movieCollection = await movies();
				
				let newMovie = {
					title: title,
					plot: plot,
					rating: rating,
					runtime: runtime,
					genre: genre,
					cast: cast,
					info: info
				};
				
				const inin = await movieCollection.insertOne(newMovie);
				if(inin.insertedCount === 0) {
					throw new Error("unable to insert new movie");
				}
				else{
					let ret = await this.get(inin.insertedId.toString());
					//ret._id = ret._id.toString();
					return ret;
				}
			}
		}
	}
}


let getAll = async function() {
	const movieCollection = await movies();
	let movieCollectionArray = await movieCollection.find({}).toArray();
	for(let i = 0; i < movieCollectionArray.length; i++) {
		movieCollectionArray[i]._id = movieCollectionArray[i]._id.toString();
	}
	return movieCollectionArray;
}

let get = async function(id) {
	if(id === undefined) {
		throw new Error("id cannot be undefined");
	}
	else if(id === null) {
		throw new Error("id cannot be null");
	}
	else if (typeof id === 'string') {
		id = ObjectId(id);
	}
	else {
		throw new Error("id must be of type string");
	}
	
	if (id instanceof ObjectId) {
		const movieCollection = await movies();
		const movie = await movieCollection.findOne({_id: id});
		
		if (movie === null) {
			throw new Error("no movie found with that id");
		}
		
		movie._id = movie._id.toString();
		return movie;
	}
	else {
		throw new Error("id is not a valid ObjectId");
	}
}

let remove = async function(id) {
	if(id === undefined) {
		throw new Error("id cannot be undefined");
	}
	else if(id === null) {
		throw new Error("id cannot be null");
	}
	else if (typeof id === 'string') {
		id = ObjectId(id);
	}
	else {
		throw new Error("id must be of type string");
	}
	
	if (id instanceof ObjectId) {
		const movieCollection = await movies();
		const movie = await movieCollection.findOne({_id: id});
		
		if (movie === null) {
			throw new Error("no movie found with that id");
		}
		
		const delin = await movieCollection.removeOne({_id: id});
		if (delin === 0) {
			throw new Error("Was unable to delete movie with that id");
		}
		
		let movieName = movie.title;
		
		return movieName;
	}
	else {
		throw new Error("id is not a valid ObjectId");
	}
}

let rename = async function(id, newTitle) {
	if(newTitle === undefined) {
		throw new Error("newTitle cannot be undefined");
	}
	else if(newTitle === null) {
		throw new Error("newTitle cannot be null");
	}
	else if(typeof newTitle !== 'string' || newTitle.trim() == 0) {
		throw new Error("newTitle must be a string that isn't empty or just spaces");
	}
	else {
		if(id === undefined) {
			throw new Error("id cannot be undefined");
		}
		else if(id === null) {
			throw new Error("id cannot be null");
		}
		else if (typeof id === 'string') {
			id = ObjectId(id);
		}
		else {
			throw new Error("id must be of type string");
		}
		if (id instanceof ObjectId) {
			const movieCollection = await movies();
			const movie = await movieCollection.findOne({_id: id});
			
			if (movie === null) {
				throw new Error("no movie found with that id");
			}
			
			const upin = await movieCollection.updateOne({_id: id}, {$set: {title: newTitle}});
			if (upin === 0) {
				throw new Error("Was unable to update movie with that id");
			}
			
			return await this.get(id.toString());
		}
		else {
			throw new Error("id is not a valid ObjectId");
		}
	}
}


module.exports = {
    firstName: "James", 
    lastName: "Leeson", 
    studentId: "10433450",
	create,
	getAll,
	get,
	remove,
	rename,
	removeAll
};