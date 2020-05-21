const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();
// routers
const todoRouter = require('./routers/todoRouter');

const app = express();
app.use(helmet());
app.use(morgan('tiny'));
app.use(express.json());

app.use('/todo', todoRouter);

app.get('/error', (req, r) => {
  const err = new Error('Congrats, you are getting an error!');
  err.status = 418;
  throw err;
});

app.use((req, res, next) => {
  const err = new Error(`Route for ${req.method} ${req.originalUrl} not found`);
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500);
  res.json({
    error: err.message,
    status: err.status || 500
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT);
console.log('App listening on port', PORT);
