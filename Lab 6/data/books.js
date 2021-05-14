const mongoCollections = require('../config/mongoCollections');
const books = mongoCollections.books;
const {ObjectId} = require('mongodb');

//this checkDate is heavily taken from a stack overflow link
////https://stackoverflow.com/questions/6177975/how-to-validate-date-with-format-mm-dd-yyyy-in-javascript
let checkDate = function(str) {
	if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(str)) {
		return false;
	}
	else {
		let parts = str.split("/");
		let day = parseInt(parts[1], 10);
		let month = parseInt(parts[0], 10);
		let year = parseInt(parts[2], 10);
		
		if(year > 2021 || year < 0) {
			return false;
		}
		if(month == 0 || month > 12) {
			return false;
		}
		let daysInM = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		if(day < 0) {
			return false;
		}
		if(day > daysInM[month - 1]){
			return false;
		}
		return true;
	}
}

let removeAll = async function() {
	const bookCollection = await books();
	bookCollection.deleteMany({});
	return 0;
}
let createBooks = async function(title, author, genre, datePublished, summary) {
	if(arguments.length != 5) {
		throw("You must supply a title, author, genre, datePublished, summary");
	}
	else if(title === undefined || title === null) {
		throw("You must supply a title");
	}
	else if(author === undefined || author === null) {
		throw("You must supply a author");
	}
	else if(genre === undefined || genre === null) {
		throw("You must supply a genre");
	}
	else if(datePublished === undefined || datePublished === null) {
		throw("You must supply a datePublished");
	}
	else if(summary === undefined || summary === null) {
		throw("You must supply a summary");
	}
	//else if(reviews === undefined || reviews === null) {
	//	throw("You must supply a reviews");
	//}
	
	if(typeof title !== 'string' || title.trim() == "") {
		throw("title must be a string and not empty or just spaces");
	}
	else if(typeof author !== 'object') {
		throw("author must be an object");
	}
	else if(!Array.isArray(genre)) {
		throw("genre must be an array");
	}
	else if(typeof datePublished !== 'string' || datePublished.trim() == "") {
		throw("datePublished must be a string and not empty or just spaces");
	}
	else if(typeof summary !== 'string' || summary.trim() == "") {
		throw("summary must be a string and not empty or just spaces");
	}
	//else if(!Array.isArray(reviews)) {
	//	throw("reviews must be an array");
	//}
	
	let authkeys = Object.keys(author);
	if(authkeys.length != 2 || authkeys[0] != "authorFirstName" || authkeys[1] != "authorLastName") {
		throw("author must be an object with 2 keys, authorFirstName and authorLastName");
	}
	let authvals = Object.values(author);
	if(typeof authvals[0] !== 'string' || authvals[0].trim() == "" || typeof authvals[1] !== 'string' || authvals[1].trim() == "") {
		throw("author values must be strings and not empty or just spaces");
	}
	
	if (genre.length == 0) {
		throw("genre array must not be empty");
	}
	for(let i = 0; i < genre.length; i++) {
		if(typeof genre[i] !== 'string' || genre[i].trim() == "") {
			throw("every entry in genre must be a non empty/not just spaces string");
		}
	}
	
	let ch = checkDate(datePublished);
	if(!ch) {
		throw("given datePublished is not a valid date, make sure it is in the format mm/dd/yyyy");
	}
	
	//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
	//I don't know how i'm going to do reviews yet, so imma just ignore it
	//wait maybe always initilze it as empty????
	//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
	
	const booksCollection = await books();
	let newBook = {
		title: title,
		author: author,
		genre: genre,
		datePublished: datePublished,
		summary: summary,
		reviews: []
	};
	
	const inin = await booksCollection.insertOne(newBook);
	if(inin.insertedCount === 0) {
		throw("unable to insert new book");
	}
	else{
		let ret = await this.readBooksID(inin.insertedId.toString());
		//ret._id = ret._id.toString();
		return ret;
	}
}

let readBooks = async function() {
	
	const bookCollection = await books();
	
	let bookCollectionArray = await bookCollection.find({}).toArray();
	let retArray = [];
	let id;
	let title;
	let obj;
	for(let i = 0; i < bookCollectionArray.length; i++) {
		id = bookCollectionArray[i]._id.toString();
		title = bookCollectionArray[i].title;
		obj = {_id: id, title: title};
		retArray.push(obj)
	}
	//for(let i = 0; i < bookCollectionArray.length; i++) {
	//	bookCollectionArray[i]._id = bookCollectionArray[i]._id.toString();
	//}
	//return bookCollectionArray;
	return retArray;
}
let readBooksID = async function(id) {
	if(id === undefined) {
		throw("id cannot be undefined");
	}
	else if(id === null) {
		throw("id cannot be null");
	}
	else if (typeof id === 'string') {
		id = ObjectId(id);
	}
	else {
		throw("id must be of type string");
	}
	
	if (id instanceof ObjectId) {
		const bookCollection = await books();
		const book = await bookCollection.findOne({_id: id});
		
		if (book === null) {
			throw("no book found with that id");
		}
		
		book._id = book._id.toString();
		return book;
	}
	else {
		throw("id is not a valid ObjectId");
	}
}
let updateBooks = async function(id, title, author, genre, datePublished, summary) {
	if(arguments.length != 6) {
		throw ("You must supply a title, author, genre, datePublished, summary");
	}
	else if(title === undefined || title === null) {
		throw ("You must supply a title");
	}
	else if(author === undefined || author === null) {
		throw ("You must supply a author");
	}
	else if(genre === undefined || genre === null) {
		throw ("You must supply a genre");
	}
	else if(datePublished === undefined || datePublished === null) {
		throw ("You must supply a datePublished");
	}
	else if(summary === undefined || summary === null) {
		throw ("You must supply a summary");
	}
	//else if(reviews === undefined || reviews === null) {
	//	throw("You must supply a reviews");
	//}
	
	if(typeof title !== 'string' || title.trim() == "") {
		throw ("title must be a string and not empty or just spaces");
	}
	else if(typeof author !== 'object') {
		throw ("author must be an object");
	}
	else if(!Array.isArray(genre)) {
		throw ("genre must be an array");
	}
	else if(typeof datePublished !== 'string' || datePublished.trim() == "") {
		throw ("datePublished must be a string and not empty or just spaces");
	}
	else if(typeof summary !== 'string' || summary.trim() == "") {
		throw ("summary must be a string and not empty or just spaces");
	}
	//else if(!Array.isArray(reviews)) {
	//	throw("reviews must be an array");
	//}
	
	let authkeys = Object.keys(author);
	if(authkeys.length != 2 || authkeys[0] != "authorFirstName" || authkeys[1] != "authorLastName") {
		throw ("author must be an object with 2 keys, authorFirstName and authorLastName");
	}
	let authvals = Object.values(author);
	if(typeof authvals[0] !== 'string' || authvals[0].trim() == "" || typeof authvals[1] !== 'string' || authvals[1].trim() == "") {
		throw ("author values must be strings and not empty or just spaces");
	}
	
	if (genre.length == 0) {
		throw ("genre array must not be empty");
	}
	for(let i = 0; i < genre.length; i++) {
		if(typeof genre[i] !== 'string' || genre[i].trim() == "") {
			throw ("every entry in genre must be a non empty/not just spaces string");
		}
	}
	
	let ch = checkDate(datePublished);
	if(!ch) {
		throw("given datePublished is not a valid date, make sure it is in the format mm/dd/yyyy");
	}
	
	if(id === undefined || id === null) {
		throw ("id cannot be undefined");
	}
	else if (typeof id === 'string') {
		id = ObjectId(id);
	}
	else {
		throw ("id must be of type string");
	}
	if (id instanceof ObjectId) {
		const bookCollection = await books();
		const book = await bookCollection.findOne({_id: id});
		
		if (book === null) {
			throw ("no book found with that id");
		}
		
		const upin = await bookCollection.updateMany({_id: id}, {$set: {title: title, author: author, genre: genre, datePublished: datePublished, summary: summary}});
		if (upin === 0) {
			throw ("Was unable to update book with that id");
		}
		
		return await this.readBooksID(id.toString());
	}
	else {
		throw ("id is not a valid ObjectId");
	}
}
let deleteBooks = async function(id) {
	if(id === undefined) {
		throw("id cannot be undefined");
	}
	else if(id === null) {
		throw("id cannot be null");
	}
	else if (typeof id === 'string') {
		id = ObjectId(id);
	}
	else {
		throw("id must be of type string");
	}
	
	if (id instanceof ObjectId) {
		const bookCollection = await books();
		const book = await bookCollection.findOne({_id: id});
		
		if (book === null) {
			throw("no book found with that id");
		}
		
		const delin = await bookCollection.removeOne({_id: id});
		if (delin === 0) {
			throw("Was unable to delete book with that id");
		}
		
		let bookRev = book.reviews;
		
		return bookRev;
	}
	else {
		throw("id is not a valid ObjectId");
	}
}

let changeT = async function(id, newT) { //I know this is a bad way to do this, and if I have time I will come back to change it
	if(typeof newT !== 'string' || newT.trim() == "") {
		throw ("title must be a string and not empty or just spaces");
	}
	if(id === undefined || id === null) {
		throw ("id cannot be undefined");
	}
	else if (typeof id === 'string') {
		id = ObjectId(id);
	}
	else {
		throw ("id must be of type string");
	}
	if (id instanceof ObjectId) {
		const bookCollection = await books();
		const book = await bookCollection.findOne({_id: id});
		
		if (book === null) {
			throw ("no book found with that id");
		}
		
		const upin = await bookCollection.updateOne({_id: id}, {$set: {title: newT}});
		if (upin === 0) {
			throw ("Was unable to update book with that id");
		}
		
		return await this.readBooksID(id.toString());
	}
	else {
		throw ("id is not a valid ObjectId");
	}
}
let changeA = async function(id, newA) {
	if(typeof newA !== 'object') {
		throw ("author must be an object");
	}
	let authkeys = Object.keys(newA);
	if(authkeys.length != 2 || authkeys[0] != "authorFirstName" || authkeys[1] != "authorLastName") {
		throw ("author must be an object with 2 keys, authorFirstName and authorLastName");
	}
	let authvals = Object.values(newA);
	if(typeof authvals[0] !== 'string' || authvals[0].trim() == "" || typeof authvals[1] !== 'string' || authvals[1].trim() == "") {
		throw ("author values must be strings and not empty or just spaces");
	}
	if(id === undefined || id === null) {
		throw ("id cannot be undefined");
	}
	else if (typeof id === 'string') {
		id = ObjectId(id);
	}
	else {
		throw ("id must be of type string");
	}
	if (id instanceof ObjectId) {
		const bookCollection = await books();
		const book = await bookCollection.findOne({_id: id});
		
		if (book === null) {
			throw ("no book found with that id");
		}
		
		const upin = await bookCollection.updateOne({_id: id}, {$set: {author: newA}});
		if (upin === 0) {
			throw ("Was unable to update book with that id");
		}
		
		return await this.readBooksID(id.toString());
	}
	else {
		throw ("id is not a valid ObjectId");
	}
}
let changeG = async function(id, newG) {
	if(!Array.isArray(newG)) {
		throw ("genre must be an array");
	}
	if (newG.length == 0) {
		throw ("genre array must not be empty");
	}
	for(let i = 0; i < newG.length; i++) {
		if(typeof newG[i] !== 'string' || newG[i].trim() == "") {
			throw ("every entry in genre must be a non empty/not just spaces string");
		}
	}
	if(id === undefined || id === null) {
		throw ("id cannot be undefined");
	}
	else if (typeof id === 'string') {
		id = ObjectId(id);
	}
	else {
		throw ("id must be of type string");
	}
	if (id instanceof ObjectId) {
		const bookCollection = await books();
		const book = await bookCollection.findOne({_id: id});
		
		if (book === null) {
			throw ("no book found with that id");
		}
		let trueNewG = book.genre.concat(newG);
		const upin = await bookCollection.updateOne({_id: id}, {$set: {genre: trueNewG}});
		if (upin === 0) {
			throw ("Was unable to update book with that id");
		}
		
		return await this.readBooksID(id.toString());
	}
	else {
		throw ("id is not a valid ObjectId");
	}
}
let changeD = async function(id, newD) {
	if(typeof newD !== 'string' || newD.trim() == "") {
		throw ("datePublished must be a string and not empty or just spaces");
	}
	let ch = checkDate(newD);
	if(!ch) {
		throw("given datePublished is not a valid date, make sure it is in the format mm/dd/yyyy");
	}
	if(id === undefined || id === null) {
		throw ("id cannot be undefined");
	}
	else if (typeof id === 'string') {
		id = ObjectId(id);
	}
	else {
		throw ("id must be of type string");
	}
	if (id instanceof ObjectId) {
		const bookCollection = await books();
		const book = await bookCollection.findOne({_id: id});
		
		if (book === null) {
			throw ("no book found with that id");
		}
		
		const upin = await bookCollection.updateOne({_id: id}, {$set: {datePublished: newD}});
		if (upin === 0) {
			throw ("Was unable to update book with that id");
		}
		
		return await this.readBooksID(id.toString());
	}
	else {
		throw ("id is not a valid ObjectId");
	}
}
let changeS = async function(id, newS) {
	if(typeof newS !== 'string' || newS.trim() == "") {
		throw ("summary must be a string and not empty or just spaces");
	}
	if(id === undefined || id === null) {
		throw ("id cannot be undefined");
	}
	else if (typeof id === 'string') {
		id = ObjectId(id);
	}
	else {
		throw ("id must be of type string");
	}
	if (id instanceof ObjectId) {
		const bookCollection = await books();
		const book = await bookCollection.findOne({_id: id});
		
		if (book === null) {
			throw ("no book found with that id");
		}
		
		const upin = await bookCollection.updateOne({_id: id}, {$set: {summary: newS}});
		if (upin === 0) {
			throw ("Was unable to update book with that id");
		}
		
		return await this.readBooksID(id.toString());
	}
	else {
		throw ("id is not a valid ObjectId");
	}
}
let getReviews = async function(id) { //don't ask me why I put this in here, I had a reason, it was just a dumb reason
	if(id === undefined || id === null) {
		throw ("id cannot be undefined");
	}
	else if (typeof id === 'string') {
		id = ObjectId(id);
	}
	else {
		throw ("id must be of type string");
	}
	if (id instanceof ObjectId) {
		const bookCollection = await books();
		const book = await bookCollection.findOne({_id: id});
		
		if (book === null) {
			throw ("no book found with that id");
		}
		if(book.reviews.length == 0){
			throw ("That book has no reviews");
		}
		else {
			return book.reviews;
		}
	}
	else {
		throw ("id is not a valid ObjectId");
	}
}

module.exports = {
    firstName: "James", 
    lastName: "Leeson", 
    studentId: "10433450",
	removeAll,
	deleteBooks,
	updateBooks,
	readBooks,
	readBooksID,
	createBooks,
	changeT,
	changeA,
	changeG,
	changeD,
	changeS,
	getReviews,
	checkDate
};