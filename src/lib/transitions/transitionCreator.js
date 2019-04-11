import { TRANSITION_TYPE } from '../constants';

export default (type, durations, position) => {
  const styles = {
    entering: {},
    entered: {},
    exiting: {},
    exited: {}
  };

  if (type === TRANSITION_TYPE.SLIDE) {
    const targetPosition = position.split('_');
    if (targetPosition[1] === 'left' || targetPosition[1] === 'right') {
      styles.entered.transition = `${targetPosition[1]} ${
        durations.enter
      }ms linear`;
      styles.entering[targetPosition[1]] = 'calc(-100% - 1em)';
      styles.entered[targetPosition[1]] = 0;
      styles.exiting.transition = `${targetPosition[1]} ${
        durations.exit
      }ms linear`;
      styles.exiting[targetPosition[1]] = 'calc(-100% - 1em)';
      styles.exited[targetPosition[1]] = 0;
    } else {
      styles.entered.transition = `${targetPosition[0]} ${
        durations.enter
      }ms linear`;
      styles.entering[targetPosition[0]] = 'calc(-100% - 1em)';
      styles.entered[targetPosition[0]] = 0;
      styles.exiting.transition = `${targetPosition[0]} ${
        durations.exit
      }ms linear`;
      styles.exiting[targetPosition[0]] = 'calc(-100% - 1em)';
      styles.exited[targetPosition[0]] = 0;
    }
  }
  return styles;
};
