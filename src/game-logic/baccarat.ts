import { Shoe, Card } from "./shoe";

class Baccarat {
    shoe: Shoe;
    cardsLeftinShoe: number;
    bankerCards: Card[] = [];
    playerCards: Card[] = [];
    bankerScore: number = 0;
    playerScore: number = 0;
    winner: string | null = null;
    specialHand: SpecialHand | null = null;

    constructor() {
        this.shoe = new Shoe();
        this.shoe.shuffle();
        this.cardsLeftinShoe = this.shoe.cardsLeft;
        this.bankerCards = [];
        this.playerCards = [];
        this.bankerScore = 0;
        this.playerScore = 0;
    }

    // checkShoeSize() {
    //     if (this.shoe.cardsLeft < 6) {
    //         this.shoe = new Shoe();
    //         this.shoe.shuffle();
    //     }
    //     console.log("Shoe size is less than 6. New shoe created.");
    // }

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
        this.bankerScore %= 10;

        //Check for natural win
        if (this.playerScore >= 8 || this.bankerScore >= 8) {
            this.determineSpecialHand();
            this.winner = this.determineWinner();
        }
    }


    determine3rdCard() {
        // Check if either hand already has 8 or 9 (automatic win)
        if (this.playerScore >= 8 || this.bankerScore >= 8) {
            this.determineSpecialHand();
          return;
        }
      
        // Player's hand
        if (this.playerScore <= 5) {
          this.drawCardForPlayer(); // Player must draw
        } else {
          // Banker's hand
          switch (this.bankerScore) {
            case 0:
            case 1:
            case 2:
              this.drawCardForBanker(); // Banker must draw (0-2)
              break;
            case 3:
              if (this.playerScore >= 2 && this.playerScore <= 8) {
                this.drawCardForBanker(); // Banker draws if player's 3rd card is 2-8
              }
              break;
            case 4:
              if (this.playerScore >= 2 && this.playerScore <= 7 || this.playerScore === 10) {
                this.drawCardForBanker(); // Banker draws if player's 3rd card is 2-7 or 10
              }
              break;
            case 5:
              if (this.playerScore >= 4 && this.playerScore <= 10) {
                this.drawCardForBanker(); // Banker draws if player's 3rd card is 4-10
              }
              break;
            case 6:
              if (this.playerScore === 6 || this.playerScore === 7) {
                this.drawCardForBanker(); // Banker draws if player's 3rd card is 6 or 7
              }
              break;
            default:
              // Banker's hand is 7, so they stand
              break;
          }
        }
      }
      
      // Helper functions to draw and calculate score
      drawCardForPlayer() {
        const card = this.shoe.deal();
        if (card !== undefined) {
          this.playerCards.push(card);
          this.calculateScore();
        }
      }
      
      drawCardForBanker() {
        const card = this.shoe.deal();
        if (card !== undefined) {
          this.bankerCards.push(card);
          this.calculateScore();
        }
      }

    // determine3rdCard() {
    //     if (this.playerScore >= 8 || this.bankerScore >= 8) {
    //         return;
    //     }

    //     if (this.playerScore <= 5) {
    //         const card = this.shoe.deal();
    //         if (card !== undefined) {
    //             this.playerCards.push(card);
    //             this.calculateScore();
    //         }
    //     } else if (this.bankerScore <= 5) {
    //         const card = this.shoe.deal();
    //         if (card !== undefined) {
    //             this.bankerCards.push(card);
    //             this.calculateScore();
    //         }
    //     }
    // }

    determineWinner() {
        if (this.playerScore > this.bankerScore) {
            return this.winner = "Player";
        } else if (this.playerScore < this.bankerScore) {
            return this.winner = "Banker";
        } else {
           return this.winner =  "Tie";
        }
    }


    determineSpecialHand() {
        // Logic to determine the special hand based on the dealt cards
        // ...
        const playerFirstCard = this.playerCards[0];
        const playerSecondCard = this.playerCards[1];
        const bankerFirstCard = this.bankerCards[0];
        const bankerSecondCard = this.bankerCards[1];

        // Natural Win/Tie
        if (this.playerScore >= 8 || this.bankerScore >= 8) {
            if (this.playerScore === this.bankerScore) {
            this.specialHand = SpecialHand.NaturalTie;
            this.winner = 'Tie';
            } else if (this.playerScore > this.bankerScore) {
            this.specialHand = SpecialHand.NaturalWin; // Player wins
            this.winner = 'Player';
            } else {
            this.specialHand = SpecialHand.NaturalWin; // Banker wins
            this.winner = 'Banker';
            }
        }

    
        // if (/*Condition for Natural Win*/  ) {
        //   this.specialHand = SpecialHand.NaturalWin;
        // } else if (/* Condition for Natural Tie*/) {
        //   this.specialHand = SpecialHand.NaturalTie;
        // } else if (/* Condition for Dragon Bonus*/) {
        //   this.specialHand = SpecialHand.DragonBonus;
        // } else if (/* Condition for Panda 8*/) {
        //   this.specialHand = SpecialHand.Panda8;
        // } else if (/* Condition for Big Small*/) {
        //   this.specialHand = SpecialHand.BigSmall;
        // } else if (/* Condition for Perfect Pair*/) {
        //   this.specialHand = SpecialHand.PerfectPair;
        // } else if (/* Condition for Pair Plus*/) {
        //   this.specialHand = SpecialHand.PairPlus;
        // } else {
        //   this.specialHand = null;
        // }
    }

    determinePayouts() {
        // Logic to determine the payouts based on the winner and special hand
        // ...
    }


    newHand() {
        this.playerCards = [];
        this.bankerCards = [];
        this.playerScore = 0;
        this.bankerScore = 0;
        this.winner = '';
        this.specialHand = null;
    }

}

enum SpecialHand {
    NaturalWin = 'Natural Win',
    NaturalTie = 'Natural Tie',
    DragonBonus = 'Dragon Bonus',
    Panda8 = 'Panda 8',
    BigSmall = 'Big Small',
    PerfectPair = 'Perfect Pair',
    PairPlus = 'Pair Plus',
  }

export default Baccarat;