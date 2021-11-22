//get express package
const express = require('express');
//create express app instance
const app = express();

const cors = require('cors'); //package for cross origin resource sharing
const bodyParser = require('body-parser'); //package for body-parser
const {questions} = require('./src/model/questions');//get 'questions' file


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

//GET all questions
app.get('/api/', (req, res) => {
    res.json(questions);
})

//GET 1 question
app.get('/api/:stem', (req,res) => {
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