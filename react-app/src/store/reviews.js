// Constants

const READ_ALL_REVIEWS = "reviews/READ_ALL_REVIEWS";
const CREATE_REVIEW = "reviews/CREATE_REVIEW";
const UPDATE_REVIEW = "reviews/UPDATE_REVIEW";
const DELETE_REVIEW = "reviews/DELETE_REVIEW";

// Regular Action Creators


const readAllReviews = (reviews) => ({
  type: READ_ALL_REVIEWS,
  reviews,
});




// THUNK ACTION CREATORS

// reviews by guitarId
export const readReviewsThunk = (guitarId) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${guitarId}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(readAllReviews(data));
  }
};

// Initial State
const initialState = { reviews: {} };

export default function reviewsReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case READ_ALL_REVIEWS:
      newState = { ...state, reviews: {} };
      action.reviews.reviews.forEach((review) => {
        newState.reviews[review.id] = review;
      });
      return newState;
    default:
      return state;
  }
}
