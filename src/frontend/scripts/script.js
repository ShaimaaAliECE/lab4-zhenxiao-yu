
loadQuestions();

//load quiz questions from backend
function loadQuestions() {
  let xReq = new XMLHttpRequest();
  xReq.onreadystatechange = displayQuestions;
  xReq.open("GET", "/questions", true);
  xReq.send();
}

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
    let questionDiv = document.getElementById("questionDiv");
    let questionList = JSON.parse(this.responseText);
    let content = "";

    content += "<form action=javascript:loadAnswers()>";

    for (q of questionList) {
      content += "<p>" + q.stem + "</p>";

      for (n of q.options) {
        content +=
          '<input type="radio" id="answer ' + n + '" name="' + q.stem + '">';
        content += '<label for="answer ' + n + '">' + n + "</label></br>";
      }

      content += "</br><div id='answerDiv " + q.stem + "'></div>";
    }

    content += '</br><input type="submit" value="Submit" id="submit">';
    content += "</form></br>";

    content += "<div id='gradeDiv'></div></br>";

    questionDiv.innerHTML = content;
  }
}


//populate quiz options
function displayAnswers() {
  if (this.readyState == 4 && this.status == 200) {
    let questionList = JSON.parse(this.responseText);
    let gradeDiv = document.getElementById("gradeDiv");
    let correctAnswers = 0;
    let totalQuestions = 0;

    for (q of questionList) {
      let feedback = "";
      let answerDiv = document.getElementById("answerDiv " + q.stem);

      let radioButtons = document.getElementsByName("" + q.stem);

      for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked == true) {
          if (i == q.answerIndex) {
            feedback = "Correct!";
            correctAnswers++;
          } else {
            feedback = "Incorrect! ";
          }
        }
      }

      answerDiv.innerHTML = feedback;
      totalQuestions++;
    }

    gradeDiv.innerHTML =
      "Your grade is: " + (correctAnswers / totalQuestions) * 100 + "%!";
  }
}
