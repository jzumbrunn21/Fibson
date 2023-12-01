import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReviewThunk, updateReviewThunk } from "../../store/reviews";
import { useModal } from "../../context/Modal";
import "./CreateReviewModal.css";

const CreateReviewModal = ({ guitarId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [errors, setErrors] = useState({});

  const [description, setDescription] = useState("");
  const [stars, setStars] = useState(0);

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

    const createdReview = await dispatch(createReviewThunk(data, guitarId));

    if (createdReview) {
      closeModal();
    }
  };

  return (
    <>
      <div className="create-review-container">
        <h1>Write a Review</h1>
        <form className="create-review-form" onSubmit={handleSubmit}>
          <div></div>
          <div className="create-review-input">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {errors.description && (
            <div className="create-review-errors">{errors.description}</div>
          )}
          <div className="create-review-input">
            <label htmlFor="stars">Stars</label>
            <input
              type="number"
              name="stars"
              value={stars}
              onChange={(e) => setStars(e.target.value)}
            />
          </div>
          {errors.stars && (
            <div className="create-review-errors">{errors.stars}</div>
          )}
          <button className="create-review-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateReviewModal;
