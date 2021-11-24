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
//get html static template
app.use(express.static('./src/frontend'));

//define APIs

//GET all questions
app.get('/questions', (req, res) => {
    res.json(questions);
});

//GET 1 question by their stem
// app.get('/questions/:stem', (req,res) => {
//     let stem = req.params.stem;
//     let record = "no record";
//     //if a matching record is found in the question bank, return the index position
//     //else return -1
//     let index = questions.findIndex( (questions)=>questions.stem == stem )
//     if (index != -1) {
//         record = questions[index]
//     }
//     res.json(record);
// })

//GET feedback for question
app.get("/feedback", (req, res) => {
    let msg = "Incorrect" + req.query.id;
    let questionID = 0;
    for (question of questions){
        if(req.query.id == questionID && req.query.value == question.answerIndex) {
            msg = "Correct" + req.query.id;
        }
        questionID++;
    }
    res.send(msg);
});
