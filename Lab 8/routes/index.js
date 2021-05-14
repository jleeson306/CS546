const showsRoutes = require('./shows');
const searchRoutes = require('./search');
const path = require('path');

const constructorMethod = (app) => {
  app.use('/shows', showsRoutes);
  app.use('/search', searchRoutes);
  app.get('/', function(req, res) {
	//res.sendFile(path.resolve('static/mainH.html'));
	res.render('search/index', { title: 'trial' });
  });
  app.use('/*', (req, res) => {
    res.status(404).json({ error: "Webpage Not Found" });
  });
};

module.exports = constructorMethod;