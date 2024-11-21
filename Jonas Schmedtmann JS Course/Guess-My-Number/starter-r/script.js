'use strict';

// Variables

const checkButton = document.querySelector('.check');
const againButton = document.querySelector('.again');
let scoreView = document.querySelector('.score');
let highscore = document.querySelector('.highscore');
let selectedNumberView = document.querySelector('.number');
let inputNumber = document.querySelector('.guess');
let message = document.querySelector('.message');
let selectedNumber;
let score;

// checking if input number is correct with random one

const checkFunction = function () {
    if (inputNumber.value == selectedNumber && score > 0) {
        selectedNumberView.textContent = selectedNumber;
        message.textContent = `You Win!`;
        document.body.style.backgroundColor = "#00FF00";
        highscore.textContent = highscore.textContent > score ? highscore.textContent : score;
        checkButton.disabled = true;
    } else if (inputNumber.value == "") {
        message.textContent = `Please Enter any Number!`;
    } else {
        --score;
        message.textContent = inputNumber.value > selectedNumber ? `Too high 📈` : `Too low 📉`;
        scoreView.textContent = score;
        if (score == 0) {
            selectedNumberView.textContent = selectedNumber;
            message.textContent = `You Lost!`;
            document.body.style.backgroundColor = "#FF0000";
            checkButton.disabled = true;
        }
    }   
};

checkButton.addEventListener('click', checkFunction);

//Init and reseting game.

const againFunction = function () {
    selectedNumber = Math.trunc(Math.random() * 20) + 1;
    score = 10;
    scoreView.textContent = 10;
    document.body.style.backgroundColor = "#222";
    selectedNumberView.textContent = "?"
    message.textContent = "Start Guessing..."
    checkButton.disabled = false;
    inputNumber.value = "";
};

againButton.addEventListener('click',againFunction);
againFunction();