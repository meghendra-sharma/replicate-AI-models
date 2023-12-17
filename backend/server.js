import express from 'express';
import bodyParser from 'body-parser';
import {runModel} from './controllers/runModel.mjs';
import dotenv from 'dotenv'
import cors from 'cors'

// Creating an instance of Express
const app = express();

//creating .env instance
dotenv.config();

// Enable CORS for all routes
app.use(cors());


// Middleware for parsing JSON requests
app.use(bodyParser.json());

//Home route
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

//REQUEST - POST
//DEF - convert text to image
//RESPONSE - url as a string
app.post('/replicate/text-to-image' , runModel)

// Port configuration
const PORT = process.env.PORT || 3000;

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
