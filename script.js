"use strict";

import { words } from "./words.js";

// ANIMATIONS
const pyro = document.getElementById("pyro");

// LIVES
const lives = document.getElementById("life");
const livesAnimation = document.querySelector(".livesAnimation");
const liveForToggleVisability = document.getElementById("lives");

// BUTTONS
const playAgain = document.getElementById("playAgain");
const btn = document.getElementById("btn");
const playBtn = document.getElementById("btn");

// IMAGES-------
const vertical = document.getElementById("img__ver");
const horizontal = document.getElementById("img__hor");
const mid = document.getElementById("img__mid");
const rope = document.getElementById("img__rope");
const guy = document.getElementById("img__guy");
const allImagesNotGround = document.querySelectorAll(".img");

const letters = document.querySelectorAll(".letter");
// const singleLetter = document.querySelector(".letters");

// EXECUTIONS AND IF STATEMENTS
let numOfIncorrectGuesses = 0;
let numOfcorrecGuesses = 0;
let livesLeft = 0;

// ARRAYS
let images = [vertical, horizontal, mid, rope, guy];
let wordArr = [1, 2, 3, 4, 5];
wordArr = [];

let word = "";
function randWord() {
    word = words[Math.floor(Math.random() * words.length)];
    word = word.toUpperCase();
    return word;
}

//--------------
function loopThroughArrAndAddClass(element, className) {
    for (let i = 0; i < letters.length; i++) {
        element[i].classList.add(className);
    }
}

function randomelyPositionArrItemsIn(array) {
    for (let i = 0; i < letters.length; i++) {
        let top = Math.floor(Math.random() * 80) + 10;
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
function refreshPageOnclickToPlay(element) {
    element.addEventListener("click", function () {
        location.reload();
    });
}
// ONE-TIME-USE FUNCTIONS
function createUnderlines() {
    for (let i = 0; i < word.length; i++) {
        wordArr.push(" _ ");
    }
}
function updateUnderlineString() {
    answer.innerHTML = wordArr.join("");
}
function updateNumberOfLives() {
    lives.innerHTML = livesLeft;
}

// PLAY BTN / RESET GAMEBOARD
playBtn.addEventListener("click", clickToPlay);
randWord();
function clickToPlay() {
    removeClass(images[0], "visable");
    removeClass(images[1], "visable");
    removeClass(images[2], "visable");
    removeClass(images[4], "visable");
    addClass(liveForToggleVisability, "visable");
    addClass(btn, "display--none");

    createUnderlines();
    updateUnderlineString();
    loopThroughArrAndAddClass(letters, "visable");
    randomelyPositionArrItemsIn(letters);
}

for (let i = 0; i < letters.length; i++) {
    letters[i].addEventListener("click", function () {
        let letterValue = letters[i].textContent;
        addClass(letters[i], "display--none");
        //
        if (word.includes(letterValue))
            for (let i = 0; i < word.length; i++) {
                if (word[i] === letterValue) {
                    wordArr[i] = word[i];
                    numOfcorrecGuesses++;
                    updateUnderlineString();

                    if (numOfcorrecGuesses === word.length) {
                        loopThroughArrAndAddClass(letters, "display--none");
                        removeClass(playAgain, "display--none");
                        addClass(pyro, "pyro");
                        wordArr = ["YOU WIN!!"];
                        updateUnderlineString();
                        refreshPageOnclickToPlay(playAgain);
                    }
                }
            }
        else {
            addClass(images[numOfIncorrectGuesses], "visable");
            addAnimation(livesAnimation, "wobble");
            setTimeout(resetAnimation, 1000, livesAnimation, "wobble");

            numOfIncorrectGuesses++;
            livesLeft = 5 - numOfIncorrectGuesses;
            updateNumberOfLives();

            if (numOfIncorrectGuesses > 4) {
                loopThroughArrAndAddClass(letters, "display--none");
                removeClass(images[numOfIncorrectGuesses - 2], "visable");
                removeClass(playAgain, "display--none");

                wordArr = ["YOU LOOSE!!"];
                updateUnderlineString();
                refreshPageOnclickToPlay(playAgain);
            }
        }
    });
}
