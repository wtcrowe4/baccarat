class Card {
    constructor(public suit: string, public rank: string) {}

    toString(): string {
        return `${this.rank} of ${this.suit}`;
    }
}

class Deck {
    cards: Card[] = [];

    constructor() {
        const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
        const ranks = [
            "Ace",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "Jack",
            "Queen",
            "King",
        ];

        for (const suit of suits) {
            for (const rank of ranks) {
                this.cards.push(new Card(suit, rank));
            }
        }
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }
}

class Shoe {
    numDecks: number = 8;
    cards: Card[] = [];
    cardsLeft: number = this.cards.length;

    constructor() {
        for (let i = 0; i < this.numDecks; i++) {
            const deck = new Deck();
            this.cards.push(...deck.cards);
        }
        this.cardsLeft = this.cards.length;
    }

    shuffle() {
        // Shuffle the shoe as a whole
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
        
        
    }

    deal() {
        if (this.cards.length > 0) {
            const card = this.cards.pop();
            this.cardsLeft = this.cards.length;
            console.log(this.cardsLeft);
            return card;
        }
        throw new Error("No more cards in the shoe");
    }

}

export { Shoe, Deck, Card };