"use strict";
import { words } from "./words.js";

// Buttons
const playBtn = document.getElementById("btn");
const playAgainBtn = document.getElementById("playAgainBtn");

// Inputs (2 conditions dependent on screensize)
const input = document.getElementById("userInput");
const allLetters = document.querySelectorAll(".letter");

// Heart and number of lives
const lives = document.getElementById("life");
const livesAndHeart = document.querySelector(".lives");

// For measuring screenSizes
const card = document.querySelector("#card");
const screenWidth = window.innerWidth;

// ASSETS
// Images
const allImages = document.querySelectorAll(".img");
const imagesToAnimateOnClickPlay = [
    allImages[0],
    allImages[2],
    allImages[3],
    allImages[4],
];
// Music
const musiclist = {
    playBtnSound: new Audio("audio/pop.wav"),
    incorrectAudio: new Audio("audio/wrong.m4a"),
    correctAudio: new Audio("audio/woho.m4a"),
    losingMusic: new Audio("audio/losingMusic.mp3"),
    winningMusic: new Audio("audio/winningMusic.mp3"),
};
// Element that displays answer
let answer = document.getElementById("answer");
let underlines = ["Creating empty array"];
underlines = [];

let word = "";
let numOfcorrecGuesses = 0;
let numbOflivesLeft = 5;
let allGuessedLetters = "";

// Array Functions
function addClassToItemsInArr(array, className) {
    for (let i = 0; i < array.length; i++) {
        array[i].classList.add(className);
    }
}
function addAnimationToItemsInArr(array, animation) {
    for (let i = 0; i < array.length; i++) {
        array[i].classList.add(animation);
    }
}
function removeClassToItemsInArr(array, className) {
    for (let i = 0; i < array.length; i++) {
        array[i].classList.remove(className);
    }
}
function removeAnimationToItemsInArr(array, animation) {
    for (let i = 0; i < array.length; i++) {
        array[i].classList.remove(animation);
    }
}
// Single element Functions
function addClass(element, className) {
    element.classList.add(className);
}
function addAnimation(element, animation) {
    element.classList.add(animation);
}
function removeClass(element, className) {
    element.classList.remove(className);
}
function removeAnimation(element, animation) {
    element.classList.remove(animation);
}

// On PlayBtn-click
function clickPlayBtn() {
    musiclist.playBtnSound.play();
    addAnimation(playBtn, "bounceOut");
    addAnimationToItemsInArr(imagesToAnimateOnClickPlay, "bounceOut");
    generateRandWord();
    checkScreenSize();

    console.log(word);
    ////
    setTimeout(function () {
        createUnderlines();
        replaceUnderlinesIfCorrectAnswers();
        removeAnimationToItemsInArr(imagesToAnimateOnClickPlay, "bounceOut");
        removeClassToItemsInArr(imagesToAnimateOnClickPlay, "visable");
        addAnimation(livesAndHeart, "animate__flash");
        addClass(livesAndHeart, "visable");
        addClass(playBtn, "display--none");

        if (screenWidth > 900) {
            addClassToItemsInArr(allLetters, "visable");
            randomlyPositionLetters();
        } else {
            removeClass(input, "display--none");
        }
    }, 500);
}
function generateRandWord() {
    word = words[Math.floor(Math.random() * words.length)];
    word = word.toUpperCase();
    return word;
}
function createUnderlines() {
    for (let i = 0; i < word.length; i++) {
        underlines.push(" _ ");
    }
}
function updateNumbOflivesLeft() {
    lives.innerHTML = numbOflivesLeft;
}
function randomlyPositionLetters() {
    for (let i = 0; i < allLetters.length; i++) {
        const x1 = card.getBoundingClientRect().x;
        const x2 = x1 + card.getBoundingClientRect().width;
        const width = x1 - 30;

        const leftPx = Math.round(Math.random()) * x2 + Math.random() * width;

        const leftPercentage =
            (leftPx / document.documentElement.clientWidth) * 100;

        let top = Math.floor(Math.random() * 85);

        allLetters[i].style.top = top + "vh";
        allLetters[i].style.left = leftPercentage + "vw";
    }
}
function checkScreenSize() {
    if (screenWidth >= 900) {
        inputUsingClickLetters();
    } else {
        inputUsingEnter();
    }
}

// After getting User-input
function inputUsingClickLetters() {
    for (let i = 0; i < allLetters.length; i++) {
        allLetters[i].addEventListener("click", function () {
            let guessedLetter = allLetters[i].textContent;
            addClass(allLetters[i], "display--none");
            makeGuess(guessedLetter);
        });
    }
}
function inputUsingEnter() {
    input.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            let inputValue = input.value;
            let guessedLetter = inputValue.toUpperCase();
            makeGuess(guessedLetter);
        }
    });
}
function replaceUnderlinesIfCorrectAnswers() {
    answer.innerHTML = underlines.join("");
}
// winning condition
function displayWinCondition() {
    const winningAnimation = document.getElementById("pyro");
    underlines = ["YOU WIN!!"];
    musiclist.winningMusic.play();
    addClass(input, "display--none");
    removeClass(playAgainBtn, "display--none");
    addClass(winningAnimation, "pyro");
    replaceUnderlinesIfCorrectAnswers();
}
// loosing consdition
function displayLosingCondition() {
    underlines = ["YOU LOSE!!"];
    musiclist.losingMusic.play();
    addClassToItemsInArr(allLetters, "display--none");
    removeClass(allImages[1], "visable");
    removeClass(playAgainBtn, "display--none");
    addAnimation(livesAndHeart, "animate__hinge");
    replaceUnderlinesIfCorrectAnswers();
    addClass(input, "display--none");
}
// Game Logic
function makeGuess(guessedLetter) {
    // If guessing an allready guessed letter
    if (allGuessedLetters.includes(guessedLetter)) {
        addAnimation(input, "wobble");
        setTimeout(removeAnimation, 1000, input, "wobble");
    }
    ////
    // Guessing correct letter
    else if (word.includes(guessedLetter))
        for (let i = 0; i < word.length; i++) {
            if (word[i] === guessedLetter) {
                musiclist.correctAudio.play();
                underlines[i] = word[i];
                numOfcorrecGuesses++;
                replaceUnderlinesIfCorrectAnswers();
                ////
                ////
                // Winning
                if (numOfcorrecGuesses === word.length) {
                    displayWinCondition();
                    addClassToItemsInArr(allLetters, "display--none");
                }
            }
        }
    ////
    else {
        // Guessing incorrect letter
        musiclist.incorrectAudio.play();
        addClass(allImages[numbOflivesLeft - 1], "visable");
        addAnimation(livesAndHeart, "wobble");
        setTimeout(removeAnimation, 1000, livesAndHeart, "wobble");
        numbOflivesLeft--;
        updateNumbOflivesLeft();
        ////
        ////
        // losing
        if (numbOflivesLeft === 0) {
            displayLosingCondition();
        }
    }
    // resetting input value
    if (inputUsingEnter) {
        input.value = "";
        allGuessedLetters += guessedLetter;
    }
}
//* EVENTLISTENERS
// playAgain button
playAgainBtn.addEventListener("click", function () {
    location.reload();
});
// playn button
playBtn.addEventListener("click", clickPlayBtn);
