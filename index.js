//get express package
const express = require('express');
//create express app instance
const app = express();

const cors = require('cors'); //package for cross origin resource sharing
const bodyParser = require('body-parser'); //package for body-parser
let questions = require('./src/model/questions.json'); //get 'questions' json file

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
app.use(express.static('./src/frontend'));

//GET all questions
app.get('/questions', (req, res) => {
    res.json(questions);
})

//GET 1 question by stem
app.get('/questions/:stem', (req,res) => {
    let stem = req.params.stem;
    let record = "no record";
    //if a matching record is found in the question bank, return the index position
    //else return -1
    let index = questions.findIndex( (questions)=>questions.stem == stem )
    if (index != -1) {
        record = questions[index]
    }
    res.json(record);
})