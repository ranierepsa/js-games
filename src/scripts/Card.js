export default class Card {
    isFlipped = false;
    isMatched = false;

    constructor (gridPosition, imageId, imagePath) {
        this.gridPosition = gridPosition;
        this.imageId = imageId;
        this.imagePath = imagePath;
    }

    canClick() {
        return !this.isFlipped;
    }

    flip() {
        if (this.canClick()) {
            this.isFlipped;
        }
    }

    match(card) {
        if (isMath(card)) {
            this.isMatch = true;
            card.isMatch = true;
        } else {
            this.isFlipped = false;
            card.isFlipped = false;
        }
    }

    isMatch(card) {
        return card.canClick() && card.imageId === this.imageId;
    }
}