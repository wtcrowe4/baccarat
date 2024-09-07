

interface DerivedRoadProps {
    results: string[];
}

const DerivedRoads: React.FC<DerivedRoadProps> = ({ results }) => {
    return (
        
        <div className='derived-roads'>
            {results.map((result, index) => {
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
            })}
        </div>            
            
         
    )};

//Big Eye Boy



//Small Road



//Cockroach Pig

export default DerivedRoads;