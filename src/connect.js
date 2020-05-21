const mongoose = require('mongoose');
require('dotenv').config();
const { DATABASE_USER: user, DATABASE_PASSWORD: password } = process.env;
const connectionUrl = process.env.DATABASE_URL.replace('<DATABASE_USER>', user).replace('<DATABASE_PASSWORD>', password);

mongoose.connect(connectionUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to database')
}).catch(err => {
  console.error(err.stack);
});
