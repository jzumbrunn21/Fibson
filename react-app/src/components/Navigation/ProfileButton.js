import React, { useState, useEffect, useRef } from "react";
import "./ProfileButton.css";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useHistory } from "react-router-dom";
import guitar from "./guitar.png";
import player from "./guitar-player.png";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push("/");
    closeMenu();
  };
  const handleManage = (e) => {
    e.preventDefault();
    history.push("/manage");
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button
        style={{
          background: "transparent",
          border: "none",
        }}
        onClick={openMenu}
      >
        <img className="profile-icon" src={guitar} alt="Profile Menu" />
      </button>
      <ul className={ulClassName} style={{ position: "absolute" }} ref={ulRef}>
        {user ? (
          <>
            <li id="profile-email">{user.username}</li>
            <li id="profile-email">{user.email}</li>
            <li>
              <button onClick={handleManage}>Manage your Guitars</button>
            </li>
            <li id="logout-button">
              <button onClick={handleLogout}>Log Out</button>
            </li>
          </>
        ) : (
          <>
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
              className="logged-out-buttons"
            />

            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
              className="logged-out-buttons"
            />
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
