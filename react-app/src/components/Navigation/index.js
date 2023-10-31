import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import logo from "./logo.png";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="navigation">
      <div className="nav-logo">
        <NavLink exact to="/">
          <img src={logo} alt={"Home Button"} />
        </NavLink>
      </div>
      <div>{isLoaded && <ProfileButton user={sessionUser} />}</div>
    </div>
  );
}

export default Navigation;
