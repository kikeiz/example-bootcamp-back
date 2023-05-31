const express = require("express")
const cors = require("cors");
const bodyParser = require('body-parser');
const { validationResult } = require('express-validator');

// const validateToken = require('./src/middlewares/validateToken')
require('dotenv').config();

const app = express();
const PORT = 8080

//middlewares here
app.use(express.json()); // this to get req.body
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//IMPORT ROUTES     
app.use('/', require('./src/routes/index'));
app.use("/login", require('./src/routes/login')); 
app.use("/register", require('./src/routes/user'));
app.use("/client", require('./src/routes/client'));
app.use("/user", require('./src/routes/user'));



app.listen(PORT,
    () => { console.log(`server in port ${PORT}`) })


