const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        correct: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correct: 1
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
        correct: 1
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["Elephant", "Giraffe", "Blue Whale", "Dolphin"],
        correct: 2
    },
    {
        question: "In which year did the Titanic sink?",
        options: ["1905", "1912", "1920", "1931"],
        correct: 1
    }
    
]

let currentquestionIndex = 0
let score = 0
let countdown;
let time = 300

const timeContainer = document.getElementById('time')
const scoreContainer = document.getElementById('score');
const questionContainer = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');
const nextButton = document.getElementById('next');
const restartButton = document.getElementById('restart');

function startTime() {
    countdown = setInterval(() =>{
        let min = Math.floor(time / 60)
        let sec = time % 60

        timeContainer.textContent=`${min}:${sec < 10 ? '0' : ''}${sec}`

        if (time < 0) {
            clearInterval(countdown)
            endQuiz()
            return
        }

        time--
    },1000)
}

function loadQuestion() {
    const currentQuestion = questions[currentquestionIndex]
    questionContainer.textContent = currentQuestion.question

    optionsContainer.innerHTML = ''

    currentQuestion.options.forEach((option, index) => {
      const optionElement = document.createElement('div')
      optionElement.classList.add('list-group-item', 'list-group-item-action', 'mb-2', 'rounded-3', 'border-0')
      optionElement.innerHTML =`
      <input type="radio" name="options" id="option${index}" value="${index}" class="form-check-input me-2">
      <label class="form-check-label" for="option${index}">${option}</label>`;

      optionElement.addEventListener('click', () => checkAnswer(index, optionElement))
      optionsContainer.appendChild(optionElement)
    })

    nextButton.style.display = 'none'
    // scoreContainer.textContent = ''
}

function checkAnswer(index, element) {
    const currentQuestion = questions[currentquestionIndex]
    const optionElement = document.querySelectorAll('.list-group-item')

    optionElement.forEach((option) => {
        option.classList.remove('correct', 'wrong')
        option.classList.add('disabled')
    })

    if (index === currentQuestion.correct) {
        element.classList.add('correct')
        score++
        scoreContainer.textContent = `${score}/${questions.length}`
    }else{
        element.classList.add('wrong')
        optionElement[currentQuestion.correct].classList.add('correct')
        scoreContainer.textContent = `${score}/${questions.length}`
    }

    nextButton.style.display= 'inline-block'
}

function loadNextQuestion() {
    currentquestionIndex++

    if (currentquestionIndex < questions.length) {
        loadQuestion()
    }else{
        endQuiz()
    }
}

function endQuiz(){
    questionContainer.textContent = 'Quiz Completed'
    optionsContainer.innerHTML = ''
    scoreContainer.textContent = `Your Final  Score Are ${score}/${questions.length}`
    nextButton.style.display = 'none'
    restartButton.style.display = 'inline-block'
}

function restartQuiz() {
    currentquestionIndex = 0
    score = 0
    time = 300
    loadQuestion()
    startTime()
    // restartButton.style.display = 'none'
    scoreContainer.textContent = ''
}


window.onload = () => {
    loadQuestion()
    startTime()
}