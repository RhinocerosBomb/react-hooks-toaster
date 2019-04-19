import uuidv4 from 'uuid/v4';

import {
  ADD_TOAST,
  REMOVE_TOAST,
  UPDATE_ALL,
  UPDATE_TOAST,
  UPDATE_SOME
} from './constants';

export default (state, action) => {
  let newState = state;

  switch (action.type) {
    case ADD_TOAST: {
      let addContainer = false;
      let containerFound = false;
      newState = state.map((toastContainer, i) => {
        if (toastContainer.position === action.payload.position) {
          containerFound = true;
          return Object.assign(
            { ...toastContainer },
            { toasts: [...newState[i].toasts, action.payload] }
          );
        }
        if (i === state.length - 1 && !containerFound) {
          addContainer = true;
        }
        return toastContainer;
      });

      if (addContainer || state.length === 0) {
        return [
          ...state,
          {
            id: uuidv4(),
            position: action.payload.position,
            toasts: [action.payload]
          }
        ];
      }
      return newState;
    }
    case REMOVE_TOAST: {
      let removeContainer = false;
      newState = state.map(toastContainer => {
        if (toastContainer.position === action.payload.position) {
          const newToastList = toastContainer.toasts.filter(toast => {
            if (toast.id === action.payload.id) {
              if (toastContainer.toasts.length === 1)
                removeContainer = toastContainer;
              return false;
            }
            return true;
          });
          return { ...toastContainer, ...{ toasts: newToastList } };
        }
        return toastContainer;
      });

      if (removeContainer) {
        newState = state.filter(
          toastContainer => toastContainer !== removeContainer
        );
      }

      return newState;
    }
    case UPDATE_TOAST:
      return state.map(toastContainer => ({
        ...toastContainer,
        ...{
          toasts: toastContainer.toasts.map(toast => {
            if (toast.id === action.payload.id)
              return { ...toast, ...action.payload };
            return toast;
          })
        }
      }));
    case UPDATE_SOME:
      newState = state.map(toastContainer => ({
        ...toastContainer,
        ...{
          toasts: toastContainer.toasts.map(toast => {
            let updatedToast = toast;
            action.payload.forEach(updateData => {
              if (updateData.id === toast.id) {
                updatedToast = { ...updatedToast, ...updateData };
              }
            });
            return updatedToast;
          })
        }
      }));
      return newState;
    case UPDATE_ALL:
      return state.map(toastContainer => ({
        ...toastContainer,
        ...{
          toasts: toastContainer.toasts.map(toast => {
            return { ...toast, ...action.payload };
          })
        }
      }));
    default:
      throw new Error();
  }
};
