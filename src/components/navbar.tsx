import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { handleAuth } from "../commonFunctions/authorised";
import "../index.css";

export default function Navbar() {
  const [isLoggedIn, setLoggedIn] = useState(handleAuth);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    enqueueSnackbar("Logged out", { variant: "error" });
    navigate("/");
  };
  useEffect(() => {
    setLoggedIn(handleAuth);
    console.log("JJJJJ");
    
  });

  return (
    <>
      <Box sx={{ flexGrow: 5 }}>
        <AppBar position="static" style={{ backgroundColor: "#000000" }}>
          <Toolbar variant="dense">
            <NavLink to="/">
              <Typography
                color="darkorange"
                variant="h3"
                component="div"
                sx={{ fontFamily: "Helvetica", fontWeight: "bold" }}
              >
                Cinema
              </Typography>
            </NavLink>
            <div
              style={{
                display: "flex",
                textDecoration: "none",
                color: "black",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  justifyContent: "left",
                  width: "50%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <NavLink to="/actor">
                  <Typography
                    variant="h6"
                    color="white"
                    component="div"
                    sx={{ fontFamily: "Helvetica", marginLeft: "30px" }}
                    className="register"
                  >
                    Actors
                  </Typography>
                </NavLink>
                <NavLink to="/movie">
                  <Typography
                    variant="h6"
                    color="white"
                    component="div"
                    sx={{ fontFamily: "Helvetica", marginLeft: "30px" }}
                    className="register"
                  >
                    Movies
                  </Typography>
                </NavLink>
              </div>
              <div
                style={{
                  justifyContent: "right",
                  width: "50%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {!isLoggedIn ? (
                  <>
                    <NavLink to="/login">
                      <Typography
                        variant="h6"
                        color="white"
                        component="div"
                        sx={{ marginLeft: "30px", justifyContent: "right" }}
                        className="register"
                      >
                        SignIn
                      </Typography>
                    </NavLink>
                    <NavLink to="/register">
                      <Typography
                        variant="h6"
                        color="white"
                        component="div"
                        sx={{ marginLeft: "30px", justifyContent: "right" }}
                        className="register"
                      >
                        Register
                      </Typography>
                    </NavLink>
                  </>
                ) : (
                  <>
                    <Typography
                      variant="h6"
                      color="darkorange"
                      component="div"
                      sx={{ marginLeft: "50px", justifyContent: "right" }}
                      className="register"
                      onClick={handleLogOut}
                    >
                      Sign Out
                    </Typography>
                  </>
                )}
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
