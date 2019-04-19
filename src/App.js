import React, { useState } from 'react';
import StageOne from './stages/StageOne';
import StageTwo from './stages/StageTwo';

const stages = ['Basics', 'Context'];
const App = () => {
  const [stage, setStage] = useState(0);
  return (
    <div className="App">
      <div className="header">
        <h1>{stages[stage]}</h1>
      </div>
      {stage === 0 && <StageOne />}
      {stage === 1 && <StageTwo />}
      <div className="prevNext">
        {stage > 0 && <span onClick={() => setStage(stage - 1)}>Previous</span>}
        {stage < 1 && <span onClick={() => setStage(stage + 1)}>Next</span>}
      </div>
    </div>
  );
};

export default App;
