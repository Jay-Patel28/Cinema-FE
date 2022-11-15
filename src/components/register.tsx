import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { RegReq } from "../commonFunctions/registerService";
import { RegistrationRequestDTO } from "../DTOs/registerRequestDTO";
import { useSnackbar } from "notistack";

export default function Register({ setShowRegPrompt }: any) {
  const { enqueueSnackbar } = useSnackbar();
  const [regError, setRegError] = useState({
    isRegError: false,
    errorMessage: null,
  });
  const [email, setEmail] = useState("");

  const [uName, setuName] = useState("");
  const [pass, setPass] = useState("");
  const handleClose = () => {
    setShowRegPrompt(false);
  };
  const navigate = useNavigate();
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setRegError({ ...regError, isRegError: false });
    setEmail(e.target.value);
  };

  const handleUsernameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setRegError({ ...regError, isRegError: false });
    setuName(e.target.value);
  };

  const handlePassChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPass(e.target.value);
    setRegError({ ...regError, isRegError: false });
  };
  const handleSubmit = async () => {
    const regData = {
      username: uName,
      email: email,
      password: pass,
    };
    registerRequest(regData);
  };

  const registerRequest = async (data: RegistrationRequestDTO) => {
    const response = await RegReq(data);
    console.log("response: jp ", response);
    if (response.status === 200) {
      enqueueSnackbar("Registered successfully!", { variant: "info" });
      navigate("/login");
    } else {
      setRegError({
        errorMessage: response?.response?.data?.message
          ? response?.response?.data?.message
          : response?.response?.data?.title,
        isRegError: true,
      });
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
          {
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
                  value={uName}
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
                  value={email}
                  onChange={handleEmailChange}
                />
                <TextField
                  data-testid="reg_password"
                  margin="dense"
                  id="pass"
                  label="Password"
                  type="password"
                  fullWidth
                  value={pass}
                  variant="outlined"
                  required
                  onChange={handlePassChange}
                />
              </DialogContent>
            </div>
          }
          {regError.isRegError && (
            <>
              <Alert variant="filled" severity="error">
                {regError.errorMessage}{" "}
              </Alert>
            </>
          )}
          <Alert severity="info">
            Password should contain each of a special character, a number, an
            alphabate.{" "}
          </Alert>
          <DialogActions>
            <NavLink to="/">
              <Button onClick={handleClose} sx={{ textDecoration: "none" }}>
                Cancel
              </Button>
            </NavLink>
            <Button
              disabled={
                !(pass.length !== 0 && uName.length !== 0 && email.length !== 0)
              }
              data-testid="reg_submit"
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
