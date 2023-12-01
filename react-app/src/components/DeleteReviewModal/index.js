import "./DeleteReviewModal.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteReviewThunk } from "../../store/reviews";
import { useModal } from "../../context/Modal";
import { useParams } from "react-router-dom";

const DeleteReviewModal = ({ reviewId, setReviewDeleted }) => {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(deleteReviewThunk(reviewId));
    setReviewDeleted(true);
    closeModal();
  };

  const handleCancel = (e) => {
    e.preventDefault();
    closeModal();
  };
  return (
    <div className="delete-modal">
      <h2>Are you sure you want to delete this review?</h2>
      <button className="yay-button" onClick={handleDelete}>
        Delete Review
      </button>
      <button className="nay-button" onClick={handleCancel}>
        Cancel
      </button>
    </div>
  );
};
export default DeleteReviewModal;
