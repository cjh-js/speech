const toggleBtn = document.querySelector('.toggle-btn');
const toggleBox = document.querySelector('.toggle-wrap');
const closeBtn = document.querySelector('.close-btn');
const voiceSelect = document.querySelector('.voice-select');
const cards = document.querySelectorAll('.card');
const readBtn = document.querySelector('.read-btn');
const textarea = document.querySelector('.voice-text');

// Voices
const message = new SpeechSynthesisUtterance();
let voices = [];

function getVoiceList(){
    voices = speechSynthesis.getVoices();
    voices.forEach((voice) => {
        const option = document.createElement('option');
        option.value = voice.name;
        option.innerText = `${voice.name} ${voice.lang}`;
        voiceSelect.appendChild(option);
    });
}

function setTextMessage(text){
    message.text = text;
}

function speakText(){
    message.volume = 0.5;
    speechSynthesis.speak(message);
}

function setVoice(e){
    message.voice = voices.find(voice => voice.name === e.target.value);
}

// Box Event Listener
toggleBtn.addEventListener('click', () => {
    toggleBox.classList.toggle('show');
});

closeBtn.addEventListener('click', () => {
    toggleBox.classList.remove('show');
});

window.addEventListener('click', (e) => {
    if(e.target === toggleBox){
        toggleBox.classList.remove('show');
    } else{
        return false;
    }
});

cards.forEach(card => {
    card.addEventListener('click', (e) => {
        const textWrap = e.target.parentNode.querySelector('span');
        const text = textWrap.innerText;
        card.classList.add('active');
        setTimeout(() => card.classList.remove('active'), 800);
        setTextMessage(text);
        speakText();
    });
});

readBtn.addEventListener('click', () => {
    setTextMessage(textarea.value);
    speakText();
});

voiceSelect.addEventListener('change', setVoice);

speechSynthesis.addEventListener('voiceschanged', getVoiceList);

// Function init
getVoiceList();