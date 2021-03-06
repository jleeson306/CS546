const express = require('express');
const app = express();
const static = express.static(__dirname + '/public');
const userData = require("./data/usersCollection");
const teamData = require("./data/teamsCollection");
const commData = require("./data/commentsCollection");
const dstaData = require("./data/dailyStats");
const dactData = require("./data/dailyActivities");

const configRoutes = require('./routes');
const exphbs = require('express-handlebars');

app.use(static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});