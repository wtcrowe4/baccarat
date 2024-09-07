import './BigRoad.css'; // Make sure to create and style this CSS file

interface BigRoadProps {
    results: string[]; // Array of results, e.g., ['B', 'P', 'T', ...]
}

const BigRoad: React.FC<BigRoadProps> = ({ results }) => {
    const renderCell = (result: string, index: number) => {
        let className = '';
        switch (result) {
            case 'B':
                className = 'banker';
                break;
            case 'P':
                className = 'player';
                break;
            case 'T':
                className = 'tie';
                break;
            default:
                className = '';
        }
        return <div key={index} className={`cell ${className}`}>{result}</div>;
    };

    return (
        <div className="big-road">
            {results.map((result, index) => renderCell(result, index))}
        </div>
    );
};

export default BigRoad;