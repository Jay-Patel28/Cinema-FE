import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LoginReq } from "../commonFunctions/loginService";
import { loginRequestDTO } from "../DTOs/loginRequestDTO";

export const LoginDialog = ({ setShowSignInPrompt }: any) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [Isunauthorized, setUnauthorized] = useState(false);

  const handleClose = () => {
    setShowSignInPrompt(false);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUnauthorized(false);
    setEmail(e.target.value);
  };
  const handlePassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUnauthorized(false);

    setPass(e.target.value);
  };

  const handleSubmit = async () => {
    const loginCreds: loginRequestDTO = {
      username: email,
      password: pass,
    };

    loginRequest(loginCreds);
  };

  const loginRequest = async (data: loginRequestDTO) => {
    const resp: any = await LoginReq(data);
    if (resp?.status === 200) {
      setLoggedIn(true);
      enqueueSnackbar("You are logged in!", { variant: "success" });
      navigate(state ? state : "/");
      setShowSignInPrompt(false);
    } else {
      setUnauthorized(true);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Dialog
          open={true}
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
                  value={email}
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
                  value={pass}
                  onChange={handlePassChange}
                />
              </DialogContent>
            </div>
          )}
          {isLoggedIn && <Alert severity="success">You are logged in !!</Alert>}

          {Isunauthorized && (
            <Alert data-testid="error_unauth" severity="error">
              Username or Password Invalid!
            </Alert>
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
                  disabled={!(pass.length !== 0 && email.length !== 0)}
                  data-testid="login_button"
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
};

export default LoginDialog;
