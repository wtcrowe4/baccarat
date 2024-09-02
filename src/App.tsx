import { useState, useEffect } from 'react'
import { Card } from './game-logic/shoe.ts'
import Baccarat from './game-logic/baccarat.ts'
import './App.css'

function App() {
  const [playerCards, setPlayerCards] = useState<Card[]>([])
  const [bankerCards, setBankerCards] = useState<Card[]>([])
  const [playerScore, setPlayerScore] = useState<number>(0)
  const [bankerScore, setBankerScore] = useState<number>(0)
  const [baccarat, setBaccarat] = useState<Baccarat>(new Baccarat()) 
  const [cardsLeft, setCardsLeft] = useState<number>(baccarat.cardsLeftinShoe)


  useEffect(() => {
    console.log(cardsLeft)
    
  }, [cardsLeft])
  


  
  const newHand = () => {
    baccarat.newHand()
    //update the dom
    setPlayerCards(baccarat.playerCards)
    setBankerCards(baccarat.bankerCards)
    setPlayerScore(baccarat.playerScore)
    setBankerScore(baccarat.bankerScore)
    setCardsLeft(baccarat.shoe.cardsLeft)
  }

  const dealHand = () => {
    baccarat.newHand()
    baccarat.deal()

    setPlayerCards(baccarat.playerCards)
    setBankerCards(baccarat.bankerCards)
    
    setCardsLeft(baccarat.shoe.cardsLeft)
    console.log(cardsLeft)
    
    baccarat.calculateScore()
    setPlayerScore(baccarat.playerScore)
    setBankerScore(baccarat.bankerScore)
    console.log(baccarat.playerScore)
    console.log(baccarat.bankerScore)

  }


  
   


  
  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>Baccarat</h1>
        </header>
        <div>
          <p>Player Cards: {playerCards.toString()}   Score: {playerScore}</p>
          <p>Banker Cards: {bankerCards.toString()}   Score: {bankerScore}</p>
        </div>
        <button onClick={dealHand}>Deal Hand</button>
        <button onClick={newHand}>New Hand</button>
      </div>
      
    </>
  )
}

export default App
