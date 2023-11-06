import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import logo from "./logo.png";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  console.log(sessionUser);

  return (
    <div className="navigation">
      <div className="nav-logo">
        <NavLink exact to="/">
          <img src={logo} alt={"Home Button"} />
        </NavLink>
        <NavLink exact to="/listings">
          <button>All Listings</button>
        </NavLink>
      </div>
      <div>
        {sessionUser && (
          <NavLink exact to={`/cart/${sessionUser.id}`}>
            <button>My Cart</button>
          </NavLink>
        )}
      </div>
      <div>{isLoaded && <ProfileButton user={sessionUser} />}</div>
    </div>
  );
}

export default Navigation;
