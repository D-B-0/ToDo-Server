const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();
// routers
const todoRouter = require('./routers/todo');

const PORT = process.env.PORT || 4000;

const app = express();
app.use(helmet());
app.use(morgan('tiny'));
app.use(express.json());

app.use('/todo', todoRouter);

app.listen(PORT);
console.log('App listening on port', PORT);
