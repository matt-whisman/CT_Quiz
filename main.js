let questionKey = {
  q1: "q-1",
  q2: "q-2",
  q3: "q-3",
  q4: "q-4",
  q5: "q-5",
  q6: "q-6",
  q7: "q-7",
  q8: "q-8",
  q9: "q-9",
  q10: "q-10",
};

// get main div, create form div, and assign an id
let mainDivEL = document.getElementById("main");
let formEL = document.createElement("form");
formEL.setAttribute("id", "quizForm");
mainDivEL.appendChild(formEL);
let questions = Object.values(questionKey);
let questionKeys = Object.keys(questionKey);
showQuiz(questions);

// event handler
let form = document.getElementById("quizForm");
formEL.addEventListener("submit", (event) => {
  event.preventDefault();
  let formData = new FormData(form);
  let formAnswers = Object.fromEntries(formData);
  // view the formAnswers object for debugging
  for (var key in formAnswers) {
    // console.log(formAnswers[key]);
  }
  let gradedKey = grade(formAnswers);
  displayResults(gradedKey);
});

function showQuiz(questions) {
  let cardHTML = "";
  let qNum = 0;
  let bgClass = "light";

  for (var question of questions) {
    qNum += 1;

    cardHTML += `
    <div class="card my-3 bg-${bgClass}" id="c${qNum}">
        <div class="card-body">
            <h4 class="card-title">Question ${qNum}</h4>
            <label for="q${qNum}" class="form-label">${question}</label>
            <input type="text" class="form-control" name="q${qNum}" id="q${qNum}">
        </div>
    </div>
    `;
  }
  cardHTML += `<button type="submit" class="btn btn-primary">Submit</button>`;
  formEL.innerHTML = cardHTML;

  // for testing
  document.getElementById("q1").defaultValue = "a1";
  document.getElementById("q2").defaultValue = "a2";
  document.getElementById("q3").defaultValue = "a3";
  document.getElementById("q4").defaultValue = "a4";
  document.getElementById("q5").defaultValue = "a5";
  document.getElementById("q6").defaultValue = "a6";
  document.getElementById("q7").defaultValue = "a7";
  document.getElementById("q8").defaultValue = "a8";
  document.getElementById("q9").defaultValue = "a9";
  document.getElementById("q10").defaultValue = "a10";
}

function grade(formAnswers) {
  let gradedKey = {
    q1: ["a1", false],
    q2: ["a2", false],
    q3: ["a3", false],
    q4: ["a4", false],
    q5: ["a5", false],
    q6: ["a6", false],
    q7: ["a7", false],
    q8: ["a8", false],
    q9: ["a9", false],
    q10: ["a10", false],
    score: -1,
  };

  for (const key in gradedKey) {
    console.log(key);
    if (Object.hasOwnProperty.call(gradedKey, key)) {
      const element = gradedKey[key];
      console.log(element[0] + ": " + element[1]);
      if (element[0] == formAnswers[key]) {
        element[1] = true;
        console.log(element[0] + ": " + element[1]);
        gradedKey.score += 1;
        console.log(gradedKey.score);
      }
    }
  }
  return gradedKey;
}

function displayResults(gradedKey) {
  cardHTML = "";
  let i = 0;

  for (const key in gradedKey) {
    console.log(key);
    if (key != "score") {
      // get the question number
      let qNum = i + 1;

      // get the question from questions
      let question = questions[i];
      let bgClass = "light";
      // get the bg class to display red or green
      if (gradedKey[key][1] === true) {
        bgClass = "success";
      } else {
        bgClass = "danger";
      }

      cardHTML += `
          <div class="card my-3 bg-${bgClass}" id="c${qNum}">
              <div class="card-body">
                  <h4 class="card-title">Question ${qNum}</h4>
                  <label for="q${qNum}" class="form-label">${question}</label>
                  <input type="text" class="form-control" name="q${qNum}" id="q${qNum}">
              </div>
          </div>
      `;

      i += 1;
    }
  }

  formEL.innerHTML = cardHTML;
  let scoreEL = document.createElement("div");
  scoreEL.classList.add("card", "my-3");
  scoreEL.setAttribute("id", "score");
  mainDivEL.appendChild(scoreEL);

  scoreHTML = `
      <div class="card-body">
          <h4 class="card-title">Score: ${gradedKey.score}/10</h4>
      </div>
    `;
  scoreEL.innerHTML = scoreHTML;
}
