const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
	res.render("watB/calories", {css: ["calories"]});
});

module.exports = router;