import React from 'react';
import Toaster from './lib/components/Toaster';
import TestingGrounds from './TestingGrounds';
import context from './context';

const App = () => {
  return (
    <div className="App">
      <Toaster context={context}>
        <TestingGrounds />
      </Toaster>
    </div>
  );
};

export default App;
