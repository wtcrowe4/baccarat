import { useState } from 'react'
import { Card } from './game-logic/shoe.ts'
import Baccarat from './game-logic/baccarat.ts'
import './App.css'
import Scoreboard from './components/Scoreboard.tsx'
//import BeadRoad from './components/scoreboard/BeadRoad.tsx'
//import BigRoad from './components/scoreboard/BigRoad.tsx'
//import DerivedRoads from './components/scoreboard/DerivedRoads.tsx'
//import { getImageURL } from './utils/image-util.ts'

//Dynamic import for card images
const importCardImage = async (card: Card) => {
  if (!card) return null;
  const module = await import(/* @vite-ignore */ card.toImageString());
  console.log(module.default);
  return module.default;
};




function App() {
  const [baccarat, setBaccarat] = useState<Baccarat>(new Baccarat()) 
  const [playerCards, setPlayerCards] = useState<Card[]>([])
  const [bankerCards, setBankerCards] = useState<Card[]>([])
  const [playerScore, setPlayerScore] = useState<number>(0)
  const [bankerScore, setBankerScore] = useState<number>(0)
  const [winner, setWinner] = useState<string | null>(null)
  const [specialHand, setSpecialHand] = useState<string | null>(null)
  const [cardsLeft, setCardsLeft] = useState<number>(baccarat.cardsLeftinShoe)
  const [gameHistory, setGameHistory] = useState<Baccarat["history"][]>([])
  const [playerCardImages, setPlayerCardImages] = useState<string[]>([]);
  const [bankerCardImages, setBankerCardImages] = useState<string[]>([]);

  

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
    setPlayerCardImages([])
    setBankerCardImages([])
  }

  const dealHand = async () => {
    baccarat.newHand()
    baccarat.deal()
    setPlayerCards(baccarat.playerCards)
    setBankerCards(baccarat.bankerCards)
    setCardsLeft(baccarat.shoe.cardsLeft)
    baccarat.calculateScore()
    setPlayerScore(baccarat.playerScore)
    setBankerScore(baccarat.bankerScore)
    
    const playerImages = await loadCardImages(baccarat.playerCards);
    const bankerImages = await loadCardImages(baccarat.bankerCards);
    setPlayerCardImages(playerImages);
    setBankerCardImages(bankerImages);

    setTimeout(() => {
      setSpecialHand(baccarat.specialHand)
      setWinner(baccarat.winner)
    }, 1000)

    baccarat.addHandToHistory()
    setGameHistory([baccarat.history])

    console.log(baccarat.history)
    console.log(gameHistory)


  }

  const thirdCards = async () => {
    baccarat.determine3rdCard()
    setPlayerCards(baccarat.playerCards)
    setBankerCards(baccarat.bankerCards)
    setPlayerScore(baccarat.playerScore)
    setBankerScore(baccarat.bankerScore)
    setCardsLeft(baccarat.shoe.cardsLeft)

    const playerImages = await loadCardImages(baccarat.playerCards);
    const bankerImages = await loadCardImages(baccarat.bankerCards);
    setPlayerCardImages(playerImages);
    setBankerCardImages(bankerImages);

    setTimeout(() => {
      setSpecialHand(baccarat.specialHand)
      setWinner(baccarat.determineWinner())
    }, 1000)

    baccarat.addHandToHistory()
    setGameHistory([baccarat.history])

    console.log(baccarat.history)
    console.log(gameHistory)

  }

  
  const loadCardImages = async (cards: Card[]) => {
    const images = await Promise.all(cards.map(card => importCardImage(card)));
    return images;
  };
  

  
  return (
    <>
      <div className="App">
        
        <header className="App-header">
          <h1>Baccarat</h1>
        </header>
        <div className='scoreboard-container'>
          <Scoreboard playerScore={playerScore} bankerScore={bankerScore} winner={winner} specialHand={specialHand} history={gameHistory} />
        </div>
        <div className='hands'>
          
          <div className='player-hand'>
            <h2>Player Hand</h2>
            {playerCardImages.map((image, index) => (
              <img className='card-image' src={image} alt={`Player card ${index + 1}`} />
            ))}
          </div>
          <div className='vertical-divider'></div>
          <div className='banker-hand'>
            <h2>Banker Hand</h2>
            {bankerCardImages.map((image, index) => (
              <img className='card-image' src={image} alt={`Banker card ${index + 1}`} />
            ))}
          </div>
          {/* <p>Player Cards: {playerCards.toString()}</p>
          <p>Banker Cards: {bankerCards.toString()}</p> */}
          
        </div>
        <p>Cards Left: {cardsLeft}</p>
        <button onClick={dealHand}>Deal Hand</button>
        <button onClick={thirdCards}>Third Cards</button>
        <button onClick={newHand}>New Hand</button>

      </div>
      
    </>
  )
}

export default App
