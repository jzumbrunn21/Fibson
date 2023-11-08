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
      <div className="info-boxes">
        <div className="black-box">
          <img
            src={
              "https://images.ctfassets.net/m8onsx4mm13s/4qm6G6cNU4mSAb566UuIJ1/5dfd9c110728306b565b59671a95cc83/In-Time-For-Holidays__2_.png"
            }
            alt="Free Shipping"
            className="black-box-image"
          />
          <div className="black-box-deets1">
            <h3>Free Shipping</h3>
            <h5>On online orders over $50.</h5>
          </div>
        </div>
        <div className="black-box">
          <img
            src={
              "https://images.ctfassets.net/m8onsx4mm13s/6IvzKzqfqdVRKgZHjBqFIk/de259c13ae15133900b72c494b76c694/Lifetime-Warranty__2_.png"
            }
            alt="Lifetime Warranty"
            className="black-box-image"
          />
          <div className="black-box-deets2">
            <h3>Lifetime Warranty</h3>
            <h5>Free, limited warranty on material and workmanship</h5>
          </div>
        </div>
        <div className="black-box">
          <img
            src={
              "https://images.ctfassets.net/m8onsx4mm13s/24dB0X9zp0nHGgGooFJUGn/2d7bed365abe0a24ffa79eb21b4e1f3a/Financing-Available__2_.png"
            }
            alt="Financing Available"
            className="black-box-image"
          />
          <div className="black-box-deets3">
            <h3>Financing Available</h3>
            <h5>Options available through your wallet at checkout.</h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default SplashPage;
