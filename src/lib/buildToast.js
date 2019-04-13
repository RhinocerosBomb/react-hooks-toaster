import uuidv4 from 'uuid/v4';
import PropTypes from 'prop-types';

import { ADD_TOAST, POSITION, TRANSITION_TYPE, TYPE } from './constants';

const defaultToast = {
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

function buildToast(content, options) {
  const newToast = {
    ...defaultToast,
    ...{ id: uuidv4(), content },
    ...options
  };

  this.dispatch({ type: ADD_TOAST, payload: newToast });

  return newToast.id;
}

buildToast.propTypes = {
  content: PropTypes.node.isRequired,
  options: PropTypes.shape({
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
  })
};

export default buildToast;
