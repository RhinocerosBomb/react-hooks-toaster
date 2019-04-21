import transitionCreator from '../transitions/transitionCreator';

describe('Transition Creator', () => {
  const durations = { enter: 400, exit: 500 };
  it('Should create Slide transition correctly', () => {
    expect(transitionCreator('slide', durations, 'bottom-left', false)).toEqual(
      {
        entering: { left: 'calc(-100% - 1em)' },
        entered: { left: 0, transition: 'left 400ms linear' },
        exiting: { left: 'calc(-100% - 1em)', transition: 'left 500ms linear' }
      }
    );

    expect(transitionCreator('slide', durations, 'top-right', false)).toEqual({
      entering: { right: 'calc(-100% - 1em)' },
      entered: { right: 0, transition: 'right 400ms linear' },
      exiting: { right: 'calc(-100% - 1em)', transition: 'right 500ms linear' }
    });

    expect(transitionCreator('slide', durations, 'top-center', false)).toEqual({
      entering: { top: 'calc(-100% - 1em)' },
      entered: { top: 0, transition: 'top 400ms linear' },
      exiting: { top: 'calc(-100% - 1em)', transition: 'top 500ms linear' }
    });

    expect(
      transitionCreator('slide', durations, 'bottom-center', false)
    ).toEqual({
      entering: { bottom: 'calc(-100% - 1em)' },
      entered: { bottom: 0, transition: 'bottom 400ms linear' },
      exiting: {
        bottom: 'calc(-100% - 1em)',
        transition: 'bottom 500ms linear'
      }
    });
  });

  it('Should create Fade transition correctly', () => {
    expect(transitionCreator('fade', durations, 'bottom-right', false)).toEqual(
      {
        entering: { opacity: 0 },
        entered: { opacity: 1, transition: 'opacity 400ms linear' },
        exiting: { opacity: 0, transition: 'opacity 500ms linear' }
      }
    );
  });

  it('Should create Unfold transition correctly', () => {
    expect(
      transitionCreator('unfold', durations, 'bottom-right', false)
    ).toEqual({
      entering: { opacity: 0, transform: 'rotateY(-180deg)' },
      entered: {
        opacity: 1,
        transform: 'rotateY(0deg)',
        transition: 'all 400ms linear'
      },
      exiting: {
        opacity: 0,
        transform: 'rotateY(-180deg)',
        transition: 'all 500ms linear'
      }
    });
  });

  it('Should create Zoom transition correctly', () => {
    expect(transitionCreator('zoom', durations, 'bottom-right', false)).toEqual(
      {
        entering: { transform: 'scale(0)' },
        entered: { transform: 'scale(1)', transition: 'all 400ms linear' },
        exiting: { transform: 'scale(0)', transition: 'all 500ms linear' }
      }
    );
  });
});
