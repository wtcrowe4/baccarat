import { useState, useEffect } from 'react'
import { Card, CardImage } from './game-logic/shoe.ts'
import Baccarat from './game-logic/baccarat.ts'
import './App.css'
import tableImage from './assets/baccarat-table.jpg'
import Scoreboard from './components/Scoreboard.tsx'
import image from './assets/cards/2C.png'

function App() {
  const [playerCards, setPlayerCards] = useState<Card[]>([])
  const [bankerCards, setBankerCards] = useState<Card[]>([])
  const [playerScore, setPlayerScore] = useState<number>(0)
  const [bankerScore, setBankerScore] = useState<number>(0)
  const [winner, setWinner] = useState<string | null>(null)
  const [specialHand, setSpecialHand] = useState<string | null>(null)
  const [baccarat, setBaccarat] = useState<Baccarat>(new Baccarat()) 
  const [cardsLeft, setCardsLeft] = useState<number>(baccarat.cardsLeftinShoe)


  // useEffect(() => {
  //   console.log(cardsLeft)
    
  // }, [cardsLeft])
  
  
  const newHand = () => {
    baccarat.newHand()
    setPlayerCards(baccarat.playerCards)
    setBankerCards(baccarat.bankerCards)
    setPlayerScore(baccarat.playerScore)
    setBankerScore(baccarat.bankerScore)
    setCardsLeft(baccarat.shoe.cardsLeft)
    setWinner(baccarat.winner)
    setSpecialHand(baccarat.specialHand)
  }

  const dealHand = () => {
    baccarat.newHand()
    baccarat.deal()
    setPlayerCards(baccarat.playerCards)
    setBankerCards(baccarat.bankerCards)
    setCardsLeft(baccarat.shoe.cardsLeft)
    baccarat.calculateScore()
    setPlayerScore(baccarat.playerScore)
    setBankerScore(baccarat.bankerScore)
    setSpecialHand(baccarat.specialHand)
    setWinner(baccarat.winner)
  }

  const thirdCards = () => {
    baccarat.determine3rdCard()
    setPlayerCards(baccarat.playerCards)
    setBankerCards(baccarat.bankerCards)
    setPlayerScore(baccarat.playerScore)
    setBankerScore(baccarat.bankerScore)
    setCardsLeft(baccarat.shoe.cardsLeft)
    setTimeout(() => {
      setWinner(baccarat.determineWinner())
    }, 1000)
  }

  const getImage = (card: Card): string => {
    return `./assets/cards/${card.toShort()}${card.suit.charAt(0)}.png`
  }


  

  
  return (
    <>
      <div className="App">
        
        <header className="App-header">
          <h1>Baccarat</h1>
        </header>

        <Scoreboard playerScore={playerScore} bankerScore={bankerScore} winner={winner} specialHand={specialHand}/>
        
        <div>
          {playerCards.map((card, index) => (
            <img key={index} src={getImage(card)} alt={`Player Card ${index + 1}`} />
          ))}
          <img src={image} alt="Player Card 1" />
          <p>Banker Cards: {bankerCards.toString()}</p>
          <p>Cards Left: {cardsLeft}</p>
        </div>
        
        <button onClick={dealHand}>Deal Hand</button>
        <button onClick={thirdCards}>Third Cards</button>
        <button onClick={newHand}>New Hand</button>

      </div>
      <img className='background-image' src={tableImage} alt="Baccarat Table" />

    </>
  )
}

export default App
