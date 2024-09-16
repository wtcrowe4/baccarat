import Baccarat from "../../game-logic/baccarat";

interface DerivedRoadProps {
    results: Baccarat["history"];
}

const DerivedRoads: React.FC<DerivedRoadProps> = ({ results }) => {
    return (
        
        <div className='derived-roads'>
            {results.map((result, index) => (
                <div key={index} className='result'>
                    {JSON.stringify(result)}
                </div>
            ))}
              
                        
            
        </div>            
            
         
    )};

//Big Eye Boy



//Small Road



//Cockroach Pig

export default DerivedRoads;