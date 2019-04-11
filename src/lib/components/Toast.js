import React, { useState, useMemo } from 'react';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames/bind';

import '../styles/Toast.css';
import transitionCreate from '../transitions/transitionCreator';
import { TYPE } from '../constants';

const Toast = props => {
  const {
    content,
    removeToast,
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

export default React.memo(Toast);
