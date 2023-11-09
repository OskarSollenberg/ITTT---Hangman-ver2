"use strict";
import { words } from "./words.js";

// ANIMATIONS
document.documentElement.style.setProperty("--animate-duration", "1.5s");

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
const card = document.querySelector("#card");
const input = document.getElementById("userInput");

const screenWidth = window.innerWidth;

const wrapper = document.querySelector(".content__wrapper ");

// EXECUTIONS AND IF STATEMENTS
let numOfcorrecGuesses = 0;
let numbOflivesLeft = 5;
let allGuessedLetters = "";

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
        const x1 = card.getBoundingClientRect().x;
        const x2 = x1 + card.getBoundingClientRect().width;
        const width = x1 - 30;

        const leftPx = Math.round(Math.random()) * x2 + Math.random() * width;

        const leftPercentage =
            (leftPx / document.documentElement.clientWidth) * 100;

        let top = Math.floor(Math.random() * 85);

        array[i].style.top = top + "vh";
        array[i].style.left = leftPercentage + "vw";
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
function resetValue(element) {
    element.value = "";
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
    } else if (condition === "loose") {
        underlinesArr = ["YOU LOOSE!!"];
        replaceUnderlinesIfCorrectAnswers();
    }
}
function guessedBefore(element) {
    if (allGuessedLetters.includes(element)) {
        return true;
    } else {
        return false;
    }
}

// PLAY BTN / RESET GAMEBOARD
// playBtn.addEventListener("click", clickToPlay);

playBtn.addEventListener("click", function () {
    var node = this;
    addAnimation(images[0], "bounceOut");
    addAnimation(images[2], "bounceOut");
    addAnimation(images[3], "bounceOut");
    addAnimation(images[4], "bounceOut");
    ////
    setTimeout(resetAnimation, 3000, wrapper, "bounceOut");
    setTimeout(function () {
        node.classList.remove("open");
        createUnderlines();
        replaceUnderlinesIfCorrectAnswers();
        resetAnimation(images[0], "bounceOut");
        resetAnimation(images[2], "bounceOut");
        resetAnimation(images[3], "bounceOut");
        resetAnimation(images[4], "bounceOut");
        removeClass(images[0], "visable");
        removeClass(images[2], "visable");
        removeClass(images[3], "visable");
        removeClass(images[4], "visable");

        addClass(livesAndHeart, "visable");
        addClass(playBtn, "display--none");

        if (screenWidth > 900) {
            loopThroughArrAndAddClass(allLetters, "visable");
            randomlyPositionArrItems(allLetters);
        } else {
            removeClass(input, "display--none");
        }
    }, 500);
});

// function clickToPlay() {
//     removeClass(images[0], "visable");
//     removeClass(images[2], "visable");
//     removeClass(images[3], "visable");
//     removeClass(images[4], "visable");

//     addClass(livesAndHeart, "visable");
//     addClass(playBtn, "display--none");

//     createUnderlines();
//     replaceUnderlinesIfCorrectAnswers();

//     if (screenWidth > 900) {
//         loopThroughArrAndAddClass(allLetters, "visable");
//         randomlyPositionArrItems(allLetters);
//         overlayCheck();
//     } else {
//         removeClass(input, "display--none");
//     }
// }

// IF STATEMENTS

if (screenWidth >= 900)
    for (let i = 0; i < allLetters.length; i++) {
        allLetters[i].addEventListener("click", function () {
            let guessedLetter = allLetters[i].textContent;
            addClass(allLetters[i], "display--none");
            ////
            ////
            if (word.includes(guessedLetter))
                ////
                ////
                for (let i = 0; i < word.length; i++) {
                    if (word[i] === guessedLetter) {
                        underlinesArr[i] = word[i];
                        numOfcorrecGuesses++;
                        replaceUnderlinesIfCorrectAnswers();
                        ////
                        ////
                        if (numOfcorrecGuesses === word.length) {
                            removeClass(playAgainBtn, "display--none");
                            addClass(winningAnimation, "pyro");
                            displayCondition("win");
                            refreshPageOnclickToPlayAgain(playAgainBtn);
                            loopThroughArrAndAddClass(
                                allLetters,
                                "display--none"
                            );
                        }
                    }
                }
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
else if (screenWidth <= 900) {
    input.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            let inputValue = input.value;
            let guessedLetter = inputValue.toUpperCase();
            ////
            ////
            if (guessedBefore(guessedLetter)) {
                addAnimation(input, "wobble");
                setTimeout(resetAnimation, 1000, input, "wobble");
                ////
                ////
            } else if (word.includes(guessedLetter))
                for (let i = 0; i < word.length; i++) {
                    if (word[i] === guessedLetter) {
                        underlinesArr[i] = word[i];
                        numOfcorrecGuesses++;
                        replaceUnderlinesIfCorrectAnswers();
                        ////
                        ////
                        if (numOfcorrecGuesses === word.length) {
                            addClass(input, "display--none");
                            removeClass(playAgainBtn, "display--none");
                            addClass(winningAnimation, "pyro");
                            displayCondition("win");
                            refreshPageOnclickToPlayAgain(playAgainBtn);
                        }
                    }
                }
            else {
                addClass(images[numbOflivesLeft - 1], "visable");
                addAnimation(livesAndHeart, "wobble");
                setTimeout(resetAnimation, 1000, livesAndHeart, "wobble");
                numbOflivesLeft--;
                updateNumbOflivesLeft();
                ////
                ////
                if (numbOflivesLeft === 0) {
                    addClass(input, "display--none");
                    removeClass(images[1], "visable");
                    removeClass(playAgainBtn, "display--none");
                    displayCondition("loose");
                    refreshPageOnclickToPlayAgain(playAgainBtn);
                }
            }
            ////
            ////
            allGuessedLetters += guessedLetter;
            console.log(allGuessedLetters);
            resetValue(input);
        }
    });
}
