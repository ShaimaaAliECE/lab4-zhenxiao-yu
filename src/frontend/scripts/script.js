//load questions when page renders
loadQuestions();

//load quiz questions from backend
function loadQuestions() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "/questions", true);
  xhr.send();
  // xhr.onreadystatechange = renderQuestions;
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let question_block = document.getElementById("question_block");
      //parse question.JSON as question banks
      let qBank = JSON.parse(xhr.responseText);
      //define empty page content
      let content = "";
      content += "<div id='grade'></div>";
      content += "<form action=javascript:loadGrade()>";
      //iterate through each question in question bank
      for (question of qBank) {
        //fill in each label with question text
        content += "<label class='question_text'>" + question.stem + "</label>";
        //fill in each option
        for (option of question.options) {
          //create correct number of radio buttons based on the size of options
          //option button
          content +=
            '<ul><input type="radio" id="answer ' +
            option +
            '" name="' +
            question.stem +
            '" onclick=loadAnswer()>';
          //option label
          content += '<label for="answer ' + option + '">' + option + "</label></ul>";
        }
        //question response
        content += "<div id='answerDiv " + question.stem + "'></div>";
        //division line to format questions
        content += "<hr>";
      }
  
      content += '</br><input type="submit" value="Submit" id="submit">';
      content += "</form>";
  
      question_block.innerHTML = content;
    }
  };
  xhr.error = () => { console.log("Error, could not retrieve question") };
}

//load quiz answers from backend
function loadAnswer() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "/questions", true);
  xhr.send();
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let qBank = JSON.parse(xhr.responseText);
  
      for (question of qBank) {
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
  };
  xhr.error = () => { console.log("Error, could not retrieve answer") };
}

//load the grade
function loadGrade() {
  let submitBtn = document.getElementById("submit");
  submitBtn.remove();
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "/questions", true);
  xhr.send();
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let qBank = JSON.parse(xhr.responseText);
      let grade = document.getElementById("grade");
      let correctAnswers = 0;
      let totalQuestions = 0;
  
      for (question of qBank) {
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
  };
  xhr.error = () => { console.log("Error, could not retrieve grade") };
}
