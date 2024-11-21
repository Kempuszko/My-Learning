'use strict';

// Variables
const buttonNewGame = document.querySelector('.btn--new');
const buttonRoll = document.querySelector('.btn--roll');
const buttonHold = document.querySelector('.btn--hold');
const currentScorePlayer1 = document.querySelector('#current--0');
const currentScorePlayer2 = document.querySelector('#current--1');
const sumScorePlayer1 = document.querySelector('#score--0');
const sumScorePlayer2 = document.querySelector('#score--1');
const dicePicture = document.querySelector('.dice');
const playerActive0 = document.querySelector('.player--0');
const playerActive1 = document.querySelector('.player--1');
let playerActive = 0;
let sumOfDiceRolls = 0;
let playerSumScores = [0,0];

// dice roll function
const diceRoll = () => Math.trunc(Math.random() * 6) + 1;

// dice picture change
const dicePictureChange = rolledNum => dicePicture.src = `dice-${rolledNum}.png`

//player change
const playerChange = function() {
    playerActive = playerActive == 0 ? 1 : 0;
    console.log(playerActive)
    playerActive0.classList.toggle('player--active');
    playerActive1.classList.toggle('player--active');
}

// game functionallity (summing score, player change etc)
const gameFunctionallity = function(num) {
    sumOfDiceRolls += num;
    dicePictureChange(num);
    if (playerActive == 0) {
        currentScorePlayer1.textContent = sumOfDiceRolls
    } else {
        currentScorePlayer2.textContent = sumOfDiceRolls
    }
    if (num == 1) {
        sumOfDiceRolls = 0;
        if (playerActive == 0) {
            currentScorePlayer1.textContent = 0
            playerChange();
        } else {
            currentScorePlayer2.textContent = 0
            playerChange();
        }
    }
}

const checkWinConditions = function() {
    if (playerSumScores[0] >= 100) {
        playerActive0.classList.add('player--winner');
        buttonHold.disabled = true;
        buttonRoll.disabled = true;
    } 
    else if (playerSumScores[1] >= 100) {
        playerActive1.classList.add('player--winner');
        buttonHold.disabled = true;
        buttonRoll.disabled = true;
    }
}

const holdingScore = function() {
    if(playerActive == 0) {
        playerSumScores[0] += sumOfDiceRolls;
        sumScorePlayer1.textContent = playerSumScores[0];
        currentScorePlayer1.textContent = 0
        sumOfDiceRolls = 0;
        playerChange();
    } else {
        playerSumScores[1] += sumOfDiceRolls;
        sumScorePlayer2.textContent = playerSumScores[1];
        currentScorePlayer2.textContent = 0
        sumOfDiceRolls = 0;
        playerChange();
    }
    checkWinConditions();
}

// roll button function
const rollFunction = () => gameFunctionallity(diceRoll())

// init;
const init = function() {
    dicePicture.src = 'dice-0.png';
    currentScorePlayer1.textContent = 0
    currentScorePlayer2.textContent = 0
    sumScorePlayer1.textContent = 0
    sumScorePlayer2.textContent = 0
    buttonHold.disabled = false;
    buttonRoll.disabled = false;
    playerActive = 0;
    playerActive0.classList.remove('player--winner');
    playerActive1.classList.remove('player--winner');
}

// new game event listener
buttonNewGame.addEventListener('click', init);

// roll dice event listener 
buttonRoll.addEventListener('click',rollFunction)

// hold event listener
buttonHold.addEventListener('click',holdingScore)

init()