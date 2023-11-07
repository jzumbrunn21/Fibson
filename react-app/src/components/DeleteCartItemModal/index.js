import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { useModal } from "../../context/Modal";
import {
  removeFromCartThunk,
  readUserCartThunk,
} from "../../store/shoppingCart";

const DeleteCartItemModal = ({ userId, guitarId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(removeFromCartThunk(userId, guitarId));
    dispatch(readUserCartThunk(userId));
    closeModal();
  };

  const handleCancel = (e) => {
    e.preventDefault();
    closeModal();
  };
  return (
    <>
      <h3>Are you sure you want to delete this guitar listing?</h3>
      <button className="yay-button" onClick={handleDelete}>
        Yay
      </button>
      <button className="nay-button" onClick={handleCancel}>
        Nay
      </button>
    </>
  );
};

export default DeleteCartItemModal;
