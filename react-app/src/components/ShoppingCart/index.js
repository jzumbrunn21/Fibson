import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { readUserCartThunk } from "../../store/shoppingCart";
import "./ShoppingCart.css";
const ShoppingCart = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  // const userCart = useSelector((state) => {
  //   Object.values(state.cart);
  // });

  useEffect(() => {
    dispatch(readUserCartThunk(userId));
  }, []);

  
  return (
    <>
      <h1>WELCOME TO THE SHOPPING CART</h1>
      <h3>YOURE GONNA DIEEEEEEEEEEEEEEEEEEEEEEEEEE</h3>
    </>
  );
};

export default ShoppingCart;
