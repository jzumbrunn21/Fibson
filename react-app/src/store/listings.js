// CONSTANTS
const CREATE_LISTING = "listings/CREATE_LISTING";
const READ_ALL_LISTINGS = "listings/READ__ALL_LISTINGS";
const READ_ONE_LISTING = "listings/READ_ONE_LISTING";
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

const readOneListing = (listing) => ({
  type: READ_ONE_LISTING,
  listing,
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
  const response = await fetch("/api/listings", {
    method: "GET",
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(readAllListings(data));
    // return data;
  } else {
    return "Listings Not Found";
  }
};

export const readOneListingThunk = (guitarId) => async (dispatch) => {
  const response = await fetch(`/api/listings/${guitarId}`, {
    method: "GET",
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(readOneListing(data));
    return data;
  } else {
    return "Listing Not Found";
  }
};

export const readAllUserListingsThunk = () => async (dispatch) => {
  const response = await fetch("/api/listings/manage", {
    method: "GET",
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(readAllListings(data));
    return data;
  }
};

export const updateListingThunk =
  (listingData, guitarId) => async (dispatch) => {};

export const deleteListingThunk = (guitarId) => async (dispatch) => {};

// Initial State

const initialState = { listings: {}, listing: {} };

// REDUCER

export default function listingsReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case READ_ALL_LISTINGS:
      newState = { ...state };
      action.listings.listings.forEach((listing) => {
        newState.listings[listing.guitar.id] = listing;
      });
      return newState;
    case READ_ONE_LISTING:
      newState = { ...state };
      newState.listing = action.listing;
      return newState;
    case CREATE_LISTING:
      return newState;
    case UPDATE_LISTING:
      return newState;
    case DELETE_LISTING:
      return newState;
    default:
      return state;
  }
}
