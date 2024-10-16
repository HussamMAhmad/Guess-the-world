// setting up variables 

let gameName = "Guess The world";
document.title = gameName;
document.querySelector('h1').innerHTML = gameName;
document.querySelector('footer').innerHTML = `${gameName} Game Created by Elzero Web School`;

let numberTrys = 6;
let letternums = 6;
let currentTry = 1;
let numberOfHints = 2;
let inputs = document.querySelector('.game-area .inputs');

let worldGuess = '';
let worlds = ['hussam', 'boxing', 'gaming', 'coding', 'elzero'];
worldGuess = worlds[Math.floor(Math.random() * worlds.length)].toLowerCase();
let message = document.querySelector('.message');
console.log(worldGuess);

// manage hints 
let hintsB = document.querySelector('.hint');
document.querySelector('.hint span').innerHTML = numberOfHints + " ";
hintsB.addEventListener('click', getHints);

function generateTrys() {
    for (let i = 1; i <= numberTrys; i++) {
        let divTry = document.createElement('div');
        divTry.classList.add(`try-${i}`);

        let span = document.createElement('span');
        span.innerHTML = `Try : ${i}`;

        if (i !== 1) divTry.classList.add('disabled-inputs');
        divTry.appendChild(span);

        for (let j = 1; j <= letternums; j++) {
            let inputLetter = document.createElement('input');
            inputLetter.setAttribute('maxlength', 1);
            inputLetter.id = `guess-${i}-letter-${j}`;
            inputLetter.type = 'text';
            divTry.appendChild(inputLetter);
        }
        inputs.appendChild(divTry);
    }
    inputs.children[0].children[1].focus();
    // disable all inputs exept first one 
    const inputsInDisabledDiv = document.querySelectorAll('.disabled-inputs input');
    inputsInDisabledDiv.forEach((input) => (input.disabled = true));

    // text uppercase 
    let input = document.querySelectorAll('input');
    input.forEach((i, index) => {
        i.addEventListener('input', function (e) {
            e.target.value = e.target.value.toUpperCase();
            const nextIndex = input[index + 1];
            if (nextIndex) nextIndex.focus();
        })
        i.addEventListener('keydown', function (event) {
            let currentIndex = Array.from(input).indexOf(event.target);
            if (event.key === "ArrowRight") {
                const nextInput = currentIndex + 1;
                if (nextInput < input.length) input[nextInput].focus();
            }
            if (event.key === "ArrowLeft") {
                const prevInput = currentIndex - 1;
                if (prevInput >= 0) input[prevInput].focus();
            }
        })
    })
}
let check = document.querySelector('.check');
check.onclick = function () {
    handleGuesses();
}
function handleGuesses() {
    let sucsses = true;
    for (let i = 1; i <= letternums; i++) {
        let lettervalue = document.querySelector(`#guess-${currentTry}-letter-${i}`);
        let letter = lettervalue.value.toLowerCase();
        let actualletter = worldGuess[i - 1];

        if (letter === actualletter) {
            lettervalue.classList.add('yes-in-place');
        } else if (worldGuess.includes(letter) && letter !== '') {
            lettervalue.classList.add('not-in-place');
            sucsses = false;
        } else {
            lettervalue.classList.add('no');
            sucsses = false;
        }
    }
    // check if user win
    if (sucsses) {
        message.innerHTML = `you win the world is <span>${worldGuess}</span>`;
        let divs = document.querySelectorAll('.inputs > div');
        divs.forEach(e => e.classList.add('disabled-inputs'));
        // disabled button 
        check.disabled = true;
        hintsB.disabled = true;
    } else {
        let currentElement = document.querySelector(`.try-${currentTry}`);
        currentElement.classList.add('disabled-inputs');
        let currentInput = document.querySelectorAll(`.try-${currentTry} input`);
        currentInput.forEach(input => input.disabled = true);
        currentTry++;
        if (document.querySelector(`.try-${currentTry}`)) {
            let nextElement = document.querySelector(`.try-${currentTry}`);
            console.log(nextElement);
            nextElement.classList.remove('disabled-inputs');
            let nextInput = document.querySelectorAll(`.try-${currentTry} input`);
            nextInput.forEach(input => input.disabled = false);
            nextElement.children[1].focus();
        } else {
            message.innerHTML = `You Lose fool the world is <span>${worldGuess}</span>`;
            check.disabled = true;
            hintsB.disabled = true;
        }
    }
}
// hints 
function getHints() {
    if (numberOfHints > 0) {
        numberOfHints--;
        document.querySelector('.hint span').innerHTML = numberOfHints + " ";
    }
    if (numberOfHints === 0) {
        hintsB.disabled = true;
    }
    let emptyOfInputs = document.querySelectorAll('.inputs input:not([disabled])');
    let emptyIndex = Array.from(emptyOfInputs).filter(e => e.value == '');
    if (emptyIndex.length > 0) {
        let randomIndex = Math.floor(Math.random() * emptyIndex.length);
        let randomInput = emptyIndex[randomIndex];
        let indexToFill = Array.from(emptyOfInputs).indexOf(randomInput);
        // console.log(randomIndex);
        // console.log(randomInput);
        // console.log(indexToFill);
        if (indexToFill !== -1) {
            randomInput.value = worldGuess[indexToFill].toUpperCase();
        }
    }
}
// handle back space 
function handlespace(event){
    if(event.key === 'Backspace'){
        let inputs = document.querySelectorAll('input:not([disabled])'); 
        let currentIndex = Array.from(inputs).indexOf(document.activeElement);
        if(currentIndex > 0){
            let currentInput = inputs[currentIndex] ; 
            let prevInput = inputs[currentIndex - 1]; 
            currentInput.value = '' ; 
            prevInput.value = ''; 
            prevInput.focus(); 
        }   
    }
}
document.addEventListener('keydown' , handlespace);

window.onload = function () {
    generateTrys();
};
