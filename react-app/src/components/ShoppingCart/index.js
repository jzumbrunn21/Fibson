import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { readUserCartThunk } from "../../store/shoppingCart";
import "./ShoppingCart.css";
const ShoppingCart = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const userCart = useSelector((state) => Object.values(state.cart.cart));
  const sessionUser = useSelector((state) => state.session.user);
  const [usersCart, setUsersCart] = useState(userCart);

  console.log("USER CART", userCart[0]);

  useEffect(() => {
    setUsersCart(userCart);
    dispatch(readUserCartThunk(userId));
  }, [dispatch, userId]);

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
                  <button>Update</button>
                </div>
                <div>
                  <button>Delete</button>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default ShoppingCart;
