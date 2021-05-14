const mongoCollections = require('../config/mongoCollections');
const books = mongoCollections.books; //Does reviews need its own database
const {ObjectId} = require('mongodb');
const bookData = require('./books');

let createReviews = async function(id, title, reviewer, rating, dateOfReview, review) {
	if(arguments.length != 6) {
		throw("You must supply a id, title, reviewer, rating, dateOfReview, review");
	}
	else if(title === undefined || title === null) {
		throw("You must supply a title");
	}
	else if(reviewer === undefined || reviewer === null) {
		throw("You must supply a reviewer");
	}
	else if(rating === undefined || rating === null) {
		throw("You must supply a rating");
	}
	else if(dateOfReview === undefined || dateOfReview === null) {
		throw("You must supply a dateOfReview");
	}
	else if(review === undefined || review === null) {
		throw("You must supply a review");
	}
	
	if(typeof title !== 'string' || title.trim() == "") {
		throw("title must be a string and not empty or just spaces");
	}
	else if(typeof reviewer !== 'string' || reviewer.trim() == "") {
		throw("reviewer must be a string and not empty or just spaces");
	}
	else if(typeof rating !== 'number' || rating > 5 || rating < 1) {
		throw("rating must be a number that ranges from 1 to 5");
	}
	else if(typeof dateOfReview !== 'string' || dateOfReview.trim() == "") {
		throw("dateOfReview must be a string and not empty or just spaces");
	}
	else if(typeof review !== 'string' || review.trim() == "") {
		throw("review must be a string and not empty or just spaces");
	}
	let ch = bookData.checkDate(dateOfReview);
	if(!ch) {
		throw("given dateOfReview is not a valid date, make sure it is in the format mm/dd/yyyy");
	}
	
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
		let newReview = {
			_id: new ObjectId(),
			title: title,
			reviewer: reviewer,
			rating: rating,
			dateOfReview: dateOfReview,
			review: review,
		};
		const book = await bookCollection.findOne({_id: id});
		
		if (book === null) {
			throw ("no book found with that id");
		}
		let revs = book.reviews;
		let godwhy = revs.push(newReview);
		
		
		const upin = await bookCollection.updateOne({_id: id}, {$set: {reviews: revs}});
		if (upin === 0) {
			throw ("Was unable to update book with that id");
		}
		
		return await bookData.readBooksID(id.toString());
	}
	else {
		throw ("id is not a valid ObjectId");
	}
}
let readReviewsID = async function(id) {
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
		let book = await bookCollection.findOne({ "reviews._id": id });
		if (book === null) {
			throw ("no review found with that id");
		}
		let rev = book.reviews;
		let retRev;
		for(let i = 0; i < rev.length; i++){
			if(rev[i]._id.toString() == id.toString()) {
				retRev = rev[i];
			}
		}
		
		return retRev;
	}
	else {
		throw ("id is not a valid ObjectId");
	}
}
let deleteReviews = async function(id) {
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
		let book = await bookCollection.findOne({ "reviews._id": id });
		if (book === null) {
			throw ("no review found with that id");
		}
		let rev = book.reviews;
		let retRev = [];
		for(let i = 0; i < rev.length; i++){
			if(rev[i]._id.toString() != id.toString()) {
				retRev.push(rev[i]);
			}
		}
		
		const upin = await bookCollection.updateOne(book, {$set: {reviews: retRev}});
		if (upin === 0) {
			throw ("Was unable to update book with that id");
		}
		
		return {"reviewId": id, "deleted": true};
	}
	else {
		throw ("id is not a valid ObjectId");
	}
}

module.exports = {
    firstName: "James", 
    lastName: "Leeson", 
    studentId: "10433450",
	createReviews,
	readReviewsID,
	deleteReviews
};