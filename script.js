//create references to HTML elements
const body = document.body;

//triviaText = store the question
//answerText = stores the correct_answer
//categoryText = stores the category
//difficultyText = stores the difficulty
//typeText = store the type of question
const triviaText = document.createElement('h3');
const answerText = document.createElement('h3');
const categoryText = document.createElement('p');
const difficultyText = document.createElement('p');
const typeText = document.createElement('p');
const answerBtn = document.createElement('button');
const nextQuestionBtn = document.createElement('button');


const difficultyBtns = document.createElement('div')//to append all of the radio elements
difficultyBtns.id = 'btn-div'

const difficultyArr = ['All','1','2','3']
difficultyArr.forEach(level =>{
  const difficultyBtn = document.createElement('input')
  const label = document.createElement('label')
  label.for = `${level}Radio`
  label.innerHTML = level
  difficultyBtn.type = 'radio'
  difficultyBtn.name = 'difficultyRadio'
  difficultyBtn.id = `${level}Radio`
  difficultyBtn.value = level

  if(level === 'All'){
    difficultyBtn.checked = true
  }
  difficultyBtns.appendChild(label)
  difficultyBtns.appendChild(difficultyBtn)
})

//add event listener to the answer button and next question button
answerBtn.addEventListener('click', revealAnswer)
nextQuestionBtn.addEventListener('click', loadNextQuestion)

//set default text values
triviaText.innerHTML = "Question loading..."
answerText.innerHTML = "???"
categoryText.innerHTML = "Category: "
//difficultyText.innerHTML = "Difficulty: "
//typeText.innerHTML = "Question Type: "
answerBtn.innerHTML = "Reveal Answer"
answerBtn.id = "answer-btn"
nextQuestionBtn.innerHTML = "Next Question"
nextQuestionBtn.id = "next-question-btn"

//align text
triviaText.style.textAlign = 'center'

//set answerText initial opacity to 0
answerText.style.opacity = 0
nextQuestionBtn.style.display = 'none'

//append all elements to the body
body.appendChild(triviaText);
body.appendChild(answerText);
body.appendChild(categoryText);
//body.appendChild(difficultyText);
//body.appendChild(typeText);
body.appendChild(difficultyBtns)
body.appendChild(answerBtn);
body.appendChild(nextQuestionBtn);

function updateDifficulty(){
// fetch data from trivia api, get request
// all 4 urls for all, easy, med, hard
// get value of selected radio button
const diffRadio = document.getElementsByName('difficultyRadio')
//console.log(diffOpt[0].checked)
const selectedDiff = diffRadio[1].checked ? '1'
                  :  diffRadio[2].checked ? '2'
                  :  diffRadio[3].checked ? '3'
                  : 'All'

  const urls = {
      "All" :'https://opentdb.com/api.php?amount=1&type=boolean',
      "1": 'https://opentdb.com/api.php?amount=1&difficulty=easy&type=boolean',
      "2": 'https://opentdb.com/api.php?amount=1&difficulty=medium&type=boolean',
      "3": 'https://opentdb.com/api.php?amount=1&difficulty=hard&type=boolean'
  }

  let url = urls[selectedDiff]//'https://opentdb.com/api.php?amount=1&difficulty=easy&type=boolean'
  return url
}


let url = updateDifficulty()
fetch(url)
  .then((data) => {
    return data.json()
  })
  .then((data) => {
    parseData(data)
    //console.log(data)
    //feed the data into a function to parse
  });

  function parseData(data){
    triviaText.innerHTML = data.results[0].question
    categoryText.innerHTML = `Category: ${data.results[0].category}`
    answerText.innerHTML = `Answer: ${data.results[0].correct_answer}`
    //typeText.innerHTML = `Question Type: ${data.results[0].type}`
    //difficultyText.innerHTML = `Difficulty: ${data.results[0].difficulty}`
    //console.log(data.results[0].category)
  }


  //function to reveal answer
  function revealAnswer(){
    answerText.style.opacity = 1
    answerBtn.style.display = 'none'
    nextQuestionBtn.style.display = 'block'
  }

  //function to get next question
  function loadNextQuestion(){
    
    answerBtn.style.display = 'block'
    nextQuestionBtn.style.display = 'none'

    let url = updateDifficulty()
    //call the api again
    fetch(url)
    .then((data) => {
      return data.json()
    })
    .then((data) => {
      parseData(data)
      answerText.style.opacity = 0
      //console.log(data)
      //feed the data into a function to parse
    });
  }
