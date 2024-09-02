import { Shoe, Card } from "./shoe";

class Baccarat {
    shoe: Shoe;
    bankerCards: Card[] = [];
    playerCards: Card[] = [];
    bankerScore: number = 0;
    playerScore: number = 0;

    constructor() {
        this.shoe = new Shoe();
        this.shoe.shuffle();
        this.bankerCards = [];
        this.playerCards = [];
        this.bankerScore = 0;
        this.playerScore = 0;
    }

    deal() {
        const card1 = this.shoe.deal();
        if (card1 !== undefined) {
            this.playerCards.push(card1);
        }
        const card2 = this.shoe.deal();
        if (card2 !== undefined) {
            this.bankerCards.push(card2);
        }
        const card3 = this.shoe.deal();
        if (card3 !== undefined) {
            this.playerCards.push(card3);
        }
        const card4 = this.shoe.deal();
        if (card4 !== undefined) {
            this.bankerCards.push(card4);
        }
        
    }

    calculateScore() {
        // Calculate player score
        this.playerScore = 0;
        for (const card of this.playerCards) {
            if (card.rank === "Ace") {
                this.playerScore += 1;
            } else if (card.rank === "Jack" || card.rank === "Queen" || card.rank === "King") {
                this.playerScore += 0;
            } else {
                this.playerScore += parseInt(card.rank);
            }
        }
        this.playerScore %= 10;

        // Calculate banker score
        this.bankerScore = 0;
        for (const card of this.bankerCards) {
            if (card.rank === "Ace") {
                this.bankerScore += 1;
            } else if (card.rank === "Jack" || card.rank === "Queen" || card.rank === "King") {
                this.bankerScore += 0;
            } else {
                this.bankerScore += parseInt(card.rank);
            }
        }
    }

    determine3rdCard() {
        if (this.playerScore >= 8 || this.bankerScore >= 8) {
            return;
        }

        if (this.playerScore <= 5) {
            const card = this.shoe.deal();
            if (card !== undefined) {
                this.playerCards.push(card);
            }
        } else if (this.bankerScore <= 5) {
            const card = this.shoe.deal();
            if (card !== undefined) {
                this.bankerCards.push(card);
            }
        }

    }

}

export default Baccarat;