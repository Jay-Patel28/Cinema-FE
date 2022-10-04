import { Box, Button, Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { handleAuth } from "../commonFunctions/authorised";
import { fetchAllMovies } from "../commonFunctions/fetchAllMovies";
import { movieDTO } from "../DTOs/movieDTO";
import AddMovie from "./addMovie";
import AllMovies from "./allMovies";
import DeleteMovie from "./deleteMovie";
import MovieSearch from "./movieSearch";

export default function Movie() {
  const [allMovies, setAllMovies] = useState<Array<movieDTO>>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!handleAuth()) navigate("/login", { state: location.pathname });
  }, []);

  const loadAllMovies = async () => {
    setLoading(true);
    const res: Array<movieDTO> = await fetchAllMovies();
    console.log("res: ", res);

    setAllMovies(res);
    setLoading(false);
  };

  return (
    <>
      <Box
        sx={{
          border: "3px solid grey ",
          borderRadius: "20px",
          margin: "50px",
        }}
      >
        {" "}
        <MovieSearch />
        {!allMovies.length ? (
          <Button
            sx={{ marginLeft: "50px" }}
            onClick={loadAllMovies}
            variant="outlined"
          >
            Or load All Movies
          </Button>
        ) : (
          <div>
            <Grid container sx={{ margin: "30px" }}>
              <AllMovies
                loadAllMovies={loadAllMovies}
                movies={allMovies}
                loading={isLoading}
              />
            </Grid>
            <Button
              sx={{ marginLeft: "50px" }}
              variant="outlined"
              onClick={() => setAllMovies([])}
            >
              Hide All
            </Button>
          </div>
        )}
        <AddMovie loadAllMovies={loadAllMovies} />
        <DeleteMovie />
      </Box>
    </>
  );
}
