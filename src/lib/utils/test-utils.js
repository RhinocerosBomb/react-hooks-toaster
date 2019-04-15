import React, { useContext } from 'react';
import { render } from 'react-testing-library';

import Toaster from '../components/Toaster';
import '../styles/Toaster.css';
const context = React.createContext();

/* eslint react/prop-types: 0 */
function Provider({ children }) {
  return <Toaster context={context}>{children}</Toaster>;
}

const customRender = (ui, options) =>
  render(ui, { wrapper: Provider, ...options });

const Consumer = ({ children, run = [] }) => {
  const buildToast = useContext(context);
  run.forEach(data => {
    buildToast(data.content, data.options);
  });
  return children ? children : null;
};

// re-export everything
export * from 'react-testing-library';

export { customRender, Consumer };
