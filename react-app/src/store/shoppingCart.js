// CONSTANTS
const READ_USER_CART = "cart/READ_USER_CART";
const ADD_TO_CART = "cart/ADD_TO_CART";
const UPDATE_CART = "cart/UPDATE_CART";
const REMOVE_FROM_CART = "cart/REMOVE_FROM_CART";

// Regular Action Creators

const readUserCart = (listings) => ({
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
    // return data;
  } else {
    return "Could not find your cart";
  }
};

export const addToCartThunk =
  (listing, user_id, guitar_id) => async (dispatch) => {
    console.log("USERID", user_id);
    const response = await fetch(`/api/cart/${user_id}/add/${guitar_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(listing),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(addToCart(data));
    } else {
      return "ERROR IN ADDING TO CART";
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
      // newState.cart = { ...action.listings, ...state.cart };
      newState.cart = action.listings;
      return newState;
    case ADD_TO_CART:
      newState = { ...state };
      newState.cart[action.listing.id] = action.listing;
      return newState;

    default:
      return state;
  }
}
