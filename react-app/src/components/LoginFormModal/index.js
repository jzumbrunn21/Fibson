import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";

function LoginFormModal({ setOpenLoginModal }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      setOpenLoginModal(false);
    }
  };

  const handleDemoUser = async (e) => {
    e.preventDefault();
    return dispatch(login("demo@aa.io", "password")).then(() => {
      setOpenLoginModal(false);
    });
  };

  return (
    <>
      <DialogContent>
        <DialogTitle>
          <Typography variant="h5" align="center">
            Log In
          </Typography>
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          {/* <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul> */}
          <div>{console.log(errors)}</div>
          <Box my="10px">
            <TextField
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
              error={errors.includes("email : Email provided not found.")}
              helperText={
                errors.includes("email : Email provided not found.")
                  ? "No such user exists."
                  : ""
              }
            />
          </Box>
          <Box my="10px">
            <TextField
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
              error={
                errors.includes("password : No such user exists.") ||
                errors.includes("password : Password was incorrect.")
              }
              helperText={
                errors.includes("password : Password was incorrect.")
                  ? "Password was incorrect."
                  : errors.includes("password : No such user exists.")
                  ? "No such user exists."
                  : ""
              }
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              py: "15px",
            }}
          >
            <Button
              variant="contained"
              sx={{
                bgcolor: "secondary.dark",
                color: "secondary.light",
                my: "5px",
                width: "fit-content",
              }}
              type="submit"
            >
              <Typography>Log In</Typography>
            </Button>

            <Button
              variant="contained"
              sx={{
                bgcolor: "secondary.dark",
                color: "secondary.light",
                my: "5px",
              }}
              onClick={handleDemoUser}
            >
              <Typography>Log in as Demo User</Typography>
            </Button>
          </Box>
        </form>
      </DialogContent>
    </>
  );
}

export default LoginFormModal;
