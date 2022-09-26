import { Box, Button, Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import {  handleAuth } from "../commonFunctions/authorised";
import AddMovie from "./addMovie";
import AllMovies from "./allMovies";
import DeleteMovie from "./deleteMovie";
import MovieSearch from "./movieSearch";

export default function Actor() {
  const [allMovies, setAllMovies] = useState({});
  const [isLoading, setLoading] = useState(false);
  const {state} = useLocation();
  const navigate = useNavigate();
  const location :any = useLocation();

  useEffect(() => {
    if (!handleAuth()) navigate("/login", {state: location.pathname});
  }, []);

  const loadAllMovies = () => {
    setLoading(true);
    setAllMovies({});
    axios.get("https://localhost:7114/movies").then((res) => {
      setTimeout(() => {
        setAllMovies(res.data);
        setLoading(false);
      }, 500);
    });
  };

  return (
    <>
      {/* <Navbar/> */}
      <Box
        sx={{
          border: "3px solid grey ",
          borderRadius: "20px",
          margin: "50px",
        }}
      >
        {" "}
        <MovieSearch />
        <Button
          sx={{ marginLeft: "50px" }}
          onClick={loadAllMovies}
          variant="outlined"
        >
          Or load All Movies
        </Button>
        {!(allMovies == null) && (
          <Grid container xs={16} sx={{ margin: "30px" }}>
            <AllMovies
              loadAllMovies={loadAllMovies}
              movies={allMovies}
              loading={isLoading}
            />
          </Grid>
        )}
        <AddMovie loadAllMovies={loadAllMovies}/>
        <DeleteMovie />
      </Box>
    </>
  );
}
