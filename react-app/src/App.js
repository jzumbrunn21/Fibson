import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
// import SignupFormPage from "./components/SignupFormPage";
// import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import SplashPage from "./components/SplashPage";
import AllListingsPage from "./components/AllListingsPage";
import GuitarDetail from "./components/GuitarDetail";
import ManageListings from "./components/ManageListings";
import CreateListing from "./components/CreateListing";
import UpdateListing from "./components/UpdateListing";
import ShoppingCart from "./components/ShoppingCart";
import Footer from "./components/Footer";
import FilteredPage from "./components/FilteredPage";
import Reviews from "./components/Reviews";
import { Container } from "@mui/material";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {/* <Container> */}
        <Navigation isLoaded={isLoaded} />

        {isLoaded && (
          <Switch>
            <Route exact path="/">
              <SplashPage />
            </Route>
            <Route exact path="/listings">
              <AllListingsPage />
            </Route>
            <Route exact path="/listings/:guitarId">
              <GuitarDetail />
              <Reviews />
            </Route>
            <Route exact path="/listings/filter/:type/:category">
              <FilteredPage />
            </Route>
            <Route exact path="/manage">
              <ManageListings />
            </Route>
            <Route exact path="/create">
              <CreateListing />
            </Route>
            <Route exact path="/update/:guitarId">
              <UpdateListing />
            </Route>
            <Route exact path="/cart/:userId">
              <ShoppingCart />
            </Route>
          </Switch>
        )}

        <Footer />
      {/* </Container> */}
    </>
  );
}

export default App;
