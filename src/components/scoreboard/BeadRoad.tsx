import React, { useState } from 'react';

interface BeadRoadResult {
  result: 'B' | 'P' | 'T';
}

const BeadRoad: React.FC = () => {
  const [beadRoadResults, setBeadRoadResults] = useState<BeadRoadResult[]>([]);

  const updateBeadRoad = (result: BeadRoadResult) => {
    setBeadRoadResults((prevResults) => [...prevResults, result]);
  };

  const renderBeadRoad = () => {
    return beadRoadResults.map((result, index) => {
      const markerColor = result.result === 'B' ? 'blue' : result.result === 'P' ? 'red' : 'green';
      return (
        <div key={index} style={{ backgroundColor: markerColor, width: '20px', height: '20px', display: 'inline-block' }}></div>
      );
    });
  };

  return (
    <div>
      {renderBeadRoad()}
    </div>
  );
};

export default BeadRoad;