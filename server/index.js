const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');

const app = express();

// use express.json to get data into JSON format
app.use(express.json());

// Port
const PORT = process.env.PORT || 5000;

// using cors
app.use(cors());

// importing routes
const TodoItemRoute = require('./routes/listItems');

// CONNECT TO MONGODB
mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Database connected"))
  .catch(err => console.error(err));

app.use('/', TodoItemRoute);

// add port and connect to server
app.listen(PORT, () => console.log(`Server connected on port ${PORT}`));
