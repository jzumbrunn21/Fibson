import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./DeleteListingModal.css";
import { useModal } from "../../context/Modal";
import { deleteListingThunk } from "../../store/listings";

const DeleteListingModal = ({ guitarId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(deleteListingThunk(guitarId));
    closeModal();
  };

  const handleCancel = (e) => {
    e.preventDefault();
    closeModal();
  };
  return (
    <div className="delete-modal">
      <h2>Are you sure you want to delete this guitar?</h2>
      <button className="yay-button" onClick={handleDelete}>
        Delete Guitar
      </button>
      <button className="nay-button" onClick={handleCancel}>
        Cancel
      </button>
    </div>
  );
};

export default DeleteListingModal;
