const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');

const app = express();

// use express.json to get data into JSON format
app.use(express.json());

// Port
const PORT = 5500;

// using cors
app.use(cors({
  origin: "https://task-manager-with-vercel-end-points-frontend.vercel.app",
  methods: ["POST", "PUT", "GET", "DELETE"],
  credentials:true
}));




// Handle pre-flight requests
// app.options('*', cors({
//   origin: ['https://task-manager-with-vercel-end-points-frontend.vercel.app'],
//   methods: ["POST", "PUT", "GET", "DELETE"],
//   credentials: true
// }));


// importing routes
const TodoItemRoute = require('./routes/listItems');

// CONNECT TO MONGODB
mongoose.connect("mongodb+srv://adunmoyepeter111:%40Mongodbtodo@cluster0.xnnahng.mongodb.net/to-do-list?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Database connected"))
  .catch(err => console.error(err));

app.use('/', TodoItemRoute);

// app.get('/', (req, res) => {
//   res.json("hello")
// })

// add port and connect to server
app.listen(PORT, () => console.log(`Server connected on port ${PORT}`));
