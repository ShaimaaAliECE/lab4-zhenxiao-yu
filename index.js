//get express package
const express = require('express');
//create express app instance
const app = express();

const cors = require('cors'); //package for cross origin resource sharing
const bodyParser = require('body-parser'); //package for body-parser

const port = 80; //port number
const server = `http://localhost:${port}`;
app.listen(port, ()=> console.log(`Server started. Running at: ${server}`));

//cross origin resource sharing
app.use(cors())
//encode document
app.use(bodyParser.urlencoded({extended: false}));
//parsing JSON as questions are stored in JSON file
app.use(bodyParser.json());


//APIS

//Test server
app.get('/', (req, res) => {
    res.json({"msg":"success"});
})