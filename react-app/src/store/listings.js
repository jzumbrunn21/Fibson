// CONSTANTS
const CREATE_LISTING = "listings/CREATE_LISTING";
const READ_ALL_LISTINGS = "listings/READ__ALL_LISTINGS";
const READ_ONE_LISTING = "listings/READ_ONE_LISTING";
const UPDATE_LISTING = "listings/UPDATE_LISTING";
const DELETE_LISTING = "listings/DELETE_LISTING";
const UPLOAD_IMAGE = "listings/UPLOAD_IMAGE";
const DELETE_IMAGE = "listings/DELETE_IMAGE";

// Regular Action Creators

const createListing = (listingData) => ({
  type: CREATE_LISTING,
  listingData,
});

const uploadImage = (image) => ({
  type: UPLOAD_IMAGE,
  image,
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

const deleteImage = (guitarId, imageId) => ({
  type: DELETE_IMAGE,
  guitarId,
  imageId,
});

// THUNK ACTION CREATORS

export const createListingThunk = (listingData) => async (dispatch) => {
  const response = await fetch("/api/listings/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(listingData),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(createListing(data));
    return data;
  } else {
    return "Error making your listing";
  }
};

export const uploadListingImageThunk =
  (image, guitarId) => async (dispatch) => {
    const response = await fetch(`/api/listings/${guitarId}/upload-image`, {
      method: "POST",
      body: image,
    });
    // console.log("HITTING THUNK");
    if (response.ok) {
      const data = await response.json();
      // console.log("DATA", data);
      dispatch(uploadImage(data));
    } else {
      console.log(
        "Error in image upload!!",
        response.status,
        await response.text()
      );
    }
  };

export const readAllListingsThunk = (type, category) => async (dispatch) => {
  // query param conditional to filter from direct route
  const response = await fetch(`/api/listings?${type}=${category}`, {
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
  (listingData, guitarId) => async (dispatch) => {
    const response = await fetch(`/api/listings/update/${guitarId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(listingData),
    });
    if (response.ok) {
      const data = await response.json();
      dispatch(updateListing(data, guitarId));
      return data;
    } else {
      return "ERROR UPDATING YOUR LISTING";
    }
  };

export const deleteListingThunk = (guitarId) => async (dispatch) => {
  const response = await fetch(`/api/listings/${guitarId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteListing(guitarId));
  } else {
    return "Error deleting your listing";
  }
};

export const deleteListingImageThunk =
  (guitarId, imageId) => async (dispatch) => {
    const response = await fetch(`/api/listings/${guitarId}/image/${imageId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      dispatch(deleteImage(guitarId, imageId));
    } else {
      return "Error deleting your image";
    }
  };

// export const deleteImageThunk => (guitarId) => async (dispatch) => {}

// Initial State

const initialState = { listings: {}, listing: {}, images: {} };

// REDUCER

export default function listingsReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case READ_ALL_LISTINGS:
      newState = { ...state, listings: {} };
      action.listings.listings.forEach((listing) => {
        newState.listings[listing.guitar.id] = listing;
      });
      return newState;
    case READ_ONE_LISTING:
      newState = { ...state };
      newState.listing = action.listing;
      return newState;
    case UPLOAD_IMAGE:
      newState = { ...state };
      newState.images[action.image.id] = action.image;
      return newState;
    case CREATE_LISTING:
      newState = { ...state };
      newState.listing = action.listingData;
      return newState;
    case UPDATE_LISTING:
      newState = { ...state };
      newState.listings[action.listingId] = action.listingData;
      return newState;
    case DELETE_LISTING:
      newState = { ...state };
      delete newState.listings[action.guitarId];
      return newState;
    case DELETE_IMAGE:
      newState = { ...state };
      const imageIndex = newState.listing.listing[0].images.findIndex(
        (image) => image.id === action.imageId
      );

      if (imageIndex !== -1) {
        newState.listing.listing[0].images.splice(imageIndex, 1);
      }
      return newState;
    default:
      return state;
  }
}
