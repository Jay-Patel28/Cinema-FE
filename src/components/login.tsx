import * as React from "react";
import { useState } from "react";
import {NavLink} from 'react-router-dom'
import {
  Alert,
  AppBar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import axios from "axios";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

export default function Login() {
  const handleClickOpen = () => {
    setOpen(true);
  };
  const [data, setData] = useState({});
  const [open, setOpen] = useState(true);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [Isunauthorized, setUnauthorized] = useState(false);
  const handleClose = () => {
    setOpen(false);
    // return <Navigate to="/" />;
  };
  const handleEmailChange = (e: any) => {
    setUnauthorized(false);

    setEmail(e.target.value);
    console.log(email);
  };
  const handlePassChange = (e: any) => {
    setUnauthorized(false);

    setPass(e.target.value);
    console.log(pass);
  };
  
  const handleSubmit = async () => {
    setData({
      username: email,
      password: pass,
    });

    console.log("data: ", {
      username: email,
      password: pass,
    });
    const res: any = await loginRequest({
      username: email,
      password: pass,
    });
    console.log("res.status: ", res);
  };

  const loginRequest = async (data: any) => {
    axios
      .post("https://localhost:7114/api/Authenticate/login", data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        if (res.status === 200) {
          setLoggedIn(true);
        } 
        return res;
    })
    .catch((err) => {
        console.log('err: ', err);
     if (err.response.status === 401) {
          setUnauthorized(true);
        }}
        )
  };

  // const query = useQuery(['loginProc', data], loginRequest);
  // console.log(query.data);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Dialog open={open} onClose={handleClose} sx={{minWidth:"300px", minHeight:"300px"}}>
          {!isLoggedIn && (
            <div>
              {" "}
              <DialogTitle>Login</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Username"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={handleEmailChange}
                />
                <TextField
                  margin="dense"
                  id="pass"
                  label="Password"
                  type="password"
                  fullWidth
                  variant="standard"
                  onChange={handlePassChange}
                />
              </DialogContent>
            </div>
          )}
          {isLoggedIn && (
            <Alert severity="success">You are logged in !!</Alert>

          )}

          {Isunauthorized && (
            <Alert severity="error">Username or Password Invalid!</Alert>
          )}

          <DialogActions>
          <NavLink to='/'>
            <Button onClick={handleClose}>Cancel</Button>
            </NavLink>
            <Button
              disabled={isLoggedIn}
              variant="contained"
              onClick={handleSubmit}
              type="submit"
            >
              Login
            </Button>
          </DialogActions>
        </Dialog>
      </form>
      {}
    </>
  );
}
