
const imagePaths = ['./src/images/animals/bear.png', './src/images/animals/buffalo.png', './src/images/animals/giraffe.png', './src/images/animals/elephant.png', './src/images/animals/cow.png', './src/images/animals/panda.png'];

const cardImages = []; 
let par = {posicao1: 0, posicao2: 0};
let pares = [];

const game = {
    view: document.getElementsByClassName('game')[0]
}

function onClickCard() {

}

function createCardView(cardNumber) {
    const cardView = document.createElement('div');
    cardView.id = cardNumber;
    cardView.addEventListener('click', onClickCard, this);
    cardView.classList.add('item');
    return cardView;
}

// Fisher Yates algorithm to randomize an array.
function fisherYates(array) {
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
    const shuffledImagePaths = fisherYates(imagePaths.concat(imagePaths));
    game.cards = shuffledImagePaths.map((value, index, array) => {
        const div = document.createElement('div');
        const img = document.createElement('img');
        img.id = index;
        img.src = value;
        img.style.height = 'auto';
        img.style.width = '100px';
        img.addEventListener('click', onClickCard, this);
        div.classList.add('item');
        div.appendChild(img);
        game.view.appendChild(div);
        return img;
    });
}

function startGame() {
    generateCards();
}

startGame();