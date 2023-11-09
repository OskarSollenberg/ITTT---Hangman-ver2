"use strict";

import { words } from "./words.js";

// ANIMATIONS
const winningAnimation = document.getElementById("pyro");

// LIVES
const lives = document.getElementById("life");
const livesAndHeart = document.querySelector(".lives");

// BUTTONS
const playBtn = document.getElementById("btn");
const playAgainBtn = document.getElementById("playAgainBtn");

// IMAGES
const images = document.querySelectorAll(".img");

// LETTERS
const allLetters = document.querySelectorAll(".letter");

// EXECUTIONS AND IF STATEMENTS
let numOfcorrecGuesses = 0;
let numbOflivesLeft = 5;

// ARRAYS
let underlinesArr = [1, 2, 3, 4, 5];
underlinesArr = [];

let word = "";
function randWord() {
    word = words[Math.floor(Math.random() * words.length)];
    word = word.toUpperCase();
    return word;
}
randWord();
console.log(word);

//--------------
function loopThroughArrAndAddClass(element, className) {
    for (let i = 0; i < allLetters.length; i++) {
        element[i].classList.add(className);
    }
}
function randomlyPositionArrItems(array) {
    for (let i = 0; i < allLetters.length; i++) {
        let top = Math.floor(Math.random() * 70) + 10;
        let left = Math.floor(Math.random() * 80) + 10;

        array[i].style.top = top + "vh";
        array[i].style.left = left + "vw";
    }
}
function addAnimation(variable, animation) {
    variable.classList.add(animation);
}
function resetAnimation(element, animation) {
    element.classList.remove(animation);
}
function addClass(element, className) {
    element.classList.add(className);
}
function removeClass(element, className) {
    element.classList.remove(className);
}
function refreshPageOnclickToPlayAgain(element) {
    element.addEventListener("click", function () {
        location.reload();
    });
}

// ONE-TIME-USE FUNCTIONS
function createUnderlines() {
    for (let i = 0; i < word.length; i++) {
        underlinesArr.push(" _ ");
    }
}
function replaceUnderlinesIfCorrectAnswers() {
    answer.innerHTML = underlinesArr.join("");
}
function updateNumbOflivesLeft() {
    lives.innerHTML = numbOflivesLeft;
}
function displayCondition(condition) {
    if (condition === "win") {
        underlinesArr = ["YOU WIN!!"];
        replaceUnderlinesIfCorrectAnswers();
    } else if (condition === "win") {
        underlinesArr = ["YOU LOOSE!!"];
        replaceUnderlinesIfCorrectAnswers();
    }
}

// PLAY BTN / RESET GAMEBOARD
playBtn.addEventListener("click", clickToPlay);
function clickToPlay() {
    removeClass(images[0], "visable");
    removeClass(images[2], "visable");
    removeClass(images[3], "visable");
    removeClass(images[4], "visable");

    addClass(livesAndHeart, "visable");
    addClass(playBtn, "display--none");

    createUnderlines();
    replaceUnderlinesIfCorrectAnswers();
    loopThroughArrAndAddClass(allLetters, "visable");
    randomlyPositionArrItems(allLetters);
}

// IF STATEMENTS
function executeIfStatements() {
    for (let i = 0; i < allLetters.length; i++) {
        allLetters[i].addEventListener("click", function () {
            let guessedLetter = allLetters[i].textContent;
            addClass(allLetters[i], "display--none");
            ////
            ////
            if (word.includes(guessedLetter))
                for (let i = 0; i < word.length; i++) {
                    if (word[i] === guessedLetter) {
                        underlinesArr[i] = word[i];
                        numOfcorrecGuesses++;
                        replaceUnderlinesIfCorrectAnswers();
                        ////
                        ////
                        if (numOfcorrecGuesses === word.length) {
                            loopThroughArrAndAddClass(
                                allLetters,
                                "display--none"
                            );
                            removeClass(playAgainBtn, "display--none");
                            addClass(winningAnimation, "pyro");
                            displayCondition("win");
                            refreshPageOnclickToPlayAgain(playAgainBtn);
                        }
                    }
                }
            ////
            ////
            else {
                addClass(images[numbOflivesLeft - 1], "visable");
                addAnimation(livesAndHeart, "wobble");
                setTimeout(resetAnimation, 1000, livesAndHeart, "wobble");
                numbOflivesLeft--;
                updateNumbOflivesLeft();
                ////
                ////
                if (numbOflivesLeft === 0) {
                    loopThroughArrAndAddClass(allLetters, "display--none");
                    removeClass(images[1], "visable");
                    removeClass(playAgainBtn, "display--none");
                    displayCondition("loose");
                    refreshPageOnclickToPlayAgain(playAgainBtn);
                }
            }
        });
    }
}
executeIfStatements();
