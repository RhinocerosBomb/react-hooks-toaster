import React, { useReducer, useCallback } from 'react';
import uuidv4 from 'uuid/v4';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import Toast from './Toast';
import ToastReducer from '../ToasterReducer';
import {
  ADD_TOAST,
  REMOVE_TOAST,
  UPDATE_ALL,
  TYPE,
  POSITION,
  TRANSITION_TYPE,
  UPDATE_TOAST,
  UPDATE_SOME
} from '../constants';
import '../styles/Toaster.css';

const Toaster = ({ children, context, ...defaultToastOptions }) => {
  const ToasterContext = context;
  const [toastContainerList, dispatch] = useReducer(ToastReducer, []);

  const buildToast = (content, options = {}) => {
    const newToast = {
      ...{ id: uuidv4(), content },
      ...defaultToastOptions,
      ...options
    };

    if (!newToast.position) {
      newToast.position = POSITION.BOTTOM_RIGHT;
    } else if (
      !Object.values(POSITION).includes(newToast.position) &&
      typeof newToast.position !== 'object'
    ) {
      throw new TypeError('Position Property Is Invalid!');
    }

    dispatch({ type: ADD_TOAST, payload: newToast });

    return newToast.id;
  };

  buildToast.TYPE = TYPE;
  buildToast.POSITION = POSITION;
  buildToast.TRANSITION_TYPE = TRANSITION_TYPE;
  buildToast.update = (id, updates) => updateToast(id, updates);
  buildToast.updateAll = updates => updateAll(updates);
  buildToast.dismiss = id => dissmiss(id);
  buildToast.dismissAll = () => dissmissAll();
  buildToast.updateSome = updateList => updateSome(updateList);
  const removeToast = toast => {
    dispatch({ type: REMOVE_TOAST, payload: toast });
  };

  const dissmiss = toastId => {
    updateToast(toastId, { triggerIn: false });
  };

  const dissmissAll = () => updateAll({ triggerIn: false });

  const updateAll = updates => {
    dispatch({ type: UPDATE_ALL, payload: updates });
  };

  const updateToast = (id, updates) => {
    dispatch({ type: UPDATE_TOAST, payload: { id, ...updates } });
  };

  const updateSome = updateList => {
    dispatch({ type: UPDATE_SOME, payload: updateList });
  };

  const renderToasts = toastList =>
    toastList.map(toast => (
      <Toast key={toast.id} onExited={() => removeToast(toast)} {...toast} />
    ));

  const renderContainers = () =>
    toastContainerList.map(toastContainer => {
      if (typeof toastContainer.position === 'object') {
        return (
          <ul
            key={toastContainer.id}
            className="_toaster"
            style={toastContainer.position}
          >
            {renderToasts(toastContainer.toasts)}
          </ul>
        );
      }

      return (
        <ul
          key={toastContainer.id}
          className={classNames('_toaster', toastContainer.position)}
        >
          {renderToasts(toastContainer.toasts)}
        </ul>
      );
    });

  return (
    <ToasterContext.Provider value={useCallback(buildToast, [])}>
      <React.Fragment>
        {children}
        {renderContainers()}
      </React.Fragment>
    </ToasterContext.Provider>
  );
};

Toaster.propTypes = {
  children: PropTypes.node,
  context: PropTypes.object.isRequired,
  classNames: PropTypes.string,
  customTransitions: PropTypes.object,
  type: PropTypes.oneOf([
    TYPE.DEFAULT,
    TYPE.INFO,
    TYPE.SUCCESS,
    TYPE.WARNING,
    TYPE.ERROR,
    TYPE.CUSTOM
  ]),
  position: PropTypes.oneOfType([
    PropTypes.oneOf([
      POSITION.TOP_LEFT,
      POSITION.TOP_RIGHT,
      POSITION.TOP_CENTER,
      POSITION.BOTTOM_LEFT,
      POSITION.BOTTOM_RIGHT,
      POSITION.BOTTOM_CENTER
    ]),
    PropTypes.shape({
      top: PropTypes.string,
      bottom: PropTypes.string,
      left: PropTypes.string,
      right: PropTypes.string
    })
  ]),
  duration: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([false])]),
  clickToClose: PropTypes.bool,
  onClick: PropTypes.func,
  closeButton: PropTypes.bool,
  triggerIn: PropTypes.bool,
  transition: PropTypes.shape({
    type: PropTypes.oneOf([
      TRANSITION_TYPE.SLIDE,
      TRANSITION_TYPE.FADE,
      TRANSITION_TYPE.UNFOLD,
      TRANSITION_TYPE.ZOOM,
      TRANSITION_TYPE.CUSTOM
    ]),
    durations: PropTypes.shape({
      appear: PropTypes.number,
      enter: PropTypes.number,
      exit: PropTypes.number
    })
  })
};

export default React.memo(Toaster);
