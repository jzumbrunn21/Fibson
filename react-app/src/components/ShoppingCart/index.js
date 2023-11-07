import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import {
  readUserCartThunk,
  incrementItemThunk,
  decrementItemThunk,
} from "../../store/shoppingCart";
import DeleteCartItemModal from "../DeleteCartItemModal";
import "./ShoppingCart.css";
const ShoppingCart = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const userCart = useSelector((state) => Object.values(state.cart.cart));
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    if (sessionUser) {
      dispatch(readUserCartThunk(sessionUser.id));
    }
  }, [dispatch, sessionUser]);

  return (
    <>
      <h1>{sessionUser.first_name}'s Gigbag</h1>

      <div className="cart-items-container">
        <ul>
          {userCart[0] &&
            userCart[0].length > 0 &&
            userCart[0].map((item) => (
              <li key={item.id} className="cart-item">
                <div className="cart-image">
                  {item.images && <img src={item.images[0].url} alt="Guitar" />}
                </div>
                <div className="cart-info-section">
                  <div>
                    {item.guitar.year} {item.guitar.make} {item.guitar.model}
                  </div>
                  <div>${item.guitar.price}</div>
                </div>
                <div>
                  <OpenModalButton
                    className="delete-button"
                    buttonText="Delete"
                    modalComponent={
                      <DeleteCartItemModal
                        guitarId={item.guitar.id}
                        userId={sessionUser.id}
                      />
                    }
                  />
                  <div>
                    <button
                      onClick={() => {
                        dispatch(
                          decrementItemThunk(sessionUser.id, item.guitar.id)
                        ).then(() => {
                          dispatch(readUserCartThunk(sessionUser.id));
                        });
                      }}
                    >
                      -
                    </button>
                    Quantity: {item.quantity}
                    <button
                      onClick={() => {
                        dispatch(
                          incrementItemThunk(sessionUser.id, item.guitar.id)
                        ).then(() => {
                          dispatch(readUserCartThunk(sessionUser.id));
                        });
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
      <div>
        <h2>Subtotal: Loop to add prices</h2>
        <button
          onClick={() => {
            alert("Feature Coming Soon");
          }}
        >
          Checkout
        </button>
      </div>
    </>
  );
};

export default ShoppingCart;
