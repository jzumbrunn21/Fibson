// CONSTANTS
const READ_USER_CART = "cart/READ_USER_CART";
const ADD_TO_CART = "cart/ADD_TO_CART";
const UPDATE_CART = "cart/UPDATE_CART";
const REMOVE_FROM_CART = "cart/REMOVE_FROM_CART";

// Regular Action Creators

const readUserCart = (listings, user_id) => ({
  type: READ_USER_CART,
  listings,
});

const addToCart = (listing) => ({
  type: ADD_TO_CART,
  listing,
});

// THUNKS

export const readUserCartThunk = (user_id) => async (dispatch) => {
  const response = await fetch(`/api/cart/${user_id}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(readUserCart(data));
    return data;
  } else {
    return "Could not find your cart";
  }
};

// Initial State
const initialState = { cart: {} };

// REDUCER

export default function cartReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case READ_USER_CART:
      newState = { ...state };
      newState.cart = action.listings;
      return newState;

    default:
      return state;
  }
}
