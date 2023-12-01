import React, { useEffect, useState } from "react";
import "./Reviews.css";
import { useDispatch, useSelector } from "react-redux";
import { readReviewsThunk } from "../../store/reviews";
import { useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import CreateReviewModal from "../CreateReviewModal";
import UpdateReviewModal from "../UpdateReviewModal";
import DeleteReviewModal from "../DeleteReviewModal";

const Reviews = () => {
  const dispatch = useDispatch();
  const { guitarId } = useParams();
  const [loaded, setLoaded] = useState(false);
  const [reviewDeleted, setReviewDeleted] = useState(false);
  const reviews = useSelector((state) => Object.values(state.reviews.reviews));
  const currentUser = useSelector((state) => state.session.user);

  const averageStars = (
    reviews.reduce((total, review) => total + review.stars, 0) / reviews.length
  ).toFixed(2);

  useEffect(() => {
    dispatch(readReviewsThunk(guitarId)).then(() => setLoaded(true));
    setReviewDeleted(false);
  }, [reviewDeleted]);

  return (
    <div className="reviews-container">
      <div className="reviews-header">
        <h1>Reviews ⭐{averageStars}</h1>
        <h2></h2>

        {currentUser &&
          !reviews.some((review) => review.user_id === currentUser.id) &&
          currentUser.id !== guitarId && (
            <OpenModalButton
              className="create-review-button"
              buttonText="Write a Review"
              modalComponent={<CreateReviewModal guitarId={guitarId} />}
            />
          )}
      </div>
      <div className="reviews">
        {reviews &&
          reviews.map((review) => (
            <div className="review" key={review.id}>
              <div className="review-body">
                <div className="review-header">
                  <h2>{review.username}</h2>
                  <h3>
                    {Array.from({ length: review.stars }, (_, index) => (
                      <span key={index}>⭐</span>
                    ))}
                  </h3>
                </div>
                <div className="review-description">
                  <p>{review.description}</p>
                </div>
                {currentUser && currentUser.id === review.user_id && (
                  <div className="review-buttons">
                    <OpenModalButton
                      className="update-review-button"
                      buttonText="Update"
                      modalComponent={
                        <UpdateReviewModal
                          guitarId={guitarId}
                          reviewId={review.id}
                        />
                      }
                    />
                    <OpenModalButton
                      className="delete-review-button"
                      buttonText="Delete"
                      modalComponent={
                        <DeleteReviewModal
                          guitarId={guitarId}
                          reviewId={review.id}
                          setReviewDeleted={setReviewDeleted}
                        />
                      }
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Reviews;
