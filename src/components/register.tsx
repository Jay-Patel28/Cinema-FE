import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { registerRequestDTO } from "../DTOs/registerRequestDTO";
export default function Register() {
  const [open, setOpen] = useState(true);
  const [email, setEmail] = useState("");

  const [uName, setuName] = useState("");
  const [pass, setPass] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [Isunauthorized, setUnauthorized] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUnauthorized(false);
    setEmail(e.target.value);
  };

  const handleUsernameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setUnauthorized(false);

    setuName(e.target.value);
  };

  const handlePassChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUnauthorized(false);

    setPass(e.target.value);
    console.log(pass);
  };
  const handleSubmit = async () => {
    const regData = {
      username: uName,
      email: email,
      password: pass,
    };
    registerRequest(regData);
  };

  const registerRequest = async (data: registerRequestDTO) => {
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
                  data-testid="reg_username"
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
                  data-testid="reg_email"
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
                  data-testid="reg_password"
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
              <Button onClick={handleClose} sx={{ textDecoration: "none" }}>
                Cancel
              </Button>
            </NavLink>
            <Button
              data-testid="reg_submit"
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
