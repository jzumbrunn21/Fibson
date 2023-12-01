import React, { useEffect, useState } from "react";
import "./Reviews.css";
import { useDispatch, useSelector } from "react-redux";
import { readReviewsThunk } from "../../store/reviews";
import { useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import CreateReviewModal from "../CreateReviewModal";

const Reviews = () => {
  const dispatch = useDispatch();
  const { guitarId } = useParams();
  const [loaded, setLoaded] = useState(false);
  const reviews = useSelector((state) => Object.values(state.reviews.reviews));
  const averageStars =
    reviews.reduce((total, review) => total + review.stars, 0) / reviews.length;
  // console.log("REVIEWS", reviews);

  useEffect(() => {
    dispatch(readReviewsThunk(guitarId)).then(() => setLoaded(true));
  }, []);

  return (
    <div className="reviews-container">
      <div className="reviews-header">
        <h1>Reviews</h1>
        <h3>Average Stars:⭐{averageStars}</h3>
        <OpenModalButton
          className="create-review-button"
          buttonText="Write a Review"
          modalComponent={<CreateReviewModal guitarId={guitarId} />}
        />
      </div>
      <div className="reviews">
        {reviews &&
          reviews.map((review) => (
            <div className="review" key={review.id}>
              <div className="review-body">
                <h2>{review.username}</h2>
                <h3>
                  {Array.from({ length: review.stars }, (_, index) => (
                    <span key={index}>⭐</span>
                  ))}
                </h3>

                <p>{review.description}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Reviews;
