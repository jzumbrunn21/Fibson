import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReviewThunk} from "../../store/reviews";
import { useModal } from "../../context/Modal";
import "./CreateReviewModal.css";

const CreateReviewModal = ({ guitarId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [errors, setErrors] = useState({});

  const [description, setDescription] = useState("");
  const [stars, setStars] = useState(0);
  const [hover, setHover] = useState(0);

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

    const createdReview = await dispatch(createReviewThunk(data, guitarId));

    if (createdReview) {
      closeModal();
    }
  };

  return (
    <>
      <div className="create-review-container">
        <h1>Post your Review</h1>
        <form className="create-review-form" onSubmit={handleSubmit}>
          <div className="create-review-input">
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
            <div className="create-review-errors">{errors.description}</div>
          )}
          <div className="create-review-input">
            <label>
              <h3>Stars</h3>
            </label>
            <div>
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <i
                    key={index}
                    className={`fa-star ${index < (hover || stars) ? "fas" : "far"}`}
                    onMouseEnter={() => setHover(index + 1)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => setStars(index + 1)}
                  />
                ))}
            </div>
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
