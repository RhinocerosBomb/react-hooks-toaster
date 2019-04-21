import React, { useState, useMemo, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import cx from 'classnames/bind';

import '../styles/Toast.css';
import transitionCreate from '../transitions/transitionCreator';
import { TYPE, POSITION, TRANSITION_TYPE } from '../constants';

const Toast = props => {
  const {
    id,
    classNames,
    content,
    clickToClose,
    closeButton,
    customTransitions,
    triggerIn,
    duration,
    position,
    type,
    transition,
    onClick,
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

  const handleClickToClose = () => {
    if (clickToClose || !transitionIn) {
      clearTimeout(timeout);
      setIn(false);
    }
  };

  let className = cx(classNames, { _toastClickable: clickToClose });
  if (type === TYPE.CUSTOM) {
    className = cx('_blank', className);
  } else {
    className = cx(type, '_toast', className);
  }

  const styles = useMemo(
    () =>
      transitionCreate(
        transition.type,
        transition.durations,
        position,
        typeof position === 'object'
      ),
    [transition, type]
  );

  return (
    <CSSTransition
      in={transitionIn}
      classNames={type === TYPE.CUSTOM && customTransitions}
      appear
      timeout={transition.durations}
      {...options}
    >
      {state => (
        <li
          role="alert"
          className={className}
          style={styles[state]}
          onClick={onClick ? () => onClick(id) : handleClickToClose}
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
  id: PropTypes.string,
  classNames: PropTypes.string,
  content: PropTypes.node.isRequired,
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

Toast.defaultProps = {
  classNames: '',
  type: TYPE.DEFAULT,
  position: POSITION.BOTTOM_RIGHT,
  duration: 5000,
  clickToClose: true,
  closeButton: true,
  customTransitions: {},
  triggerIn: true,
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
