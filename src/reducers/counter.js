// Actions
export const INCREMENT = 'increment';
export const DECREMENT = 'decrement';

// Action Creators
export const increment = payload => {
  return {
    type: INCREMENT,
    payload
  }
}

export const decrement = payload => {
  return {
    type: DECREMENT,
    payload
  };
}

// Reducer
export const counter = {
  [INCREMENT](previousState, action) {
    return previousState + action.payload;
  },
  [DECREMENT](previousState, action) {
    return previousState - action.payload;
  }
};

