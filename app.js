const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const connection = require('./database/connection');
const router = require('./router/routes');
const { credentials } = require('./credentials/credential');
const { corsOptions } = require('./credentials/corsOptions');
require('dotenv').config();

const app = express(); 
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://resorse-hub-client.onrender.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

connection();
app.use(credentials)
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyparser.urlencoded({extended:false}),express.json());
app.use(router);

app.listen(5000,()=>{
    console.log('Serever Started');
})
