import React, { useReducer, useCallback } from 'react';
import uuidv4 from 'uuid/v4';
import classNames from 'classnames/bind';

import Toast from './Toast';
import '../styles/Toaster.css';
import ToastContext from '../context';
import {
  ADD_TOAST,
  REMOVE_TOAST,
  TYPE,
  POSITION,
  TRANSITION_TYPE
} from '../constants';

const ToastReducer = (state, action) => {
  let newState = state;

  switch (action.type) {
    case ADD_TOAST: {
      let addContainer = false;
      let containerFound = false;
      newState = state.map((toastContainer, i) => {
        if (toastContainer.position === action.payload.position) {
          containerFound = true;
          return Object.assign(
            { ...toastContainer },
            { toasts: [...newState[i].toasts, action.payload] }
          );
        }
        if (i === state.length - 1 && !containerFound) {
          addContainer = true;
        }
        return toastContainer;
      });

      if (addContainer || state.length === 0) {
        return [
          ...state,
          {
            id: uuidv4(),
            position: action.payload.position,
            toasts: [action.payload]
          }
        ];
      }
      return newState;
    }
    case REMOVE_TOAST: {
      let removeContainer = false;
      newState = state.map(toastContainer => {
        if (toastContainer.position === action.payload.position) {
          if (toastContainer.toasts.length === 1) {
            removeContainer = toastContainer;
          } else {
            return Object.assign(
              { ...toastContainer },
              {
                toasts: toastContainer.toasts.filter(
                  item => item !== action.payload
                )
              }
            );
          }
        }
        return toastContainer;
      });

      if (removeContainer) {
        newState = state.filter(
          toastContainer => toastContainer !== removeContainer
        );
      }

      return newState;
    }
    default:
      throw new Error();
  }
};

const Toaster = props => {
  const { children } = props;

  const [toastContainerList, dispatch] = useReducer(ToastReducer, []);
  const removeToast = toast => {
    dispatch({ type: REMOVE_TOAST, payload: toast });
  };

  const buildToast = useCallback((content = uuidv4(), ...options) => {
    const defaultToast = {
      id: uuidv4(),
      content: 'Nothing to say...',
      type: TYPE.DEFAULT,
      position: POSITION.BOTTOM_RIGHT,
      duration: 5000,
      clickToClose: true,
      transition: {
        type: TRANSITION_TYPE.SLIDE,
        durations: {
          appear: 0,
          enter: 400,
          exit: 400
        }
      }
    };

    const newToast = Object.assign(defaultToast, { content }, ...options);

    dispatch({ type: ADD_TOAST, payload: newToast });

    return newToast.id;
  }, []);

  const buildToastRender = toastList =>
    toastList.map(toast => (
      <Toast key={toast.id} onExited={() => removeToast(toast)} {...toast} />
    ));

  const buildRender = () =>
    toastContainerList.map(toastContainer => (
      <ul
        key={toastContainer.id}
        className={classNames('_toaster', toastContainer.position)}
      >
        {buildToastRender(toastContainer.toasts)}
      </ul>
    ));

  return (
    <ToastContext.Provider value={buildToast}>
      <React.Fragment>
        {children}
        {buildRender()}
      </React.Fragment>
    </ToastContext.Provider>
  );
};

export default React.memo(Toaster);
