import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { useHistory } from "react-router-dom";
import { Menu, MenuItem, Button, Dialog, Modal, Box } from "@mui/material";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import OpenModalButton from "../OpenModalButton";
import guitar from "./guitar.png";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [anchorEl, setAnchorEl] = useState(null);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openSignupModal, setOpenSignupModal] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push("/");
    handleClose();
  };

  const handleManage = (e) => {
    e.preventDefault();
    history.push("/manage");
    handleClose();
  };

  const handleLogin = () => {
    setOpenLoginModal(true);
    handleClose();
  };

  const handleCloseLogin = () => {
    setOpenLoginModal(false);
    handleClose();
  };

  const handleSignup = () => {
    setOpenSignupModal(true);
  };

  const handleCloseSignup = () => {
    setOpenSignupModal(false);
    handleClose();
  };

  return (
    <>
      <Button onClick={handleClick} sx={{ m: "20px" }}>
        <img
          className="profile-icon"
          src={guitar}
          alt="Profile Menu"
          style={{ height: "50px", width: "50px" }}
        />
      </Button>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {user ? (
          <>
            <MenuItem onClick={handleManage}>Manage your Guitars</MenuItem>
            <MenuItem onClick={handleLogout}>Log Out</MenuItem>
          </>
        ) : (
          <>
            <MenuItem onClick={handleLogin}>Login</MenuItem>

            <MenuItem onClick={handleSignup}>Sign Up</MenuItem>
          </>
        )}
      </Menu>
      <Modal open={openLoginModal} onClose={handleCloseLogin}>
        <LoginFormModal setOpenLoginModal={setOpenLoginModal} />
      </Modal>
      <Modal open={openSignupModal} onClose={handleCloseSignup}>
        <SignupFormModal setOpenSignupModal={setOpenSignupModal} />
      </Modal>
    </>
  );
}

export default ProfileButton;
