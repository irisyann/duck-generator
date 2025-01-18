const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const nameInput = document.getElementById('name');
const duckSelect = document.getElementById('duck');
const downloadButton = document.getElementById('download');

const duckImages = {
    "duck-normal.png": "images/duck-normal.png",
    "duck-knife.png": "images/duck-knife.png",
    "duck-laptop.png": "images/duck-laptop.png",
};

// Static pond background image
const backgroundImage = new Image();
backgroundImage.src = 'images/pond.png';
backgroundImage.onload = () => {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
};

document.addEventListener('DOMContentLoaded', () => {
    generateDuckImage();
    generateSpeechBubble();
});

duckSelect.addEventListener('change', () => {
    generateDuckImage();
    generateSpeechBubble();
});

let typingTimer;
nameInput.addEventListener('input', () => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
        generateSpeechBubble();
    }, 1000);
});

downloadButton.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = `duck-${nameInput.value}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    alert('Your image should be downloading now, if not you probably need to re-open this in a browser!');
});

function generateDuckImage() {
    const selectedDuck = duckSelect.value;

    // Clear the canvas and draw the background
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    // Draw the duck image
    const duckImage = new Image();
    duckImage.src = duckImages[selectedDuck];
    duckImage.onload = () => {
        const duckX = 90;
        const duckY = 180;
        const duckWidth = 120;
        const duckHeight = 120;
        ctx.drawImage(duckImage, duckX, duckY, duckWidth, duckHeight);
    };
}

function generateSpeechBubble() {
    if (!isNameValid()) {
        return
    }

    // Clear exact shape of speech bubble
    // Because text is "drawn" onto the picture, this is the only way to clear the text without regenerating the entire canvas
    if (nameInput.value.length > 0) {
        ctx.clearRect(190, 75, 150, 80);
    }
    
    const quackText = "quack quack";
    const quackIntroText = "quack quack";
    const myNameIsText = "hi my name is";
    const nameIntroText = `${nameInput.value}`;

    const speechBubbleImage = new Image();
    speechBubbleImage.src = 'images/speech-bubble.png';
    speechBubbleImage.onload = () => {
        const bubbleX = 180;
        const bubbleY = 50;
        const bubbleWidth = 180;
        const bubbleHeight = 150;
        ctx.drawImage(speechBubbleImage, bubbleX, bubbleY, bubbleWidth, bubbleHeight);

        ctx.font = fontSettings();
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';

        if (nameInput.value.length > 0) {
            ctx.fillText(quackIntroText, bubbleX + bubbleWidth / 2, bubbleY + bubbleHeight / 2 - 25);
            ctx.fillText(myNameIsText, bubbleX + bubbleWidth / 2, bubbleY + bubbleHeight / 2 - 5);
            ctx.fillText(nameIntroText, bubbleX + bubbleWidth / 2, bubbleY + bubbleHeight / 2 + 15);
        } else {
            ctx.fillText(quackText, bubbleX + bubbleWidth / 2, bubbleY + bubbleHeight / 2 - 5);
        }
    };
}

function isNameValid() {
    if (nameInput.value.length > 10) {
        document.querySelector('.hintText').style.display = 'block';
        return false;
    }

    return true;
}

function fontSettings() {
    const nameLength = nameInput.value.length;
    if (nameLength > 0) {
        return '15px Arial';
    } else {
        return '22px Arial';
    }
}