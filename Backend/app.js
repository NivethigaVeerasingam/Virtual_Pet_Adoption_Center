const express = require('express');               // import express
const petRoutes = require('./routes/petRoutes');  // import routes 
const cors = require('cors');                     // import CORS 

const app = express();

app.use(express.json());                          // JSON middleware
app.use(cors());                                  // CORS middleware
app.use('/pets', petRoutes);                      // Routes middleware

module.exports = app;                           
