//load questions when page renders
populateQuestions();

//load quiz questions from backend
function populateQuestions() {
  //new AJAX request
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "/questions", true); //using GET, is asynchronous 
  xhr.send(); //send request
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let question_block = document.getElementById("question_block");
      //parse question.JSON as question banks
      let qBank = JSON.parse(xhr.responseText);
      //define empty page page
      let page = "";
      page += "<div id='grade'></div>";
      page += "<form action=javascript:displayGrade()>";
      //iterate through each question in question bank
      for (question of qBank) {
        //fill in each label with question text
        page += "<label class='question_text'>" + question.stem + "</label>";
        //question response
        page += "   " + "<span id='ans_section " + question.stem + "'></span>";
        //fill in each option
        for (option of question.options) {
          //create correct number of radio buttons based on the size of options
          //option button
          page +=
            '<ul><input type="radio" id="answer ' +
            option +
            '" name="' +
            question.stem +
            '" onclick=provideFeedback()>';
          //option label
          page += '<label for="answer ' + option + '">' + option + "</label></ul>";
        }
        //division line to format questions
        page += "<hr>";
      }
      //submit button
      page += '</br><input type="submit" value="Submit" id="submit">';
      //wrap questions in form
      page += "</form>";
      //populate html page
      question_block.innerHTML = page;
    }
  };
  //error handler
  xhr.error = () => { console.log("Error, could not retrieve question") };
}

//provide instant feedback to user when a radio button is selected
function provideFeedback() {
  //new AJAX request
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "/questions", true); //using GET, is asynchronous 
  xhr.send(); //send request
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      //parse question.JSON as question banks
      let qBank = JSON.parse(xhr.responseText);
      // define empty feedback content
      for (question of qBank) {
        let feedback = "";
        let ans_section = document.getElementById("ans_section " + question.stem);
        let radioButtons = document.getElementsByName("" + question.stem);
        //iterate through radio buttons
        for (let i = 0; i < radioButtons.length; i++) {
          if (radioButtons[i].checked) { //check radio buttons that are selected
            if (i == question.answerIndex) { //see if answer matches the answer index
              feedback = `<span class="right">Correct<span>`;
            }
            else {
              feedback = `<span class="wrong">Incorrect<span>`;
            };
          }
        }
        //update feedback every time a radio button is selected
        ans_section.innerHTML = feedback;
      }
    }
  };
  //error handler
  xhr.error = () => { console.log("Error, could not retrieve answer") };
}

//load the grade
function displayGrade() {
  //new AJAX request
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "/questions", true); //using GET, is asynchronous 
  xhr.send(); //send request

  //disable submit button after pressed
  const submit = document.getElementById("submit");
  submit.remove();

  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      //parse question.JSON as question banks
      let qBank = JSON.parse(xhr.responseText);
      //get reference to the grade section
      let grade = document.getElementById("grade");
      let correct_count = 0;
      let total = 0;
      //iterate through the questions
      for (question of qBank) {
        let radioButtons = document.getElementsByName("" + question.stem);
  
        for (let i = 0; i < radioButtons.length; i++) {
          if (radioButtons[i].checked == true) {
            if (i == question.answerIndex) { //see if answer matches the answer index
              //increase the number of correct answers
              correct_count++;
            }
          }
        }
        //count the total number of questions
        total++;
      }
      //display the final grade to the user 
      grade.innerHTML =
      "You answered " + correct_count + "/" + total + " questions correctly. (" + 100*(correct_count / total) + "%)";
    }
  };
  //error handler
  xhr.error = () => { console.log("Error, could not retrieve grade") };
}
