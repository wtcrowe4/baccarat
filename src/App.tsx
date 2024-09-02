import { useState, useEffect } from 'react'
import { Card, Shoe, Baccarat } from './game-logic'
import './App.css'

function App() {
  const [playerCards, setPlayerCards] = useState<Card[]>([])
  const [bankerCards, setBankerCards] = useState<Card[]>([])

  useEffect(() => {
    const baccarat = new Baccarat()
    baccarat.deal()
    setPlayerCards(baccarat.playerCards.toString())
    setBankerCards(baccarat.bankerCards.toString())
  
  
  }, [])
   

  
  
  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>Baccarat</h1>
          <p>Player Cards: {playerCards}</p>
          <p>Banker Cards: {bankerCards}</p>
        </header>
      </div>
      
    </>
  )
}

export default App
