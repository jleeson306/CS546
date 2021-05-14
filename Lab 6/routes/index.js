const booksRoutes = require('./books');
const reviewsRoutes = require('./reviews');
const commandRoutes = require('./commands');

const constructorMethod = (app) => {
  app.use('/books', booksRoutes);
  app.use('/reviews', reviewsRoutes);
  app.use('/commands', commandRoutes);

  app.use('*', (req, res) => {
    res.status(404).json({ error: "Webpage Not Found" });
  });
};

module.exports = constructorMethod;