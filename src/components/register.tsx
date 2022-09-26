import {
  Alert, Button,
  Dialog,
  DialogActions,
  DialogContent, DialogTitle, TextField
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { NavLink } from 'react-router-dom';
export default function Register() {
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  const [data, setData] = useState({});
  const [open, setOpen] = useState(true);
  const [email, setEmail] = useState("");

  const [uName, setuName] = useState("");
  const [pass, setPass] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [Isunauthorized, setUnauthorized] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleEmailChange = (e: any) => {
    setUnauthorized(false);
    setEmail(e.target.value);
  };

  const handleUsernameChange = (e: any) => {
    setUnauthorized(false);

    setuName(e.target.value);
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
      username: uName,
      email: email,
      password: pass,
    });
    const res: any = await loginRequest({
      username: uName,
      email: email,
      password: pass,
    });
    console.log("res.status: ", res);
  };

  const loginRequest = async (data: any) => {
    axios
      .post("https://localhost:7114/api/Authenticate/register", data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        if (res.status === 200) {
          setLoggedIn(true);
        }
        return res;
      })
      .catch((err) => {
        console.log("err: ", err);
        if (err.response.status === 500) {
          setUnauthorized(true);
        }
      });
  };

  // const query = useQuery(['loginProc', data], loginRequest);
  // console.log(query.data);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Dialog
          open={open}
          onClose={handleClose}
          sx={{ minWidth: "300px", minHeight: "300px" }}
        >
          {!isLoggedIn && (
            <div>
              {" "}
              <DialogTitle>Register</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Username"
                  type="text"
                  fullWidth
                  variant="outlined"
                  required
                  onChange={handleUsernameChange}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="email"
                  label="Email"
                  type="email"
                  fullWidth
                  variant="outlined"
                  required
                  onChange={handleEmailChange}
                />
                <TextField
                  margin="dense"
                  id="pass"
                  label="Password"
                  type="password"
                  fullWidth
                  variant="outlined"
                  required
                  onChange={handlePassChange}
                />
              </DialogContent>
            </div>
          )}
          {isLoggedIn && <Alert severity="success">You are Registered!</Alert>}

          {Isunauthorized && (
            <Alert severity="error">Please input valid data!</Alert>
          )}

          <DialogActions>
            <NavLink to="/">
              <Button onClick={handleClose} sx={{textDecoration:"none"}}>Cancel</Button>
            </NavLink>
            <Button
              disabled={isLoggedIn}
              variant="contained"
              onClick={handleSubmit}
              type="submit"
            >
              Register
            </Button>
          </DialogActions>
        </Dialog>
      </form>
      {}
    </>
  );
}
