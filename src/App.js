import React from 'react';
import Toaster from './lib/components/Toaster';
import Peewee from './Peewee';
import context from './context';

const App = () => {
  return (
    <div className="App">
      <Toaster context={context}>
        <Peewee />
      </Toaster>
    </div>
  );
};

export default App;
