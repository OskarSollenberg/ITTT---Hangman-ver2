"use strict";
import { words } from "./words.js";

// Btns
const playBtn = document.getElementById("btn");
const playAgainBtn = document.getElementById("playAgainBtn");

// Inputs
const input = document.getElementById("userInput");
const allLetters = document.querySelectorAll(".letter");

// Lives-element
const lives = document.getElementById("life");
const livesAndHeart = document.querySelector(".lives");

// For measuring screenSizes
const card = document.querySelector("#card");
const screenWidth = window.innerWidth;

// Displaying answer
let answer = document.getElementById("answer");
let underlines = ["Creating empty array"];
underlines = [];

// Assets
const allImages = document.querySelectorAll(".img");
const musiclist = {
    playBtnSound: new Audio("audio/pop.wav"),
    incorrectAudio: new Audio("audio/wrong.m4a"),
    correctAudio: new Audio("audio/woho.m4a"),
    losingMusic: new Audio("audio/losingMusic.mp3"),
    winningMusic: new Audio("audio/winningMusic.mp3"),
};

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
let word = "";
function randWord() {
    word = words[Math.floor(Math.random() * words.length)];
    word = word.toUpperCase();
    return word;
}
function clickPlayBtn() {
    let imagesToAnimate = [
        allImages[0],
        allImages[2],
        allImages[3],
        allImages[4],
    ];
    musiclist.playBtnSound.play();
    addAnimation(playBtn, "bounceOut");
    addAnimationToItemsInArr(imagesToAnimate, "bounceOut");
    randWord();
    console.log(word);
    ////
    setTimeout(function () {
        createUnderlines();
        replaceUnderlinesIfCorrectAnswers();
        removeAnimationToItemsInArr(imagesToAnimate, "bounceOut");
        removeClassToItemsInArr(imagesToAnimate, "visable");
        addAnimation(livesAndHeart, "animate__flash");
        addClass(livesAndHeart, "visable");
        addClass(playBtn, "display--none");

        if (screenWidth > 900) {
            addClassToItemsInArr(allLetters, "visable");
            randomlyPositionLetters(allLetters);
        } else {
            removeClass(input, "display--none");
        }
    }, 500);
}
function createUnderlines() {
    for (let i = 0; i < word.length; i++) {
        underlines.push(" _ ");
    }
}
function updateNumbOflivesLeft() {
    lives.innerHTML = numbOflivesLeft;
}
function randomlyPositionLetters(array) {
    for (let i = 0; i < array.length; i++) {
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
function checkScreenSize() {
    if (screenWidth >= 900) {
        ifUserInputIsLetterClick();
    } else {
        ifUserinputIsKeypress();
    }
}
checkScreenSize();

// After getting User-input
function ifUserInputIsLetterClick() {
    for (let i = 0; i < allLetters.length; i++) {
        allLetters[i].addEventListener("click", function () {
            let guessedLetter = allLetters[i].textContent;
            addClass(allLetters[i], "display--none");
            makeGuess(guessedLetter);
        });
    }
}
function ifUserinputIsKeypress() {
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

// Game Logic
let numOfcorrecGuesses = 0;
let numbOflivesLeft = 5;
let allGuessedLetters = "";
function makeGuess(guessedLetter) {
    if (allGuessedLetters.includes(guessedLetter)) {
        addAnimation(input, "wobble");
        setTimeout(removeAnimation, 1000, input, "wobble");
    }
    ////
    else if (word.includes(guessedLetter))
        for (let i = 0; i < word.length; i++) {
            if (word[i] === guessedLetter) {
                musiclist.correctAudio.play();
                underlines[i] = word[i];
                numOfcorrecGuesses++;
                replaceUnderlinesIfCorrectAnswers();
                ////
                ////
                if (numOfcorrecGuesses === word.length) {
                    displayWinCondition();
                    addClassToItemsInArr(allLetters, "display--none");
                }
            }
        }
    ////
    else {
        musiclist.incorrectAudio.play();
        addClass(allImages[numbOflivesLeft - 1], "visable");
        addAnimation(livesAndHeart, "wobble");
        setTimeout(removeAnimation, 1000, livesAndHeart, "wobble");
        numbOflivesLeft--;
        updateNumbOflivesLeft();
        ////
        ////
        if (numbOflivesLeft === 0) {
            displayLosingCondition();
        }
    }
    if (ifUserinputIsKeypress) {
        input.value = "";
        allGuessedLetters += guessedLetter;
    }
}
// winning
function displayWinCondition() {
    const winningAnimation = document.getElementById("pyro");
    underlines = ["YOU WIN!!"];
    musiclist.winningMusic.play();
    addClass(input, "display--none");
    removeClass(playAgainBtn, "display--none");
    addClass(winningAnimation, "pyro");
    replaceUnderlinesIfCorrectAnswers();
}
// loosing
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

// EventListeners
playBtn.addEventListener("click", function () {
    clickPlayBtn();
});
playAgainBtn.addEventListener("click", function () {
    location.reload();
});
