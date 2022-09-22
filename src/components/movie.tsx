import { Box, Button, Grid } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import AddActor from "./addActor";
import AddMovie from "./addMovie";
import AllMovies from "./allMovies";
import DeleteActor from "./deleteActor";
import DeleteMovie from "./deleteMovie";


export default function Actor() {
  const [allMovies, setAllMovies] = useState({});
  const [isLoading, setLoading] = useState(false);

  const loadAllActors = async () => {
    setLoading(true);
    setAllMovies({});
    axios.get("https://localhost:7114/movies").then((res) => {
      console.log("res: ", res);

      setTimeout(() => {
        setAllMovies(res.data);
        setLoading(false);
      }, 3000);
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
        <Button
          sx={{ margin: "20px" }}
          onClick={loadAllActors}
          variant="contained"
        >
          Load All Movies
        </Button>
        {!(allMovies == null) && (
          <Grid container xs={12}>
            <AllMovies movies={allMovies} loading={isLoading} />
          </Grid>
        )}
      </Box>
      <AddMovie />
      <DeleteMovie />
    </>
  );
}
