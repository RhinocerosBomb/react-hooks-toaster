import React, { useState, useMemo } from 'react';
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
    duration,
    position,
    type,
    transition,
    ...options
  } = props;

  const [triggerExit, setIn] = useState(true);

  let timeout;
  if (triggerExit && duration) {
    timeout = setTimeout(() => {
      setIn(false);
    }, duration);
  }

  const handleClick = () => {
    if (clickToClose) {
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
      in={triggerExit}
      appear
      timeout={transition.durations}
      {...options}
    >
      {state => (
        <li
          role="presentation"
          onKeyDown={() => {}}
          className={className}
          style={styles[state]}
          onClick={handleClick}
        >
          {content}
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
  duration: PropTypes.number,
  clickToClose: PropTypes.bool,
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
  transition: {
    type: TRANSITION_TYPE.SLIDE,
    durations: {
      appear: 0,
      enter: 400,
      exit: 400
    }
  }
};

export default React.memo(Toast);
