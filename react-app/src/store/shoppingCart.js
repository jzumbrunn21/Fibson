// CONSTANTS
const READ_USER_CART = "cart/READ_USER_CART";
const ADD_TO_CART = "cart/ADD_TO_CART";
const INCREMENT_ITEM = "cart/INCREMENT_ITEM";
const DECREMENT_ITEM = "cart/DECREMENT_ITEM";
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

const removeFromCart = (guitarId) => ({
  type: REMOVE_FROM_CART,
  guitarId,
});

const incrementItem = (guitarId) => ({
  type: INCREMENT_ITEM,
  guitarId,
});

const decrementItem = (guitarId) => ({
  type: DECREMENT_ITEM,
  guitarId,
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

export const removeFromCartThunk = (user_id, guitarId) => async (dispatch) => {
  const response = await fetch(`/api/cart/${user_id}/delete/${guitarId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(removeFromCart(guitarId));
  } else {
    return "Error deleting your item from thunk";
  }
};

export const incrementItemThunk = (user_id, guitarId) => async (dispatch) => {
  const response = await fetch(`/api/cart/${user_id}/increment/${guitarId}`, {
    method: "PUT",
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(incrementItem(guitarId));
    return data;
  } else {
    return "Error increasing your item quantity";
  }
};

export const decrementItemThunk = (user_id, guitarId) => async (dispatch) => {
  const response = await fetch(`/api/cart/${user_id}/decrement/${guitarId}`, {
    method: "PUT",
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(decrementItem(guitarId));
    return data;
  } else {
    return "Error increasing your item quantity";
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
    case ADD_TO_CART:
      newState = { ...state };
      newState.cart[action.listing.id] = action.listing;
      return newState;
    case REMOVE_FROM_CART:
      newState = { ...state };
      delete newState.cart[action.guitarId];
      return newState;
    case INCREMENT_ITEM:
      newState = { ...state };
      newState.cart[action.listing] = action.listing;
      return newState;
    case DECREMENT_ITEM:
      newState = { ...state };
      newState.cart[action.listing] = action.listing;
      return newState;
    default:
      return state;
  }
}
