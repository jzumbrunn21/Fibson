import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import logo from "./logo.png";
import cart from "./cart.png";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  console.log(sessionUser);

  return (
    <div className="navigation">
      <div className="nav-grey">
        <div className="nav-links">
          <div className="nav-logo">
            <NavLink exact to="/">
              <img src={logo} alt={"Home Button"} />
            </NavLink>

            <ul>
              <li>
                <NavLink exact to="/listings/filter/guitar_type/Electric">
                  <h4>Electric</h4>
                </NavLink>
              </li>

              <li>
                <NavLink exact to="/listings/filter/guitar_type/Acoustic">
                  <h4>Acoustic</h4>
                </NavLink>
              </li>
              <li>
                <NavLink exact to="/listings/filter/guitar_type/Bass">
                  <h4>Bass</h4>
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="directory">
            <div>
              {sessionUser && (
                <NavLink exact to={`/cart/${sessionUser.id}`}>
                  <img className="cart-icon" src={cart} alt="Shopping Cart" />
                </NavLink>
              )}
            </div>
            <div>{isLoaded && <ProfileButton user={sessionUser} />}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
