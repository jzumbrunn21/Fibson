// CONSTANTS
const CREATE_LISTING = "listings/CREATE_LISTING";
const READ_ALL_LISTINGS = "listings/READ__ALL_LISTINGS";
const UPDATE_LISTING = "listings/UPDATE_LISTING";
const DELETE_LISTING = "listings/DELETE_LISTING";

// Regular Action Creators

const createListing = (listingData) => ({
  type: CREATE_LISTING,
  listingData,
});

const readAllListings = (listings) => ({
  type: READ_ALL_LISTINGS,
  listings,
});

const updateListing = (listingData, guitarId) => ({
  type: UPDATE_LISTING,
  listingData,
  guitarId,
});

const deleteListing = (guitarId) => ({
  type: DELETE_LISTING,
  guitarId,
});

// THUNK ACTION CREATORS

export const createListingThunk = (listingData) => async (dispatch) => {};

export const readAllListingsThunk = () => async (dispatch) => {
  const response = await fetch("/api/listings");

  if (response.ok) {
    const data = await response.json();
    dispatch(readAllListings(data));
    return data;
  } else {
    return "Listing Not Found";
  }
};

export const updateListingThunk =
  (listingData, guitarId) => async (dispatch) => {};

export const deleteListingThunk = (guitarId) => async (dispatch) => {};

// Initial State

const initialState = { listings: {} };

// REDUCER

export default function listingsReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case CREATE_LISTING:
      return newState;
    case READ_ALL_LISTINGS:
      newState = { ...state };
      action.listings.listings.forEach((listing) => {
        newState.listings[listing.id] = listing;
      });
      return newState;
    case UPDATE_LISTING:
      return newState;
    case DELETE_LISTING:
      return newState;
    default:
      return state;
  }
}
