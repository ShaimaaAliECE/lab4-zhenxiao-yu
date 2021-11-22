//load questions when page renders
loadQuestions();

//load quiz questions from backend
function loadQuestions() {
  let xReq = new XMLHttpRequest();
  xReq.onreadystatechange = displayQuestions;
  xReq.open("GET", "/questions", true);
  xReq.send();
}

//populate quiz questions
function displayQuestions() {
  if (this.readyState == 4 && this.status == 200) {
    let question_block = document.getElementById("question_block");
    //parse question.JSON as question banks
    let questionList = JSON.parse(this.responseText);
    //define empty page content
    let content = "";
    content += "<div id='grade'></div>";
    content += "<form action=javascript:loadGrade()>";
    //iterate through each question in question bank
    for (question of questionList) {
      //fill in each label with question text
      content += "<label class='question_text'>" + question.stem + "</label>";
      //fill in each option
      for (n of question.options) {
        //create correct number of radio buttons based on the size of options
        //option button
        content +=
          '<ul><input type="radio" id="answer ' +
          n +
          '" name="' +
          question.stem +
          '" onclick=loadAnswer()>';
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

//load quiz answers from backend
function loadAnswer() {
  let xReq = new XMLHttpRequest();
  xReq.onreadystatechange = displayAnswer;
  xReq.open("GET", "/questions", true);
  xReq.send();
}

function displayAnswer() {
  if (this.readyState == 4 && this.status == 200) {
    let questionList = JSON.parse(this.responseText);

    for (question of questionList) {
      let feedback = "";
      let answerDiv = document.getElementById("answerDiv " + question.stem);
      let radioButtons = document.getElementsByName("" + question.stem);

      for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked == true) {
          if (i == question.answerIndex) feedback = "Correct!";
          else feedback = "Incorrect!";
        }
      }
      answerDiv.innerHTML = feedback;
    }
  }
}

//load the grade
function loadGrade() {
  let submitBtn = document.getElementById("submit");
  submitBtn.remove();

  let xReq = new XMLHttpRequest();
  xReq.onreadystatechange = displayGrade;

  xReq.open("GET", "/questions", true);
  xReq.send();
}

function displayGrade() {
  if (this.readyState == 4 && this.status == 200) {
    let questionList = JSON.parse(this.responseText);
    let grade = document.getElementById("grade");
    let correctAnswers = 0;
    let totalQuestions = 0;

    for (question of questionList) {
      let radioButtons = document.getElementsByName("" + question.stem);

      for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked == true) {
          if (i == question.answerIndex) correctAnswers++;
        }
      }
      totalQuestions++;
    }
    grade.innerHTML =
    "You answered " + correctAnswers + "/" + totalQuestions + " questions correctly. (" + 100*(correctAnswers / totalQuestions) + "%)";
  }
}
