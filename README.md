# Hangman

Hangman Game **If_This_Than_That(Javascript)**-module at Hyper Island

Hi, This is a beginner project i did at Hyper Island where im currently studiying to become a Front End Developer. This was a game i worked on and of on this week and it is the first projet i have ever done in javascript. It was very fun but also challanging. I spend about 90% googling how to do stuff and 10% coding but that made me learn alot. Hope you like it!

<img width="130" height="160" alt="Screenshot 2023-11-05 at 22 14 52" src="https://github.com/OskarSollenberg/fed25-fundamentals-mtv/assets/122973984/5733d3d4-3de9-46c0-bd3b-e6ab8fa9f561">

<img width="130" height="160"  alt="Screenshot 2023-11-09 at 20 26 27" src="https://github.com/OskarSollenberg/ITTT---Hangman-ver2/assets/122973984/5253c85f-b162-4b51-955b-d0508e768b85">

<img width="130" height="160" alt="Screenshot 2023-11-05 at 22 15 28" src="https://github.com/OskarSollenberg/fed25-fundamentals-mtv/assets/122973984/cde8578a-b823-400e-9a2d-e9f6b4aa6495">

<img  width="130" height="160" alt="Screenshot 2023-11-05 at 22 15 44" src="https://github.com/OskarSollenberg/fed25-fundamentals-mtv/assets/122973984/c2b66878-7bc6-456c-bd0b-27b2c9c4424e">

<img width="230" height="160"  alt="Screenshot 2023-11-09 at 19 57 08" src="https://github.com/OskarSollenberg/ITTT---Hangman-ver2/assets/122973984/1d5e4087-90ed-4d94-b71a-46e948b95e0a">



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

-   DOM-manipulation

-   Javascript Variables, Booleans, Arrays, Functions...

-   Using Javascript to trigger Animations

-   Randomizing strings, numbers and positions.

-   Import / Export

-   Javascript built in methods/objects.

-   How to design a game.

-   Better understanding of game-logic and working with If-statements in Javascript.

-   Responsiveness using HTML, CSS and Javascript.

-   Recording and implementing audio in a Web-Game.

<!--STRAT_SECTION:code-->

<br>

**Biggest challanges:**
- Keeping the code dry.
- Understanding how to work with global and locally scoped variables.
- Understanding if it´s better to start with modifierclasses like "display--none" in HTML to later on Add or Remove them. 

- Placing letters randomly but within a certain range.
```js
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
```
- Looping throug arrays when you want to affect them but they are not in the right order.

```js
  resetAnimation(images[0], "bounceOut");
        resetAnimation(images[2], "bounceOut");
        resetAnimation(images[3], "bounceOut");
        resetAnimation(images[4], "bounceOut");
        removeClass(images[0], "visable");
        removeClass(images[2], "visable");
        removeClass(images[3], "visable");
        removeClass(images[4], "visable");
```

**💬 ask me about anything, i am happy to help**


<p>
<a href="https://github.com/thmsgbrt" target="_blank"><img alt="Github" src="https://img.shields.io/badge/GitHub-%2312100E.svg?&style=for-the-badge&logo=Github&logoColor=white" /></a> 
<a href="https://www.linkedin.com/in/thomas-guibert" target="_blank"><img alt="LinkedIn" src="https://img.shields.io/badge/linkedin-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white" /></a>
<a href="https://www.instagram.com/mokkapps/"><img src="https://img.shields.io/badge/instagram-%23E4405F.svg?&style=for-the-badge&logo=instagram&logoColor=white"></a>
</p>
