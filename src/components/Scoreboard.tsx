
import Baccarat from "../game-logic/baccarat";
import BeadRoad from "./scoreboard/BeadRoad";
import BigRoad from "./scoreboard/BigRoad";
import DerivedRoads from "./scoreboard/DerivedRoads";


type ScoreboardProps = {
    playerScore: number;
    bankerScore: number;
    winner: string | null;
    specialHand: string | null;
    history: Baccarat["history"];
};

const Scoreboard: React.FC<ScoreboardProps> = ({ playerScore, bankerScore, winner, specialHand, history }) => {
    console.log('Scoreboard: ' + history)
    return (
        <div className="scoreboard">
            <h2>Scoreboard</h2>
            <p>Player Score: {playerScore}</p>
            <p>Banker Score: {bankerScore}</p>
            {winner === 'Player' || winner === 'Banker' ? <p>Winner: {winner}</p> : null}
            {winner === 'Tie' ? <p>Hand is a Tie</p> : null}
            {specialHand ? <p>Special Hand: {specialHand}</p> : null}

            <div className="scoreboard__road-container">
                {/* <BeadRoad results={history} />
                <BigRoad results={history} /> */}
                <DerivedRoads results={history} />
            </div>
        
        </div>

        
    );
};

export default Scoreboard;