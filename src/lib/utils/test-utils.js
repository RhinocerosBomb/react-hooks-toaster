import React, { useContext, useState, useEffect } from 'react';
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

const Consumer = ({ children, run = [], use, errorHandler }) => {
  const [toastIds, setToastIds] = useState([]);
  const buildToast = useContext(context);
  useEffect(() => {
    const toastIdList = [];
    run.forEach(data => {
      try {
        toastIdList.push(buildToast(data.content, data.options));
      } catch (e) {
        errorHandler(e);
      }
    });
    setToastIds(toastIdList);
  }, [run]);

  useEffect(() => {
    if (use) {
      switch (use.type) {
        case 'dismiss':
          buildToast.dismiss(toastIds[use.data]);
          break;
        case 'dismissAll':
          buildToast.dismissAll();
          break;
        case 'update':
          buildToast.update(toastIds[use.data.index], use.data.update);
          break;
        case 'updateSome': {
          const updateList = use.data.map(update => ({
            ...update,
            id: toastIds[update.id]
          }));
          buildToast.updateSome(updateList);
          break;
        }
        case 'updateAll':
          buildToast.updateAll(use.data);
          break;
        default:
      }
    }
  }, [use]);
  return children ? children : null;
};

// re-export everything
export * from 'react-testing-library';

export { customRender, Consumer };
