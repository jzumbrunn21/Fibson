import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
// import "./Navigation.css";
import logo from "./logo.png";
import cart from "./cart.png";
import guitar from "./guitar.png";

// Material UI
import { AppBar } from "@mui/material";
import { Container } from "@mui/material";
import { Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [open, setOpen] = useState(false);
  // console.log(sessionUser);
  const handleDropdown = () => {
    setOpen(!open);
  };

  return (
    <AppBar
      position="static"
      sx={{
        width: "100%",
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        {/* Home/Logo Button */}
        <Box sx={{ justifyContent: "flex-start" }}>
          <Button href="/">
            <img src={logo} href="/" alt={"home"} />
          </Button>
        </Box>
        {/* Guitar Type */}
        <Stack spacing={3} direction="row">
          <Button
            href="/listings/filter/guitar_type/Electric"
            sx={{ color: "secondary.light" }}
          >
            Electric
          </Button>
          <Button
            href="/listings/filter/guitar_type/Acoustic"
            sx={{ color: "secondary.light" }}
          >
            Acoustic
          </Button>
          <Button
            href="/listings/filter/guitar_type/Bass"
            sx={{ color: "secondary.light" }}
          >
            Bass
          </Button>
        </Stack>
        {/* Cart & Menu Buttons */}
        <Box display="flex">
          <Box>
            {sessionUser && (
              <Button href={`/cart/${sessionUser.id}`}>
                <img
                  src={cart}
                  alt="Shopping Cart"
                  style={{ height: "50px", width: "50px" }}
                />
                <div>Cart</div>
              </Button>
            )}
          </Box>
          <Box>
            <Button onClick={handleDropdown}>
              {" "}
              <img
                className="profile-icon"
                src={guitar}
                alt="Profile Menu"
                style={{ height: "50px", width: "50px" }}
              />
            </Button>
            {open && <ProfileButton user={sessionUser} />}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;
