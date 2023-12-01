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

const createReview = (review, guitarId) => ({
  type: CREATE_REVIEW,
  review,
  guitarId,
});

const updateReview = (review) => ({
  type: UPDATE_REVIEW,
  review,
});

const deleteReview = (review) => ({
  type: DELETE_REVIEW,
  review,
});

// THUNK ACTION CREATORS

export const readReviewsThunk = (guitarId) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${guitarId}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(readAllReviews(data));
  }
};

export const createReviewThunk = (review, guitarId) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${guitarId}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(review),
  });
  if (response.ok) {
    const data = await response.json();
    console.log(data);
    dispatch(createReview(data));
    return data;
  }
};

// export const updateReviewThunk = (reviewId, review) => async (dispatch) => {
//   const response = await fetch(`/api/reviews/${reviewId}/update`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(review),
//   });
//   if (response.ok) {
//     const data = await response.json();
//     dispatch(updateReview(data));
//     return data;
//   }
// };

// export const deleteReviewThunk = (reviewId) => async (dispatch) => {
//   const response = await fetch(`/api/reviews/${reviewId}/delete`, {
//     method: "DELETE",
//   });
//   if (response.ok) {
//     const data = await response.json();
//     dispatch(deleteReview(data));
//     return data;
//   }
// };

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
    case CREATE_REVIEW:
      newState = { ...state };
      newState.reviews[action.review.id] = action.review;
      return newState;
    case UPDATE_REVIEW:
      newState = { ...state };
      newState.reviews[action.review.id] = action.review;
      return newState;
    case DELETE_REVIEW:
      newState = { ...state };
      delete newState.reviews[action.review.id];
      return newState;
    default:
      return state;
  }
}
