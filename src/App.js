import React from 'react';
import Toaster from './lib/components/Toaster';
import Peewee from './Peewee';

const App = () => {
  return (
    <div className="App">
      <Toaster>
        <Peewee />
      </Toaster>
    </div>
  );
};

export default App;
