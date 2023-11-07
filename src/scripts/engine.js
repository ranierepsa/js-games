import Card from './Card.js';

const imagePaths = [
    {id: 1, src: './src/images/animals/bear.png'},
    {id: 2, src: './src/images/animals/buffalo.png'},
    {id: 3, src: './src/images/animals/giraffe.png'},
    {id: 4, src: './src/images/animals/elephant.png'},
    {id: 5, src: './src/images/animals/cow.png'},
    {id: 6, src: './src/images/animals/panda.png'},
    {id: 7, src: './src/images/animals/penguin.png'},
    {id: 8, src: './src/images/animals/pig.png'}
];

const game = {
    view: document.getElementsByClassName('game')[0],
    flippedCard: null,
    isInputLocked: false,
    remainingMatches: imagePaths.length
}

function checkGameOver() {
    if (game.remainingMatches <= 0) {
        new Audio('./src/audios/win.mp3').play();
    }
}

function decreaseRemainingMatches() {
    game.remainingMatches--;
    checkGameOver();
}

function disableBothCardsClickEvent(card1, card2) {
    card1.divView.removeEventListener('click', flipCard);
    card2.divView.removeEventListener('click', flipCard);
}

function noMatchEvent(card1, card2) {
    card1.hideImage();
    card2.hideImage();
    game.isInputLocked = false;
}

function flipCard(event) {
    if (game.isInputLocked) return;

    const htmlElem = event.target;
    const card = htmlElem.card ? htmlElem.card : htmlElem.parentElement.card;

    card.flip();

    if (!game.flippedCard) {
        game.flippedCard = card;
        new Audio('./src/audios/click.mp3').play();
    } else {
        if (card.isMatch(game.flippedCard)) {
            card.isMatched = true;
            game.flippedCard.isMatched = true;
            disableBothCardsClickEvent(card, game.flippedCard);
            decreaseRemainingMatches();
            new Audio('./src/audios/hit.wav').play();
        } else {
            new Audio('./src/audios/miss.wav').play();
            game.isInputLocked = true;
            setTimeout(noMatchEvent, 1000, card, game.flippedCard);
        }
        game.flippedCard = null;
    }
}

function randomizeArrayWithFisherYatesAlgorithm(array) {
    var count = array.length, randomNumber, temp;
    while(count) {
        randomNumber = Math.random() * count-- | 0;
        temp = array[count];
        array[count] = array[randomNumber];
        array[randomNumber] = temp;
    }
    return array;
}

function generateCards() {
    const shuffledImagePaths = randomizeArrayWithFisherYatesAlgorithm(imagePaths.concat(imagePaths));
    game.cards = shuffledImagePaths.map((value, index, array) => {
        const div = document.createElement('div');
        const img = document.createElement('img');
        img.id = index;
        // img.src = value.src;
        div.addEventListener('click', flipCard);
        img.classList.add('img-item');
        div.classList.add('div-item-hidden-background');
        div.classList.add('div-item');
        div.appendChild(img);
        game.view.appendChild(div);
        const card = new Card(index, value.id, value.src, div);
        div.card = card;
        return card;
    });
}

function startGame() {
    generateCards();
}

startGame();