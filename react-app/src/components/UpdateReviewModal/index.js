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
  const [hover, setHover] = useState(0);

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
      newErrors.stars = "Select at least one star";
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
            <label>
              <h3>Description</h3>
            </label>
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
            <label>
              <h3>Stars</h3>
            </label>
            <div>
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <i
                    key={index}
                    className={`fa-star ${
                      index < (hover || stars) ? "fas" : "far"
                    }`}
                    onMouseEnter={() => setHover(index + 1)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => setStars(index + 1)}
                  />
                ))}
            </div>
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
