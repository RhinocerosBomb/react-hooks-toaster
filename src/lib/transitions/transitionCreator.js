import { TRANSITION_TYPE } from '../constants';

export default (type, durations, position, isCustomPosition) => {
  const styles = {
    entering: {},
    entered: {},
    exiting: {}
  };

  if (type === TRANSITION_TYPE.SLIDE) {
    if (!isCustomPosition) {
      const targetPosition = position.split('-');
      if (targetPosition[1] === 'left' || targetPosition[1] === 'right') {
        styles.entering[targetPosition[1]] = 'calc(-100% - 1em)';
        styles.entered[targetPosition[1]] = 0;
        styles.exiting[targetPosition[1]] = 'calc(-100% - 1em)';

        styles.entered.transition = `${targetPosition[1]} ${
          durations.enter
        }ms linear`;

        styles.exiting.transition = `${targetPosition[1]} ${
          durations.exit
        }ms linear`;
      } else {
        styles.entering[targetPosition[0]] = 'calc(-100% - 1em)';
        styles.entered[targetPosition[0]] = 0;
        styles.exiting[targetPosition[0]] = 'calc(-100% - 1em)';

        styles.entered.transition = `${targetPosition[0]} ${
          durations.enter
        }ms linear`;
        styles.exiting.transition = `${targetPosition[0]} ${
          durations.exit
        }ms linear`;
      }
    }
  } else if (type === TRANSITION_TYPE.FADE) {
    styles.entering.opacity = 0;
    styles.entered.opacity = 1;
    styles.exiting.opacity = 0;
    styles.entered.transition = `opacity ${durations.enter}ms linear`;
    styles.exiting.transition = `opacity ${durations.exit}ms linear`;
  } else if (type === TRANSITION_TYPE.UNFOLD) {
    styles.entering.opacity = 0;
    styles.entering.transform = 'rotateY(-180deg)';
    styles.entered.opacity = 1;
    styles.entered.transform = 'rotateY(0deg)';
    styles.exiting.opacity = 0;
    styles.exiting.transform = 'rotateY(-180deg)';
    styles.entered.transition = `all ${durations.enter}ms linear`;
    styles.exiting.transition = `all ${durations.exit}ms linear`;
  } else if (type === TRANSITION_TYPE.ZOOM) {
    styles.entering.transform = 'scale(0)';
    styles.entered.transform = 'scale(1)';
    styles.exiting.transform = 'scale(0)';
    styles.entered.transition = `all ${durations.enter}ms linear`;
    styles.exiting.transition = `all ${durations.exit}ms linear`;
  }

  return styles;
};
