import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import logo from "./logo.png";
import cart from "./cart.png";
import guitar from "./guitar.png";

// Material UI
import { AppBar, Container, Toolbar, Box, Button, Stack } from "@mui/material";

function Navigation() {
  const sessionUser = useSelector((state) => state.session.user);

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
          // justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "primary.light",
          padding: "10px",
        }}
      >
        {/* Home/Logo Button */}
        <Box sx={{ justifyContent: "center" }}>
          <Button href="/">
            <img src={logo} href="/" alt={"home"} />
          </Button>
        </Box>
        {/* Guitar Type */}
        <Box>
          <Stack spacing={5} direction="row" sx={{ pl: "30px" }}>
            <Button
              href="/listings/filter/guitar_type/Electric"
              sx={{
                color: "secondary.light",
                typography: "subtitle1",
                fontWeight: 600,
              }}
              size="large"
            >
              Electric
            </Button>
            <Button
              href="/listings/filter/guitar_type/Acoustic"
              sx={{
                color: "secondary.light",
                typography: "subtitle1",
                fontWeight: 600,
              }}
              size="large"
            >
              Acoustic
            </Button>
            <Button
              href="/listings/filter/guitar_type/Bass"
              sx={{
                color: "secondary.light",
                typography: "subtitle1",
                fontWeight: 600,
              }}
              size="large"
            >
              Bass
            </Button>
          </Stack>
        </Box>

        {/* Cart & Menu Buttons */}
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            justifyContent: "flex-end",
            pr: "30px",
          }}
        >
          {sessionUser && (
            <Button href={`/cart/${sessionUser.id}`} sx={{ m: "20px" }}>
              <img
                src={cart}
                alt="Shopping Cart"
                style={{ height: "50px", width: "50px" }}
              />
            </Button>
          )}

          <ProfileButton user={sessionUser} />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;
