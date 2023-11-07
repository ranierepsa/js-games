export default class Card {
    isFlipped = false;
    isMatched = false;

    constructor (gridPosition, imageId, imagePath, divView) {
        this.gridPosition = gridPosition;
        this.imageId = imageId;
        this.imagePath = imagePath;
        this.divView = divView;
    }

    canClick() {
        return !this.isFlipped;
    }

    showImage() {
        this.divView.childNodes[0].src = this.imagePath;
        this.divView.classList.remove('div-item-hidden-background');
    }

    hideImage() {
        this.divView.childNodes[0].src = '';
        this.divView.classList.add('div-item-hidden-background');
        this.isFlipped = false;
    }

    flip() {
        this.isFlipped = this.canClick();
        !this.canClick() ? this.showImage() : this.hideImage();
    }

    match(card) {
        this.isMatch = isMath(card);
        card.isMatch = isMath(card);
    }

    isMatch(card) {
        return card.imageId === this.imageId;
    }
}