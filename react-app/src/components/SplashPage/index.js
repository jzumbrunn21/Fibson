import React from "react";
import "./SplashPage.css";
import { NavLink } from "react-router-dom";
const SplashPage = () => {
  return (
    <>
      <div className="splash-page-header">
        <div className="header-title">
          <h2>Check Out Our Guitars</h2>
          <h4>Explore our newest guitars in stock</h4>
        </div>
        <img
          src={
            "https://images.pexels.com/photos/1201112/pexels-photo-1201112.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          }
          alt="All Listings"
          className="splash-page-header-image"
        ></img>
        <div className="header-all-listings">
          <NavLink className="all-listings-navlink" exact to="/listings">
            <button>
              <h3>All Listings</h3>
            </button>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default SplashPage;
