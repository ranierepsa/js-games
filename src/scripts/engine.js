import Card from './Card.js';

const imagePaths = [
    {id: 1, src: './src/images/animals/bear.png'},
    {id: 2, src: './src/images/animals/buffalo.png'},
    {id: 3, src: './src/images/animals/giraffe.png'},
    {id: 4, src: './src/images/animals/elephant.png'},
    {id: 5, src: './src/images/animals/cow.png'},
    {id: 6, src: './src/images/animals/panda.png'}
];

const game = {
    view: document.getElementsByClassName('game')[0],
    cards: []
}

function onClickCard(elem) {
    // const card = elem.srcElement;
    // console.log(card);
    console.log(game.cards);
}

// function createCardView(cardNumber) {
//     const cardView = document.createElement('div');
//     cardView.id = cardNumber;
//     cardView.addEventListener('click', onClickCard, this);
//     cardView.classList.add('item');
//     return cardView;
// }

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
        img.src = value.src;
        img.addEventListener('click', onClickCard, this);
        img.classList.add('img-item');
        div.classList.add('div-item-hidden-background');
        div.classList.add('div-item');
        div.appendChild(img);
        game.view.appendChild(div);
        // return img;
        return new Card(index, value.id, value.src);
    });
}

function startGame() {
    generateCards();
}

startGame();