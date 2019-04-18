import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Toaster from './lib/components/Toaster';
import context from './context';
import './App.css';

ReactDOM.render(
  <Toaster context={context}>
    <App />
  </Toaster>,
  document.getElementById('root')
);
