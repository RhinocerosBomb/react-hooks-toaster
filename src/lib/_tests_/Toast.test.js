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
    expect(onExited).toHaveBeenCalledTimes(1);
  });

  it('Should not setTimeout when duration is false', () => {
    render(<Toast content="" duration={false} />);
    expect(setTimeout).toHaveBeenCalledTimes(1);
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
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(clearTimeout).toHaveBeenCalledTimes(1);
    expect(onExited).toHaveBeenCalledTimes(1);
  });

  it('Should not call clickToClose when onClick is provided', () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <Toast content="clickable" onClick={onClick} clickOnClose={true} />
    );
    fireEvent.click(getByText('clickable'));
    expect(clearTimeout).not.toHaveBeenCalled();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('Should not call onExited when clickToClose is false and Toast is clicked on', () => {
    const onExited = jest.fn();
    const { container, getByText } = render(
      <Toast
        triggerIn={true}
        content="not clickable"
        onExited={onExited}
        clickToClose={false}
      />
    );
    expect(container.firstChild).not.toHaveClass('_toastClickable');
    expect(onExited).not.toHaveBeenCalled();
    fireEvent.click(getByText('not clickable'));
    //Before timer ends (5000ms)
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(clearTimeout).toHaveBeenCalledTimes(0);
    expect(onExited).toHaveBeenCalledTimes(0);
  });

  it('Should have a close Button when closeButton prop is set to true', () => {
    const onExited = jest.fn();
    const { container } = render(
      <Toast content="" onExited={onExited} closeButton={true} />
    );
    fireEvent.click(container.firstChild.lastChild);

    expect(clearTimeout).toHaveBeenCalledTimes(1);
    expect(onExited).toHaveBeenCalledTimes(1);
  });

  it('Should support custom classNames', () => {
    const { container } = render(
      <Toast
        content="custom classNames"
        classNames="custom custom2"
        type="custom"
      />
    );
    expect(container.firstChild).toHaveClass('_blank custom custom2');
  });
});
