const startButton = document.getElementById('startButton');
const outputDiv = document.getElementById('inputText');
console.log("in logic")
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
recognition.lang = 'en-US';

recognition.continuous = true;

recognition.onstart = () => {
    startButton.textContent = 'Listening...';
};

let content = " ";
recognition.onresult = (event) => {
    const current = event.resultIndex;

    const transcript = event.results[current][0].transcript;
    content += transcript;
    outputDiv.textContent = content;

    const outputArea = document.getElementById('outputText');
    outputArea.innerHTML = ""; 
    // let notes = content;
    
    // for (let i = 0; i < notes.length; i++) {
    //     let character = notes[i].toUpperCase();
    //     if (character === " ") character = "space";
    //     const imageElement = document.createElement("img");
    //     imageElement.src = "/characters/" + character + ".jpg";
    //     outputArea.appendChild(imageElement);
    // }
};

recognition.onend = () => {
    startButton.textContent = 'Start Voice Input';
};

startButton.addEventListener('click', () => {
    recognition.start();
});


