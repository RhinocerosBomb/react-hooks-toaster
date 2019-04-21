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

    it('Should expect custom positioning to work', () => {
      const { container } = customRender(
        <Consumer
          run={[
            {
              content: '',
              options: { position: { top: '20px', left: '40px' } }
            }
          ]}
        />
      );
      expect(container.firstChild).toHaveStyle('top: 20px, left: 40px');
    });

    it('Should throw TypeError if position is not valid', () => {
      //For some reason catching the error here will still log the error.
      //so instead catch it in consumer and return the message to confirm error
      let errorMessage;
      customRender(
        <Consumer
          run={[
            {
              content: '',
              options: { position: 10 }
            }
          ]}
          errorHandler={e => {
            errorMessage = e.message;
          }}
        />
      );

      expect(errorMessage).toBe('Position Property Is Invalid!');
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
      expect(queryByText('toast 1')).not.toBeInTheDocument();
      expect(queryByText('toast 2')).not.toBeInTheDocument();
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
      expect(queryByText('toaster 1 toast 1')).not.toBeInTheDocument();
      expect(queryByText('toaster 3 toast 1')).not.toBeInTheDocument();
    });

    it('Should destroy remaining toasters and toasts', () => {
      act(() => jest.advanceTimersByTime(4000));

      expect(getChildrenCount(container)).toBe(0);
    });
  });

  describe('Programmatical functions', () => {
    afterEach(cleanup);
    const updateData = {
      content: 'updated',
      clickToClose: false,
      closeButton: false,
      duration: 1000,
      type: 'warning',
      onClick: jest.fn()
    };

    it('Should programmatically dismiss toast', () => {
      const { container, rerender } = customRender(
        <Consumer run={[{ content: 'dismiss' }]} />
      );

      rerender(<Consumer use={{ type: 'dismiss', data: 0 }} />);
      expect(getChildrenCount(container)).toBe(0);
    });

    it('Should programmatically dismiss all toasts', () => {
      const { container, rerender } = customRender(
        <Consumer
          run={[
            { content: 'toaster 1 toast 1', options: { position: 'top-left' } },
            {
              content: 'toaster 2 toast 1',
              options: { position: 'top-right' }
            },
            {
              content: 'toaster 3 toast 1',
              options: { position: 'top-center' }
            },
            {
              content: 'toaster 3 toast 2',
              options: { position: 'top-center' }
            }
          ]}
        />
      );
      rerender(<Consumer use={{ type: 'dismissAll' }} />);
      expect(getChildrenCount(container)).toBe(0);
    });

    it('Should programmatically update a toast', () => {
      const { queryByText, rerender } = customRender(
        <Consumer run={[{ content: 'dont update' }, { content: 'update' }]} />
      );

      rerender(
        <Consumer
          use={{
            type: 'update',
            data: { index: 1, update: updateData }
          }}
        />
      );
      expect(queryByText('dont update')).toBeInTheDocument();
      expect(queryByText('update')).not.toBeInTheDocument();
      expect(queryByText('updated')).toBeInTheDocument();
    });

    it('Should programmatically update some of the toasts', () => {
      const updateList = [
        { id: 0, content: 'update1' },
        { id: 3, content: 'update2' }
      ];
      // prettier-ignore
      const { queryByText, rerender } = customRender(
        <Consumer
          run={[
            { content: 'toaster 1 toast 1', options: { position: 'top-left' } },
            { content: 'toaster 2 toast 1', options: { position: 'top-right' } },
            { content: 'toaster 3 toast 1', options: { position: 'top-center' } },
            { content: 'toaster 3 toast 2', options: { position: 'top-center' } }
          ]}
        />
      );

      rerender(
        <Consumer
          use={{
            type: 'updateSome',
            data: updateList
          }}
        />
      );
      expect(queryByText('toaster 1 toast 1')).not.toBeInTheDocument();
      expect(queryByText('toaster 2 toast 1')).toBeInTheDocument();
      expect(queryByText('toaster 3 toast 1')).toBeInTheDocument();
      expect(queryByText('toaster 3 toast 2')).not.toBeInTheDocument();
      expect(queryByText('update1')).toBeInTheDocument();
      expect(queryByText('update2')).toBeInTheDocument();
    });

    it('Should programmically update all toasts', () => {
      // prettier-ignore
      const { queryByText, queryAllByText,rerender } = customRender(
        <Consumer
          run={[
            { content: 'toaster 1 toast 1', options: { position: 'top-left' } },
            { content: 'toaster 2 toast 1', options: { position: 'top-right' } },
            { content: 'toaster 3 toast 1', options: { position: 'top-center' } },
            { content: 'toaster 3 toast 2', options: { position: 'top-center' } }
          ]}
        />
      );
      rerender(
        <Consumer
          use={{
            type: 'updateAll',
            data: { content: 'updated all' }
          }}
        />
      );

      expect(queryByText('toaster 1 toast 1')).not.toBeInTheDocument();
      expect(queryByText('toaster 2 toast 1')).not.toBeInTheDocument();
      expect(queryByText('toaster 3 toast 1')).not.toBeInTheDocument();
      expect(queryByText('toaster 3 toast 2')).not.toBeInTheDocument();
      expect(queryAllByText('updated all').length).toBe(4);
    });
  });
});
