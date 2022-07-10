const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const connectDB = require('./db/connect');
dotenv.config({ path: './config.env' });

const port = 3000 || process.env.PORT;

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

const start = async () => {
  try {
    await connectDB(DB);
  } catch (error) {
    console.log(error);
  }
};

start();

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
