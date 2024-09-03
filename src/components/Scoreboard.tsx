


type ScoreboardProps = {
    playerScore: number;
    bankerScore: number;
    winner: string;
};

const Scoreboard: React.FC<ScoreboardProps> = ({ playerScore, bankerScore, winner }) => {
    return (
        <div className="scoreboard">
            <h2>Scoreboard</h2>
            <p>Player Score: {playerScore}</p>
            <p>Banker Score: {bankerScore}</p>
            {winner === 'Player' || winner === 'Banker' ? <p>Winner: {winner}</p> : null}
            {winner === 'Tie' ? <p>Hand is a Tie</p> : null}
        </div>
    );
};

export default Scoreboard;