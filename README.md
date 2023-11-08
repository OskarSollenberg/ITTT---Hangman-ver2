# Hangman
Hangman Game **If_This_Than_That(Javascript)**-module at Hyper Island

Hi, This is a beginner project i did at Hyper Island where im currently studiying to become a Front End Developer. This was a game i worked on and of on during 2 days and it is the first projet i have ever done in javascript. It was very fun but also challanging. I spend about 90% googling how to do stuff and 10% coding but that made me learn alot. Hope you like it! 

<img width="200" height="250" alt="Screenshot 2023-11-05 at 22 14 52" src="https://github.com/OskarSollenberg/fed25-fundamentals-mtv/assets/122973984/5733d3d4-3de9-46c0-bd3b-e6ab8fa9f561">


<img width="200" height="250" alt="Screenshot 2023-11-05 at 22 15 16" src="https://github.com/OskarSollenberg/fed25-fundamentals-mtv/assets/122973984/9a52a3b4-f59f-4e50-a53b-785068e29ad2">
    

<img width="200" height="250" alt="Screenshot 2023-11-05 at 22 15 28" src="https://github.com/OskarSollenberg/fed25-fundamentals-mtv/assets/122973984/cde8578a-b823-400e-9a2d-e9f6b4aa6495">


<img  width="200" height="250" alt="Screenshot 2023-11-05 at 22 15 44" src="https://github.com/OskarSollenberg/fed25-fundamentals-mtv/assets/122973984/c2b66878-7bc6-456c-bd0b-27b2c9c4424e">






### Languages and Tools:


<img align="left" alt="HTML5" width="26px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" style="padding-right:10px;" />
<img align="left" alt="CSS3" width="26px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" style="padding-right:10px;" />
<img align="left" alt="Javascript" width="26px" src="https://cdn.worldvectorlogo.com/logos/javascript-1.svg" style="padding-right:10px;" />
<img align="left" alt="Sass" width="26px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg" style="padding-right:10px;" />
<img align="left" alt="Git" width="26px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" style="padding-right:10px;" />
<img align="left" alt="GitHub" width="26px" src="https://user-images.githubusercontent.com/3369400/139448065-39a229ba-4b06-434b-bc67-616e2ed80c8f.png" style="padding-right:10px;" />
<img align="left" alt="GitHub" width="26px" src="https://seeklogo.com/images/N/netlify-logo-758722CDF4-seeklogo.com.png" style="padding-right:10px;" />
<img align="left" alt="Visual Studio Code" width="26px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" style="padding-right:10px;" />

<br />

---
### What I learned:

- Javascript Variables, Booleans, Arrays, Functions...

- Learning Javascript built in methods/objects. 

- DOM-manipulation

- Practicing my designing skills. 

- Better understanding of game-logic and working with If-statements in Javascript.

- Responsiveness using HTML, and CSS.

<!--STRAT_SECTION:code-->

<br>

**A bit of code:**

```js
input.addEventListener("keypress", function (press) {
        // IF STATEMENTS
        if (press.key === "Enter") {
            //
            //
            // ALLREADY GUESSED LETTER
            if (guessedBefore()) {
                addAnimation(input, "wobble");
                setTimeout(resetAnimation, 1000, input, "wobble");
                //
                //
                // NEW LETTER
            } else if (
                guessedBefore() === false &&
                word.includes(input.value.toUpperCase())
            ) {
                //
                //
                // GUESSING CORRECT
                for (let i = 0; i < word.length; i++) {
                    if (word[i] === inputValueInCaps) {
                        wordArr[i] = word[i];
                        numOfcorrecGuesses++;
                        updateUnderlineString();
                        //
                        //
                        // WINNING CONDITION
                        if (numOfcorrecGuesses === word.length) {
                            removeClass(playAgain, "display--none");
                            addClass(input, "display--none");
                            addClass(pyro, "pyro");

                            wordArr = ["YOU WIN!!"];
                            updateUnderlineString();

                            refreshPageOnBtnClick(playAgain);
                        }
                    }
                }
                //
                //
                // GUESSING WRONG
            } else if (guessedBefore() === false) {
                addClass(images[numOfIncorrectGuesses], "visable");

                addAnimation(card, "wobble");
                setTimeout(resetAnimation, 1000, card, "wobble");

                numOfIncorrectGuesses++;
                livesLeft = 5 - numOfIncorrectGuesses;
                updateNumberOfLives();
                //
                //
                // LOOSING CONDITION
                if (numOfIncorrectGuesses > 4) {
                    removeClass(images[numOfIncorrectGuesses - 2], "visable");
                    removeClass(playAgain, "display--none");
                    addClass(input, "display--none");

                    wordArr = ["YOU LOOSE!!"];
                    updateUnderlineString();

                    refreshPageOnBtnClick(playAgain);
                }
            }
        }
        //
        //
        // RESETTING INPUT VALUES & ADDING LETTER TO GUESSEDLETTER-LIST
        allGuessedLetters += inputValue;
        resetValue(input);
    });
}


```

**💬 ask me about anything, i am happy to help**

<p>
<a href="https://github.com/thmsgbrt" target="_blank"><img alt="Github" src="https://img.shields.io/badge/GitHub-%2312100E.svg?&style=for-the-badge&logo=Github&logoColor=white" /></a> 
<a href="https://www.linkedin.com/in/thomas-guibert" target="_blank"><img alt="LinkedIn" src="https://img.shields.io/badge/linkedin-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white" /></a>
<a href="https://www.instagram.com/mokkapps/"><img src="https://img.shields.io/badge/instagram-%23E4405F.svg?&style=for-the-badge&logo=instagram&logoColor=white"></a>
</p>

