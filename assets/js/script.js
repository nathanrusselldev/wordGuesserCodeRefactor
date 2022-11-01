var wins = 0;
var losses = 0;

// Select ALL THE THINGS
var wordBlanks = document.querySelector(".word-blanks")
var startButton = document.querySelector(".start-button")
var resetButton = document.querySelector(".reset-button")
var winsEle = document.querySelector(".win")
var lossesEle = document.querySelector(".lose")
var snowManImg = document.querySelector("#snowManImg")
var incorrectEle = document.querySelector("#incorrectLetters")
// Timer stuff, setting initial values for timer and timercount so that timer can be decremented
var timerElement = document.querySelector(".timer-count")
var timer;
var timerCount;

// Win condition checker initial state
var isWin = false;
// Sets up a bucket for incorrect guesses
var incorrectGuesses = 0

// Initial state for buckets that will reset main content to dashes as well as hold the values of the chosen word
var chosenWord;
var dashes = []
var totalLetters = []
var incorrectLetters = []

// Possible word bucket 
var words = ["variable","array", "modulus", "object", "function", "string", "boolean"];

var startGame = function() {
    wordBlanks.textContent = ""
    dashes = []
    incorrectLetters = []
    incorrectEle.textContent = incorrectLetters.join("")
    chosenWord = ""
    timerCount = 10;
    isWin = false;
    incorrectGuesses = 0
    snowManImg.style.clipPath = "polygon(0% 0%,100% 0%,100% 0%,0% 0%)"
    startTimer()
    renderBlanks()
}

var loseGame = function() {
    console.log('you lost')
    wordBlanks.textContent = 'You Lose! Sorry, please play again.'
    losses++
    lossesEle.textContent = losses
}

var winGame = function() {
    wordBlanks.textContent = 'You Win!'
    wins++
    winsEle.textContent = wins
}

var startTimer = function() {
    timer = setInterval(function() {
        timerCount--;
        timerElement.textContent = timerCount;
        if (timer >= 0) {
            if(isWin === true && timerCount > 0) {
                clearInterval(timer)
                winGame()
            }
        }
        if(timerCount === 0 || incorrectGuesses === 5) {
            clearInterval(timer)
            loseGame()
        }
    }, 1000)
}

var renderBlanks = function() {
    chosenWord = words[Math.floor(Math.random() * words.length)]
    console.log(chosenWord)
    totalLetters = chosenWord.split("")
    console.log(totalLetters)
    for(var i = 0; i < totalLetters.length; i++) {
        dashes.push("_")
    }  
    console.log(dashes)
    wordBlanks.textContent = dashes.join(" ")
}

var renderIncorrect = function() {
    incorrectEle.textContent = incorrectLetters.join(", ").toUpperCase()
}

var checkLetters = function(letter) {
    var letterInWord = false;
    for (var i = 0; i < dashes.length; i++) {
       if (totalLetters[i] === letter) {
        letterInWord = true
        } 
        if (letterInWord) {
            for(var j = 0; j < dashes.length; j++) {
                if(chosenWord[j] === letter) {
                    dashes[j] = letter
                }
            }
        }
    }
    if(!letterInWord) {
        incorrectGuesses++
        if(incorrectLetters.includes(letter)) {
            renderIncorrect()
        } else {
            incorrectLetters.push(letter)
            renderIncorrect()
        }
        console.log(`${incorrectGuesses} Incorrect guesses`)
        if (incorrectGuesses === 5) {
            snowManImg.style.clipPath = "polygon(0% 0%,100% 0%,100% 100%,0% 100%)"
        } else if (incorrectGuesses === 4) {
            snowManImg.style.clipPath = "polygon(0% 0%,100% 0%,100% 80%,0% 80%)"
        } else if (incorrectGuesses === 3) {
            snowManImg.style.clipPath = "polygon(0% 0%,100% 0%,100% 60%,0% 60%)"
        } else if (incorrectGuesses === 2) {
            snowManImg.style.clipPath = "polygon(0% 0%,100% 0%,100% 40%,0% 40%)"
        } else if (incorrectGuesses === 1) {
            snowManImg.style.clipPath = "polygon(0% 0%,100% 0%,100% 20%,0% 20%)"
        } 

    }
    wordBlanks.textContent = dashes.join(" ")
}

var checkWin = function() {
    var check = wordBlanks.textContent.split(' ').join('')
    if (check === chosenWord) {
        isWin = true
    }
}

document.addEventListener("keydown", function(event) {
    if (timerCount === 0) {
        return;
    }
    var key = event.key.toLowerCase()
    console.log(key)
    var alphabetNumericCharacters = "abcdefghijklmnopqrstuvwxyz0123456789 ".split("");
    if(alphabetNumericCharacters.includes(key)) {
        var letterGuessed = event.key
        checkLetters(letterGuessed)
        checkWin()
    } 
})

startButton.addEventListener('click', startGame)


// resetButton.addEventListener('click', resetGame)

