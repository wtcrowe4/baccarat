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
    history: handData[] = [];

    constructor() {
        this.shoe = new Shoe();
        this.shoe.shuffle();
        this.cardsLeftinShoe = this.shoe.cardsLeft;
        this.bankerCards = [];
        this.playerCards = [];
        this.bankerScore = 0;
        this.playerScore = 0;
        this.winner = null;
        this.specialHand = null;
        this.history = [];
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
      this.bankerScore %= 10;

      //Check for natural win
      if (this.playerScore >= 8 || this.bankerScore >= 8) {
          this.determineSpecialHand();
          this.winner = this.determineWinner();
      }
    }

    // High level method to determine the 3rd card for the player and banker  
    determine3rdCard() {
        // Check if either hand already has 8 or 9 (automatic win)
        if (this.playerScore >= 8 || this.bankerScore >= 8) {
            this.determineSpecialHand();
          return;
        }
        this.checkPlayerDraw();
        this.checkBankerDraw();
    }
     
    
    //Methods to check if player or banker needs to draw a card
    checkPlayerDraw() {
      if (this.playerScore <= 5) {
        this.drawCardForPlayer();
      }
    }

    checkBankerDraw() {
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
          if ((this.playerScore >= 2 && this.playerScore <= 7) || this.playerScore === 10) {
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

      
      
    // Helper functions to draw and calculate score
    drawCardForPlayer() {
      if (this.playerCards.length < 3) {
        const card = this.shoe.deal();
        if (card !== undefined) {
          this.playerCards.push(card);
          this.calculateScore();
        }
      }
    }
    
    drawCardForBanker() {
      if (this.bankerCards.length < 3) {
        const card = this.shoe.deal();
        if (card !== undefined) {
          this.bankerCards.push(card);
          this.calculateScore();
        }
      }
    }


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
        if (this.playerScore >= 8 || this.bankerScore >= 8  && this.playerCards.length === 2 && this.bankerCards.length === 2) {
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

        // Dragon Bonus
        if (this.bankerScore === 7 && this.playerCards.length === 3) {
            this.specialHand = SpecialHand.DragonBonus;
        }

        // Panda 8
        if (this.playerScore === 8 && this.playerCards.length === 3) {
            this.specialHand = SpecialHand.Panda8;
        }
        
        // Big Small
        if (this.playerScore >= 8 && this.playerScore <= 9 && this.playerCards.length === 2) {
            this.specialHand = SpecialHand.BigSmall;
        }

        // Perfect Pair
        if (playerFirstCard.rank === playerSecondCard.rank) {
            this.specialHand = SpecialHand.PerfectPair;
        }

        // Pair Plus
        if (bankerFirstCard.rank === bankerSecondCard.rank) {
            this.specialHand = SpecialHand.PairPlus;
        }

        
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
        if (this.shoe.cardsLeft < 6) {
          this.newShoe();
        }
    }

    // Method to call when shoe has less than 6 cards left.  
    newShoe() {
      this.shoe = new Shoe();
      this.shoe.shuffle();
      this.cardsLeftinShoe = this.shoe.cardsLeft;
    }


    addHandToHistory() {
        const hand: handData = {
            playerCards: this.playerCards,
            bankerCards: this.bankerCards,
            playerScore: this.playerScore,
            bankerScore: this.bankerScore,
            winner: this.winner,
            specialHand: this.specialHand,
        };
        if (hand.winner !== '' || hand.winner !== null) {
          this.history.push(hand);
        }
    }
    



  }


// interface for scoreboard
interface handData {
    playerCards: Card[];
    bankerCards: Card[];
    playerScore: number;
    bankerScore: number;
    winner: string | null;
    specialHand: SpecialHand | null;

}



// Enum for special hands
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