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
const card = document.querySelector("#card");
const input = document.getElementById("userInput");

const screenWidth = window.innerWidth;

// AUDIO
const musiclist = {
    playBtnSound: new Audio("audio/pop.wav"),
    incorrectAudio: new Audio("audio/wrong.m4a"),
    correctAudio: new Audio("audio/woho.m4a"),
    losingMusic: new Audio("audio/losingMusic.mp3"),
    winningMusic: new Audio("audio/winningMusic.mp3"),
};

// EXECUTIONS AND IF STATEMENTS

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

// ARRAY FUNCTIONS
function arrAddClass(array, className) {
    for (let i = 0; i < array.length; i++) {
        array[i].classList.add(className);
    }
}
function arrAddAnimation(array, animation) {
    for (let i = 0; i < array.length; i++) {
        array[i].classList.add(animation);
    }
}
function arrRemoveClass(array, className) {
    for (let i = 0; i < array.length; i++) {
        array[i].classList.remove(className);
    }
}
function arrRemoveAnimation(array, animation) {
    for (let i = 0; i < array.length; i++) {
        array[i].classList.remove(animation);
    }
}

//--------------
function addClass(element, className) {
    element.classList.add(className);
}
function addAnimation(variable, animation) {
    variable.classList.add(animation);
}
function removeClass(element, className) {
    element.classList.remove(className);
}
function removeAnimation(element, animation) {
    element.classList.remove(animation);
}

function refreshPageOnClick(element) {
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
function randomlyPositionLetters(array) {
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
function displayWinCondition() {
    underlinesArr = ["YOU WIN!!"];
    musiclist.winningMusic.play();
    addClass(input, "display--none");
    removeClass(playAgainBtn, "display--none");
    addClass(winningAnimation, "pyro");
    replaceUnderlinesIfCorrectAnswers();
}
function displayLosingCondition() {
    underlinesArr = ["YOU LOSE!!"];
    musiclist.losingMusic.play();
    arrAddClass(allLetters, "display--none");
    removeClass(images[1], "visable");
    removeClass(playAgainBtn, "display--none");
    addAnimation(livesAndHeart, "animate__hinge");
    replaceUnderlinesIfCorrectAnswers();
    addClass(input, "display--none");
}

let imageAnimationArray = [images[0], images[2], images[3], images[4]];
playBtn.addEventListener("click", function () {
    var node = this;
    musiclist.playBtnSound.play();
    addAnimation(playBtn, "bounceOut");
    arrAddAnimation(imageAnimationArray, "bounceOut");
    ////
    setTimeout(function () {
        node.classList.remove("open");
        createUnderlines();
        replaceUnderlinesIfCorrectAnswers();
        arrRemoveAnimation(imageAnimationArray, "bounceOut");
        arrRemoveClass(imageAnimationArray, "visable");
        addAnimation(livesAndHeart, "animate__flash");
        addClass(livesAndHeart, "visable");
        addClass(playBtn, "display--none");

        if (screenWidth > 900) {
            arrAddClass(allLetters, "visable");
            randomlyPositionLetters(allLetters);
        } else {
            removeClass(input, "display--none");
        }
    }, 500);
});

function checkScreenSize() {
    if (screenWidth >= 900) {
        ifUserInputLetterClick();
    } else {
        ifUserinputKeypress();
    }
}
checkScreenSize();

function ifUserInputLetterClick() {
    for (let i = 0; i < allLetters.length; i++) {
        allLetters[i].addEventListener("click", function () {
            let guessedLetter = allLetters[i].textContent;
            addClass(allLetters[i], "display--none");
            makeGuess(guessedLetter);
        });
    }
}
function ifUserinputKeypress() {
    input.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            let inputValue = input.value;
            let guessedLetter = inputValue.toUpperCase();
            makeGuess(guessedLetter);
        }
    });
}

let numOfcorrecGuesses = 0;
let numbOflivesLeft = 5;
let allGuessedLetters = "";

function makeGuess(guessedLetter) {
    console.log(guessedLetter);
    if (allGuessedLetters.includes(guessedLetter)) {
        addAnimation(input, "wobble");
        setTimeout(removeAnimation, 1000, input, "wobble");
    }
    ////
    else if (word.includes(guessedLetter))
        for (let i = 0; i < word.length; i++) {
            if (word[i] === guessedLetter) {
                musiclist.correctAudio.play();
                underlinesArr[i] = word[i];
                numOfcorrecGuesses++;
                replaceUnderlinesIfCorrectAnswers();
                ////
                ////
                if (numOfcorrecGuesses === word.length) {
                    displayWinCondition();
                    refreshPageOnClick(playAgainBtn);
                    arrAddClass(allLetters, "display--none");
                }
            }
        }
    ////
    else {
        musiclist.incorrectAudio.play();
        addClass(images[numbOflivesLeft - 1], "visable");
        addAnimation(livesAndHeart, "wobble");
        setTimeout(removeAnimation, 1000, livesAndHeart, "wobble");
        numbOflivesLeft--;
        updateNumbOflivesLeft();
        ////
        ////
        if (numbOflivesLeft === 0) {
            displayLosingCondition();
            refreshPageOnClick(playAgainBtn);
        }
    }
    if (ifUserinputKeypress) {
        resetValue(input);
        allGuessedLetters += guessedLetter;
        console.log(allGuessedLetters);
    }
}
