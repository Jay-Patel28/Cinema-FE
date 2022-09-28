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
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { useSnackbar } from "notistack";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LoginIcon from "@mui/icons-material/Login";
import { loginRequestDTO } from "../DTOs/loginRequestDTO";

export default function Login() {
  const handleClickOpen = () => {
    setOpen(true);
  };
  const { state } = useLocation();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  // const [data, setData] = useState({});
  const [open, setOpen] = useState(true);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [Isunauthorized, setUnauthorized] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUnauthorized(false);
    setEmail(e.target.value);
  };
  const handlePassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUnauthorized(false);

    setPass(e.target.value);
    console.log(pass);
  };

  const handleSubmit = async () => {
    console.log('handleSubmit: ');
    const loginCreds: loginRequestDTO = {
      username: email,
      password: pass,
    };

    loginRequest(loginCreds);
  };

  const loginRequest = async (data: loginRequestDTO) => {
    axios
      .post("https://localhost:7114/api/Authenticate/login", data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        localStorage.setItem("jwt", res.data.token.toString());
        if (res.status === 200) {
          setLoggedIn(true);
        }
        enqueueSnackbar("You are logged in!", { variant: "success" });
        navigate(state ? state : "/");
      })
      .catch((err) => {
        console.log("err: ", err);
        if (err.response.status === 401) {
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
              <DialogTitle data-testid="Login_title">Login</DialogTitle>
              <DialogContent>
                <TextField
                  data-testid="email_input"
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Username"
                  type="text"
                  fullWidth
                  required
                  variant="outlined"
                  onChange={handleEmailChange}
                />
                <TextField
                  data-testid="pass_input"
                  margin="dense"
                  required
                  id="pass"
                  label="Password"
                  type="password"
                  fullWidth
                  variant="outlined"
                  onChange={handlePassChange}
                />
              </DialogContent>
            </div>
          )}
          {isLoggedIn && <Alert severity="success">You are logged in !!</Alert>}

          {Isunauthorized && (
            <Alert severity="error">Username or Password Invalid!</Alert>
          )}

          <DialogActions>
            <div
              style={{
                justifyContent: "space-between",
                width: "100%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div style={{ justifyContent: "left" }}>
                {" "}
                <NavLink to="/register">
                  <Button
                    disabled={isLoggedIn}
                    variant="outlined"
                    type="submit"
                  >
                    Register
                    <PersonAddIcon
                      sx={{ fontSize: "20px", marginLeft: "5px" }}
                    />
                  </Button>
                </NavLink>
              </div>
              <div style={{ justifyContent: "left" }}>
                <NavLink to="/">
                  <Button onClick={handleClose}>Cancel</Button>
                </NavLink>
                <Button
                  data-testid="login_button"
                  disabled={isLoggedIn}
                  variant="contained"
                  onClick={handleSubmit}
                  type="submit"
                >
                  Login
                  <LoginIcon sx={{ fontSize: "20px", marginLeft: "5px" }} />
                </Button>
              </div>
            </div>
          </DialogActions>
        </Dialog>
      </form>
      {}
    </>
  );
}
