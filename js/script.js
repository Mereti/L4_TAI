
        let preQuestions;
    const promiseOfQuestionsData = fetch("https://quiztai.herokuapp.com/api/quiz").then(r => r.json()).then(questionsData => {
        return questionsData;
    });

    window.onload = async () => {
        preQuestions = await promiseOfQuestionsData;
        setQuestion(index);
    };


let next = document.querySelector('.next');
let previous = document.querySelector('.previous');

var number = document.querySelector('#number');
let question = document.querySelector('.question');
let answers = document.querySelectorAll('.list-group-item');

let pointsElem = document.querySelector('.score');
let restart = document.querySelector('.restart');
let index = 0;
let points = 0;


for (let i = 0; i < answers.length; i++) {
    answers[i].addEventListener('click', doAction);
}

function doAction(event) {
    //event.target - Zwraca referencję do elementu, do którego zdarzenie zostało pierwotnie wysłane.
    if (event.target.innerHTML === preQuestions[index].correct_answer) {
        points++;
        pointsElem.innerText = points;
        markCorrect(event.target);
    }
    else {
        markInCorrect(event.target);
    }
    disableAnswers();
}
function setQuestion(index) {
   //clearClass();
   console.log("moj indeks: " + index);
   question.innerHTML = preQuestions[index].question;
   number.innerHTML = index+1;


      if (preQuestions[index].answers.length === 2) {
          answers[2].style.display = 'none';
          answers[3].style.display = 'none';
      } else {
          answers[2].style.display = 'block';
          answers[3].style.display = 'block';
      }


   answers[0].innerHTML = preQuestions[index].answers[0];
   answers[1].innerHTML = preQuestions[index].answers[1];
   answers[2].innerHTML = preQuestions[index].answers[2];
   answers[3].innerHTML = preQuestions[index].answers[3];
}

next.addEventListener('click', function () {
   index++;
   if (index >= preQuestions.length) {
       list.style.display = 'none';
       results.style.display = 'block';
       userScorePoint.innerHTML = points;
   } else {
       setQuestion(index);
       activateAnswers();
   }
});




previous.addEventListener('click', function () {
        if(index > 0)
           index--;
           setQuestion(index);
           activateAnswers();
        });


restart.addEventListener('click', function (event) {
    event.preventDefault();

    index = 0;
    points = 0;
    let userScorePoint = document.querySelector('.score');
    userScorePoint.innerHTML = points;
    setQuestion(index);
    activateAnswers();
    list.style.display = 'block';
    results.style.display = 'none';
});

function doAction(event) {
   //event.target - Zwraca referencję do elementu, do którego zdarzenie zostało pierwotnie wysłane.
   if (event.target.innerHTML === preQuestions[index].correct_answer) {
       points++;
       pointsElem.innerText = points;
       markCorrect(event.target);
   }
   else {
       markInCorrect(event.target);
   }
   disableAnswers();
}

function activateAnswers() {
   for (let i = 0; i < answers.length; i++) {
      answers[i].addEventListener('click', doAction);
   }
}
activateAnswers();
function disableAnswers(){
       for (let i = 0; i < answers.length; i++) {
          answers[i].removeEventListener('click', doAction);
       }
}
disableAnswers();

function markCorrect(elem) {
   elem.classList.add('correct');
}
function markInCorrect(elem){
    elem.classList.remove('correct');
}

//--------------------------------operacje na danych
function deleteGame(){
    localStorage.removeItem("key");
}

function loadGame(){
    tab = JSON.parse(localStorage.getItem("key"));
    if(tab==null){
        tab = {
            results:[],
            avg:0
        }
    }
}

function saveGame(){
    loadGame();
    tab.results.push(points)
    let temporatyAvg = 0;
    for(let i = 0; i<tab.results.length; i++){
        temporatyAvg += tab.results[i];
    }
    temporatyAvg = temporatyAvg/tab.results.length

    let tempTab = {
        results:tab.results,
        avg:temporatyAvg
    };
    tab = tempTab;
    localStorage.setItem("key", JSON.stringify(tab));
}





