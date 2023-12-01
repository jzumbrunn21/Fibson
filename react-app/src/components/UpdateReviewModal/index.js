import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readOneReviewThunk, updateReviewThunk } from "../../store/reviews";
import { useModal } from "../../context/Modal";
import "./UpdateReviewModal.css";

const UpdateReviewModal = ({ reviewId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [errors, setErrors] = useState({});

  const [description, setDescription] = useState("");
  const [stars, setStars] = useState(0);

  useEffect(() => {
    prepopulateFields();
  }, []);

  const prepopulateFields = async () => {
    let review = await dispatch(readOneReviewThunk(reviewId));
    setDescription(review.description);
    setStars(review.stars);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!description || description.length > 500 || description.length < 25) {
      newErrors.description =
        "Description must be between 25 and 500 characters.";
    }

    if (!stars || stars < 1 || stars > 5) {
      newErrors.stars = "Stars must be between 1 and 5.";
    }

    if (Object.keys(newErrors).length > 0) {
      return setErrors(newErrors);
    }

    const data = {
      description,
      stars,
    };

    const updatedReview = await dispatch(updateReviewThunk(reviewId, data));

    if (updatedReview) {
      closeModal();
    }
  };

  return (
    <>
      <div className="update-review-container">
        <h1>Update your Review</h1>
        <form className="update-review-form" onSubmit={handleSubmit}>
          <div></div>
          <div className="update-review-input">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {errors.description && (
            <div className="update-review-errors">{errors.description}</div>
          )}
          <div className="update-review-input">
            <label htmlFor="stars">Stars</label>
            <input
              type="number"
              name="stars"
              value={stars}
              onChange={(e) => setStars(e.target.value)}
            />
          </div>
          {errors.stars && (
            <div className="update-review-errors">{errors.stars}</div>
          )}
          <button className="update-review-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateReviewModal;
