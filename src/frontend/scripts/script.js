//load questions when page renders
populateQuestions();

//fill in the questions by getting data from the JSON file
function populateQuestions() {
  //new AJAX request
  let xhr = new XMLHttpRequest();
  //using GET, is asynchronous
  xhr.open("GET", "/questions", true);
  //send request
  xhr.send();
  //fill in questions on state change
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let question_block = document.getElementById("question_block");
      //parse question.JSON as question banks
      let qBank = JSON.parse(xhr.responseText);
      //define empty page to fill content
      let page = "";
      //define question ID
      let q_id = 0;
      //display grade here
      page += "<div id='grade'></div>";
      //wrap questions in form
      page += `<form action=javascript:submitTest()>`;
      for (question of qBank) {
        //define question value
        let q_val = 0;
        //fill in each label with question text
        page += `<label class='question_text' id = ${q_id} value = "incorrect">${question.stem}</label>`;
        //question response
        page += "   " + "<span id='ans_section " + question.stem + "'></span>";

        //fill in each option
        for (option of question.options) {
          //list options with ul and radio buttons
          page += `<ul><input type="radio" onclick='javascript:provideFeedback(${q_val}, ${q_id})' id = ${q_id}${q_val} name=${q_id} value= ${q_val}>`;
          page += `<label for="${option}">${option}</label></ul>`;
          q_val++;
        }
        //division line to format questions
        page += "<hr>";
        q_id++;
      }
      page += `<br><input type="submit" value="submit" id="submit" >`;
      page += "</form>";
      //populate html page without reloading
      question_block.innerHTML = page;
    }
  };
  //error handler
  xhr.error = () => {
    console.log("Error, could not retrieve question");
  };
}

//provide instant feedback to user when a radio button is selected
function provideFeedback(value, id) {
  //new AJAX request
  let xhr = new XMLHttpRequest();
  //using GET, is asynchronous
  xhr.open("GET", "/feedback?value=" + value + "&id=" + id, true);
  //send request
  xhr.send();
  //check correctness of question on state change
  xhr.onreadystatechange = () => {
    //define empty alert window
    let alert_page = "";
    let id = "";
    if (xhr.readyState == 4 && xhr.status == 200) {
      if (xhr.responseText.substring(0, 7) == "Correct") {
        alert_page = "You answered correctly";
        id = xhr.responseText.substring(8, xhr.responseText.length - 1);
        document.getElementById(id).setAttribute("value", "Correct");
      } else {
        alert_page = "You answered incorrectly";
        id = xhr.responseText.substring(10, xhr.responseText.length - 1);
        document.getElementById(id).setAttribute("value", "Incorrect");
      }
      alert(alert_page);
    }
  };
  //error handler
  xhr.error = () => {
    console.log("Error, could not retrieve feedback");
  };
}

//submit the test to check correctness and display grade
function submitTest() {
  //new AJAX request
  let xhr = new XMLHttpRequest();
  //using GET, is asynchronous
  xhr.open("GET", "/questions", true);
  //send request
  xhr.send();
  //display user grade on state change
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      //parse question.JSON as question banks
      let qBank = JSON.parse(xhr.responseText);
      //get reference to the grade section
      let grade = document.getElementById("grade");
      let total = 0; //keep track of total number of questions
      let correct_count = 0; //keep track of number of questions already answered correctly
      //iterate through each question and check for correctness
      for (question of qBank) {
        if (document.getElementById(total).getAttribute("value") == "Correct") {
          correct_count++;
        }
        //count the total number of questions
        total++;
      }
      //display the final grade to the user
      grade.innerHTML =
        "You answered " +
        correct_count +
        "/" +
        total +
        " questions correctly. (" +
        100 * (correct_count / total) +
        "%)";
    }
  };
  //error handler
  xhr.error = () => {
    console.log("Error, could not retrieve grade");
  };
}
