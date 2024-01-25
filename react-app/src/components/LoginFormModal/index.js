import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
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
    <DialogContent>
      <Box className="login-modal-container">
        <DialogTitle>Log In</DialogTitle>
        <form onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <Box>
            <DialogContentText>Email</DialogContentText>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Box>
          <Box>
            <DialogContentText>Password</DialogContentText>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Box>
          <Box>
            <Button type="submit">Log In</Button>
          </Box>
          <Box>
            <Button onClick={handleDemoUser}>Log in as Demo User</Button>
          </Box>
        </form>
      </Box>
    </DialogContent>
  );
}

export default LoginFormModal;
