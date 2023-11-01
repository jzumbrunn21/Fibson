import React, { useEffect } from "react";
import { readAllListingsThunk } from "../../store/listings";
import { useSelector, useDispatch } from "react-redux";

const SplashPage = () => {
  const dispatch = useDispatch();

  const listings = useSelector((state) =>
    Object.values(state.listings.listings)
  );

  useEffect(() => {
    dispatch(readAllListingsThunk());
  }, [dispatch]);

  return <h1>Welcome to Fibson</h1>;
};

export default SplashPage;
