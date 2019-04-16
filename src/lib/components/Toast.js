import React, { useState, useMemo, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import '../styles/Toast.css';
import transitionCreate from '../transitions/transitionCreator';
import { TYPE, POSITION, TRANSITION_TYPE } from '../constants';

const Toast = props => {
  const {
    content,
    clickToClose,
    closeButton,
    triggerIn,
    duration,
    position,
    type,
    transition,
    ...options
  } = props;

  const [transitionIn, setIn] = useState(triggerIn);

  useEffect(() => {
    setIn(triggerIn);
  }, [triggerIn]);

  let timeout;

  if (transitionIn && duration) {
    setTimeout(() => {
      setIn(false);
    }, duration);
  }

  const handleClick = () => {
    if (clickToClose || !transitionIn) {
      clearTimeout(timeout);
      setIn(false);
    }
  };

  let className = classNames('_toast', { _toastClickable: clickToClose });
  if (!type) {
    className = 'default';
  } else if (type === TYPE.CUSTOM) {
    // TODO
    className = 'default';
  } else {
    className = classNames(className, type);
  }

  const styles = useMemo(
    () => transitionCreate(transition.type, transition.durations, position),
    [transition, type]
  );

  return (
    <CSSTransition
      in={transitionIn}
      appear
      timeout={transition.durations}
      {...options}
    >
      {state => (
        <li
          role="alert"
          className={className}
          style={styles[state]}
          onClick={handleClick}
        >
          {content}
          {closeButton && (
            <span className="_closeButton" onClick={() => setIn(false)}>
              &#10006;
            </span>
          )}
        </li>
      )}
    </CSSTransition>
  );
};

Toast.propTypes = {
  content: PropTypes.node.isRequired,
  type: PropTypes.oneOf([
    TYPE.DEFAULT,
    TYPE.INFO,
    TYPE.SUCCESS,
    TYPE.WARNING,
    TYPE.ERROR
  ]),
  position: PropTypes.oneOf([
    POSITION.BOTTOM_LEFT,
    POSITION.BOTTOM_RIGHT,
    POSITION.BOTTOM_CENTER,
    POSITION.TOP_LEFT,
    POSITION.TOP_RIGHT,
    POSITION.TOP_CENTER
  ]),
  duration: (props, propName, componentName) => {
    if (isNaN(props[propName]) && props[propName] !== false) {
      // prettier-ignore
      return new Error(
        'Invalid prop `' + propName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  },
  clickToClose: PropTypes.bool,
  closeButton: PropTypes.bool,
  triggerIn: PropTypes.bool.isRequired,
  transition: PropTypes.shape({
    type: PropTypes.oneOf([TRANSITION_TYPE.SLIDE, TRANSITION_TYPE.CUSTOM]),
    duration: PropTypes.shape({
      appear: PropTypes.number,
      enter: PropTypes.number,
      exit: PropTypes.number
    })
  })
};

Toast.defaultProps = {
  type: TYPE.DEFAULT,
  position: POSITION.BOTTOM_RIGHT,
  duration: 5000,
  clickToClose: true,
  closeButton: true,
  transition: {
    type: TRANSITION_TYPE.SLIDE,
    durations: {
      appear: 0,
      enter: 400,
      exit: 400
    }
  }
};

export default Toast;
