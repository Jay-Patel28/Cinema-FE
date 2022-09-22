import * as React from "react";
import { useState } from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import "../index.css";
import Login from "./login";
import Register from "./register";
import { NavLink } from "react-router-dom";
export default function Navbar() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ backgroundColor: "#8B8000" }}>
          <Toolbar variant="dense">
            <NavLink to="/">
              <Typography
                color="white"
                variant="h4"
                component="div"
              >
                Cinema
              </Typography>
            </NavLink>
            <div
              style={{
                display: "flex",
                textDecoration: "none",
                color: "black",
              }}
            >
              <NavLink to="/actor">
                <Typography
                  variant="h6"
                  color="white"
                  component="div"
                  sx={{ marginLeft: "50px" }}
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
                  sx={{ marginLeft: "50px" }}
                  className="register"
                >
                  Movies
                </Typography>
              </NavLink>

              <NavLink to="/login">
                <Typography
                  variant="h6"
                  color="white"
                  component="div"
                  sx={{ marginLeft: "50px", justifyContent: "right" }}
                  className="register"
                >
                  Login
                </Typography>
              </NavLink>
              <NavLink to="/register">
                <Typography
                  variant="h6"
                  color="white"
                  component="div"
                  sx={{ marginLeft: "50px", justifyContent: "right" }}
                  className="register"
                >
                  Register
                </Typography>
              </NavLink>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
