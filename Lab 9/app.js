const express = require('express');
const app = express();
const router = express.Router();
const exphbs = require('express-handlebars');
const static = express.static(__dirname + '/public');

app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


app.get('/', function(req, res) {
	res.render('layouts/main');
});

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});