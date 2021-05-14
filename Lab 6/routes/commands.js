const express = require('express');
const router = express.Router();
const bookData = require('../data/books');
const reviewData = require('../data/reviews');

router.get('/', function(req, res) {
	res.send("populate creates books, cleanup wipes the database")
});
router.get('/populate', async function(req, res) {
	try {
		let book1 = await bookData.createBooks("book1",
									{authorFirstName: "Stephen", authorLastName: "King"},
									["Novel", "Horror fiction", "Gothic fiction", "Psychological horror", "Occult Fiction"],
									"01/28/1977",
									"yo just a basic ass summary. yeet");
		let book2 = await bookData.createBooks("book2",
									{authorFirstName: "Bob", authorLastName: "Jones"},
									["Scary Shit", "Like for real though", "Oooof"],
									"01/28/1977",
									"yo just a basic ass summary. yeet");
		let book3 = await bookData.createBooks("book3",
									{authorFirstName: "Mary", authorLastName: "Jane"},
									["Nahhhhhh"],
									"01/28/1977",
									"yo just a basic ass summary. yeet");
		let book4 = await bookData.createBooks("book4",
									{authorFirstName: "John", authorLastName: "Doe"},
									["Ohhhhh", "Yeahhhhhhh"],
									"01/28/1977",
									"yo just a basic ass summary. yeet");							
		let book5 = await bookData.createBooks("book5",
									{authorFirstName: "Fake", authorLastName: "Name"},
									["isBoook???"],
									"01/28/1977",
									"yo just a basic ass summary. yeet");
		let review1_1 = await reviewData.createReviews(book1._id, "title1_1", "reviewer1_1", 1, "1/09/2000", "review1_1");
		let review1_2 = await reviewData.createReviews(book1._id, "title1_2", "reviewer1_2", 1, "1/09/2000", "review1_2");
		let review1_3 = await reviewData.createReviews(book1._id, "title1_3", "reviewer1_3", 1, "1/09/2000", "review1_3");
		let review2_1 = await reviewData.createReviews(book2._id, "title2_1", "reviewer2_1", 2, "1/09/2000", "review2_1");
		let review2_2 = await reviewData.createReviews(book2._id, "title2_2", "reviewer2_2", 2, "1/09/2000", "review2_2");
		let review3_1 = await reviewData.createReviews(book3._id, "title3_1", "reviewer3_1", 3, "1/09/2000", "review3_1");
		let review4_1 = await reviewData.createReviews(book4._id, "title4_1", "reviewer4_1", 4, "1/09/2000", "review4_1");
		let review4_2 = await reviewData.createReviews(book4._id, "title4_2", "reviewer4_2", 4, "1/09/2000", "review4_2");
		let review5_1 = await reviewData.createReviews(book5._id, "title5_1", "reviewer5_1", 5, "1/09/2000", "review5_1");
		res.send("Population Finished");
	}catch(e){
		res.status(404).json(e);
	}
});
router.get('/cleanup', async function(req, res) {
	try {
		bookData.removeAll();
		res.send('Cleanup Finished');
	}catch(e){
		res.status(500).send();
	}
});

module.exports = router;