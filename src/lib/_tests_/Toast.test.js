import React from 'react';
import { render, fireEvent, act, cleanup } from 'test-utils';
import 'jest-dom/extend-expect';

import Toast from '../components/Toast';

beforeEach(jest.useFakeTimers);
afterEach(cleanup);

describe('Toast Component', () => {
  it('should call onExited when duration is met', () => {
    const onExited = jest.fn();
    render(<Toast content="" onExited={onExited} duration={10000} />);
    act(() => {
      jest.advanceTimersByTime(10000);
    });
    expect(onExited).toHaveBeenCalled();
  });

  it('Should not setTimeout when duration is false', () => {
    render(<Toast content="" duration={false} />);
    expect(setTimeout).not.toHaveBeenCalled();
  });

  it('Should call onExited when clickToClose is true and Toast is clicked on', () => {
    const onExited = jest.fn();
    const { container, getByText } = render(
      <Toast content="clickable" onExited={onExited} clickOnClose={true} />
    );
    expect(container.firstChild).toHaveClass('_toastClickable');
    expect(onExited).not.toHaveBeenCalled();
    fireEvent.click(getByText('clickable'));
    //Before timer ends (5000ms)
    jest.advanceTimersByTime(3000);
    expect(clearTimeout).toHaveBeenCalled();
    expect(onExited).toHaveBeenCalled();
  });

  it('Should not call onExited when clickToClose is false and Toast is clicked on', () => {
    const onExited = jest.fn();
    const { container, getByText } = render(
      <Toast content="not clickable" onExited={onExited} clickToClose={false} />
    );
    expect(container.firstChild).not.toHaveClass('_toastClickable');
    expect(onExited).not.toHaveBeenCalled();
    fireEvent.click(getByText('not clickable'));
    //Before timer ends (5000ms)
    jest.advanceTimersByTime(3000);
    expect(clearTimeout).toHaveBeenCalledTimes(0);
    expect(onExited).toHaveBeenCalledTimes(0);
  });
});
