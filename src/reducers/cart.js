// Actions
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

// Action Creators
export const addToCart = payload => {
  return {
    type: ADD_TO_CART,
    payload,
  }
};

export const removeFromCart = payload => {
  return {
    type: REMOVE_FROM_CART,
    payload,
  }
}

export const cart = {
  [ADD_TO_CART] (previousState = [], payload) {
    return [...previousState, payload];
  },
  [REMOVE_FROM_CART] (previousState = [], payload) {
    return previousState.filter(product => product.id !== payload.id);
  },
}
