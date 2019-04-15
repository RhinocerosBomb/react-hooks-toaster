import React from 'react';
import { customRender, Consumer, act, cleanup } from 'test-utils';
import 'jest-dom/extend-expect';

const getChildrenCount = htmlElem => htmlElem.childElementCount;
const getToastCountOfToasters = container =>
  [...container.children].map(toast => getChildrenCount(toast));

describe('Toaster Component', () => {
  describe('Toaster Unit Tests', () => {
    afterEach(cleanup);

    it('Should render children', () => {
      const { getByText } = customRender(<Consumer>test</Consumer>);
      expect(getByText('test')).toBeInTheDocument();
    });
  });

  describe('Render Single Toaster & Single Toast', () => {
    beforeAll(jest.useFakeTimers);

    let { container, queryByText } = NaN;
    beforeAll(() => {
      ({ container, queryByText } = customRender(
        <Consumer run={[{ content: 'toast is here' }]} />
      ));
    });

    afterAll(cleanup);

    it('Should render Toaster and Toast', () => {
      expect(getChildrenCount(container)).toBe(1);
      expect(getChildrenCount(container.firstChild)).toBe(1);
      expect(container.firstChild.firstChild).toHaveClass('_toast');
      expect(queryByText('toast is here')).toBeInTheDocument();
    });

    it('Should destroy Toaster when last Toast expires', () => {
      act(() => jest.advanceTimersByTime(5000));

      expect(getChildrenCount(container)).toBe(0);
    });
  });

  describe('Render Single Toaster & Multiple Toasts', () => {
    beforeAll(jest.useFakeTimers);

    let { container, queryByText } = NaN;
    beforeAll(() => {
      ({ container, queryByText } = customRender(
        <Consumer
          run={[
            { content: 'toast 1', options: { duration: 1000 } },
            { content: 'toast 2', options: { duration: 1000 } },
            { content: 'toast 3', options: { duration: 5000 } },
            { content: 'toast 4', options: { duration: 5000 } }
          ]}
        />
      ));
    });

    afterAll(cleanup);

    it('Should create multiple toasts correctly', () => {
      expect(getChildrenCount(container)).toBe(1);
      expect(getChildrenCount(container.firstChild)).toBe(4);
    });

    it('Should destroy some toasts without destroying toaster', () => {
      act(() => jest.advanceTimersByTime(1000));
      expect(getChildrenCount(container)).toBe(1);
      expect(getToastCountOfToasters(container)).toEqual([2]);
      expect(queryByText('toast 1')).not.toBeInTheDocument;
      expect(queryByText('toast 2')).not.toBeInTheDocument;
    });

    it('Should destroy remaining toasts and container', () => {
      act(() => jest.advanceTimersByTime(4000));

      expect(getChildrenCount(container)).toBe(0);
    });
  });

  describe('Render Multiple Toasters and Toasts', () => {
    beforeAll(jest.useFakeTimers);

    let { container, queryByText } = NaN;
    // prettier-ignore
    beforeAll(() => {
      ({ container, queryByText } = customRender(
        <Consumer
          run={[
            { content: 'toaster 1 toast 1', options: { duration: 1000, position: 'top-left' } },
            { content: 'toaster 2 toast 1', options: { duration: 5000, position: 'top-right' } },
            { content: 'toaster 3 toast 1', options: { duration: 1000, position: 'top-center' } },
            { content: 'toaster 3 toast 2', options: { duration: 5000, position: 'top-center' } }
          ]}
        />
      ));
    });

    afterAll(cleanup);

    it('Should create multiple toasters and multiple toasts', () => {
      expect(getChildrenCount(container)).toBe(3);
      expect(getToastCountOfToasters(container)).toEqual([1, 1, 2]);
    });

    it('Should destroy some toasters and some toasts', () => {
      act(() => jest.advanceTimersByTime(1000));

      expect(getChildrenCount(container)).toBe(2);
      expect(getToastCountOfToasters(container)).toEqual([1, 1]);
      expect(queryByText('toaster 1 toast 1')).not.toBeInTheDocument;
      expect(queryByText('toaster 3 toast 1')).not.toBeInTheDocument;
    });

    it('Should destroy remaining toasters and toasts', () => {
      act(() => jest.advanceTimersByTime(4000));

      expect(getChildrenCount(container)).toBe(0);
    });
  });
});
