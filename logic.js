const startButton = document.getElementById('startButton');
const outputDiv = document.getElementById('inputText');
console.log("in logic")
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
recognition.lang = 'en-US';

recognition.continuous = true;

let isListening = false;
recognition.onstart = () => {
    startButton.textContent = 'Listening...';
    isListening = true;

};

let content = " ";

const specialCharMap = new Map([
    [' ', 'space'],
    [':', 'ddot'],
    ['<', 'lbrace'],
    ['>', 'rbrace'],
    ['?', 'que'],
    ['.', 'dot'],
    ['"', 'IC2'],
    ["'", 'IC1'],
    ['*', 'star'],
    ['#', 'hash'],
    ['/', 'forslash'],
    ['\\', 'backslash']

]);



recognition.onresult = (event) => {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    content += transcript;
    outputDiv.textContent += transcript;

    const outputArea = document.getElementById('outputText');

    let notes = transcript;

    let i = 0;

    function displayCharacter() {
        if (i < notes.length) {
            let character = notes[i];

            const imageElement = document.createElement("img");
            let path = "";
            if (character >= 'a' && character <= 'z') path = "small_";

            character = specialCharMap.get(character) || character;

            path = "/characters/" + path + character + ".jpg";
            imageElement.src = path;
            imageElement.classList.add('character-image');
            outputArea.appendChild(imageElement);
            i++;
            setTimeout(displayCharacter, 50);
        }
    }

    displayCharacter();
};


recognition.onend = () => {
    startButton.textContent = 'Start Voice Input';
    isListening = false;

};

startButton.addEventListener('click', () => {
    if (isListening) {
        recognition.stop();
    } else {
        recognition.start();
    }
});


// for auto expanding textarea

var textarea = document.getElementById("inputText");
var heightLimit = 400; /* Maximum height: 200px */

textarea.oninput = function () {
    textarea.style.height = ""; /* Reset the height*/
    textarea.style.height = Math.min(textarea.scrollHeight, heightLimit) + "px";
};

