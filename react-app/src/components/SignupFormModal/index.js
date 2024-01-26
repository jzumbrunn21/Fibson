import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../../store/session";
import {
  Box,
  Button,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

function SignupFormModal({ setOpenSignupModal }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const data = await dispatch(
        signUp(username, email, password, firstName, lastName)
      );
      if (data) {
        setErrors(data);
      } else {
        setOpenSignupModal(false);
      }
    } else {
      setErrors([
        "Confirm Password field must be the same as the Password field",
      ]);
    }
  };

  return (
    <>
      <DialogContent>
        <DialogTitle>
          <Typography variant="h5" align="center">
            Sign Up
          </Typography>
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <Stack my="10px" direction="row" spacing="5px">
            <TextField
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
              error={
                errors.includes(
                  "email : Email must be between 6 and 255 characters"
                ) ||
                errors.includes("email : Please enter a valid email") ||
                errors.includes("email : Email address is already in use.")
              }
              helperText={
                errors.includes(
                  "email : Email must be between 6 and 255 characters"
                )
                  ? "Email must be between 6 and 255 characters"
                  : errors.includes("email : Please enter a valid email")
                  ? "Please enter a valid email address"
                  : errors.includes("email : Email address is already in use.")
                  ? "Email address is already in use."
                  : ""
              }
            />

            <TextField
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Username"
              error={
                errors.includes(
                  "username : Username must be between 6 and 40 characters"
                ) || errors.includes("username : Username is already in use.")
              }
              helperText={
                errors.includes(
                  "username : Username must be between 6 and 40 characters"
                )
                  ? "Username must be between 6 and 40 characters"
                  : errors.includes("username : Username is already in use.")
                  ? "Username is already in use"
                  : ""
              }
            />
          </Stack>
          <Stack my="10px" direction="row" spacing="5px">
            <TextField
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              placeholder="First Name"
              error={errors.includes(
                "first_name : First Name must be between 1 and 50 characters"
              )}
              helperText={
                errors.includes(
                  "first_name : First Name must be between 1 and 50 characters"
                )
                  ? "First Name must be between 1 and 50 characters"
                  : ""
              }
            />

            <TextField
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              placeholder="Last Name"
              error={errors.includes(
                "last_name : Last Name must be between 1 and 50 characters"
              )}
              helperText={
                errors.includes(
                  "last_name : Last Name must be between 1 and 50 characters"
                )
                  ? "Last Name must be between 1 and 50 characters"
                  : ""
              }
            />
          </Stack>
          <Stack my="10px" direction="row" spacing="5px">
            <TextField
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
              error={
                errors.includes(
                  "password : Password must be between 6 and 255 characters"
                )
              }
              helperText={
                errors.includes(
                  "password : Password must be between 6 and 255 characters"
                )
                  ? "Password must be between 6 and 255 characters"
                  : errors.includes("")
              }
            />

            <TextField
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm Password"
              error={
                errors.includes(
                  "password : Password must be between 6 and 255 characters"
                ) ||
                errors.includes(
                  "Confirm Password field must be the same as the Password field"
                )
              }
              helperText={
                errors.includes(
                  "password : Password must be between 6 and 255 characters"
                )
                  ? "Password must be between 6 and 255 characters"
                  : errors.includes(
                      "Confirm Password field must be the same as the Password field"
                    )
                  ? "Passwords must match"
                  : ""
              }
            />
          </Stack>
          <Stack direction="row" spacing="5px" justifyContent="center">
            <Button
              variant="contained"
              sx={{
                bgcolor: "secondary.dark",
                color: "secondary.light",
                my: "5px",
                justifySelf: "center",
              }}
              type="submit"
            >
              <Typography>Sign Up</Typography>
            </Button>
          </Stack>
        </form>
      </DialogContent>
    </>
  );
}

export default SignupFormModal;
