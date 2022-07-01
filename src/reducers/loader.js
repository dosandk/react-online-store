// Actions
export const SHOW_LOADER = 'show-loader';
export const HIDE_LOADER = 'hide-loader';

// Action creators
export const showLoader = () => {
  return {
    type: SHOW_LOADER,
    payload: true
  };
};

export const hideLoader = () => {
  return {
    type: HIDE_LOADER,
    payload: false
  };
};

export const loader = {
  [SHOW_LOADER](previousState, payload) {
    return true;
  },
  [HIDE_LOADER](previousState, payload) {
    return false;
  }
};
