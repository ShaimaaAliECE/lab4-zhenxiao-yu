
loadQuestions();

//load quiz questions from backend
function loadQuestions() {
  let xReq = new XMLHttpRequest();
  xReq.onreadystatechange = displayQuestions;
  xReq.open("GET", "/questions", true);
  xReq.send();
}

//load quiz answers from backend
function loadAnswers() {
    let submitBtn = document.getElementById("submit");
    submitBtn.remove();
    let xReq = new XMLHttpRequest();
    xReq.onreadystatechange = displayAnswers;
  
    xReq.open("GET", "/questions", true);
    xReq.send();
  }

//populate quiz questions
function displayQuestions() {
  if (this.readyState == 4 && this.status == 200) {
    let question_block = document.getElementById("question_block");
    //parse question.JSON as question banks
    let questions = JSON.parse(this.responseText);
    //define empty page content
    let content = "";
    content += "<div id='grade'></div>";
    //define a form to contain question
    content += "<form action=javascript:loadAnswers()>";
    //iterate through each question in question bank
    for (question of questions) {
        //fill in each label with question text
      content += "<label class='question_text'>" + question.stem + "</label>";
        //fill in each option 
      for (n of question.options) { //create correct number of radio buttons based on the size of options
        //option button
        content += '<ul><input type="radio" id="answer ' + n + '" name="' + question.stem + '">';
        //option label
        content += '<label for="answer ' + n + '">' + n + "</label></ul>";
      }
      //question response
      content += "<div id='answerDiv " + question.stem + "'></div>";
      //division line to format questions
      content += "<hr>";
    }
    
    content += '</br><input type="submit" value="Submit" id="submit">';
    content += "</form></br>";

    question_block.innerHTML = content;
  }
}


//populate quiz options
function displayAnswers() {
  if (this.readyState == 4 && this.status == 200) {
    let questions = JSON.parse(this.responseText);
    let gradeDiv = document.getElementById("grade");
    let correctAnswers = 0;
    let totalQuestions = 0;

    for (question of questions) {
      let feedback = "";
      let answerDiv = document.getElementById("answerDiv " + question.stem);

      let radioButtons = document.getElementsByName("" + question.stem);

      for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked == true) {
          if (i == question.answerIndex) {
            feedback = "Correct";
            correctAnswers++;
          } else {
            feedback = "Incorrect";
          }
        }
      }

      answerDiv.innerHTML = feedback;
      totalQuestions++;
    }

    gradeDiv.innerHTML =
      "You answered " + correctAnswers + "/" + totalQuestions + " questions correctly. (" + 100*(correctAnswers / totalQuestions) + "%)";
  }
}
