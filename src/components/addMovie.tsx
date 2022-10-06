import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { addMovieRequest } from "../commonFunctions/addMovie";
import { actorDTO } from "../DTOs/actorDTO";
import { addMovieDTO } from "../DTOs/movieDTO";
import ActorsList from "./actorsList";
import { Navigate, useNavigate } from "react-router-dom";
interface propsInterface {
  loadAllMovies: Function;
}

export default function AddMovie(props: propsInterface) {
  const navigate = useNavigate();
  const [movieName, setMovieName] = useState("");
  const [totalViews, setTotalViews] = useState(0);
  const [releaseDate, setReleaseDate] = useState(new Date());
  const [inputList, setInputList] = useState([{}]);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  // const handleOnChange = (
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   index: number
  // ) => {

  //   const { value } = e.target;
  //   const list = [...inputList];
  //   list[index] = value;
  //   setInputList(list);
  // };

  const handleMovieNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMovieName(e.target.value);
  };
  const handleViewsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTotalViews(parseInt(e.target.value));
  };

  const setActorsInputFromChild = (list: Array<actorDTO>) => {
    setInputList(list);
  };

  const addActor = async () => {
    const filtered = inputList.filter(function (el) {
      return el != null;
    });

    const actors: any = filtered.map((actorid) => {
      if (actorid !== null) {
        return {
          actorId: actorid,
        };
      }
    });

    const movie: addMovieDTO = {
      movieName: movieName,
      totalViews: totalViews,
      actorDTOs: actors,
    };

    addRequest(movie);
  };

  const addRequest = async (data: addMovieDTO) => {
    const res = await addMovieRequest(data);
    if (res?.status === 200) {
      props.loadAllMovies();

      const action = (snackbarId: any) => (
        <>
          <Button
            sx={{ marginRight: "5px", color: "white" }}
            variant="text"
            size="small"
            onClick={() => {
              navigate(`/movie/${res.movie?.id}`);
            }}
          >
            View
          </Button>
          <Button
            sx={{ marginRight: "5px", color: "white" }}
            variant="text"
            color="error"
            size="small"
            onClick={() => {
              closeSnackbar(snackbarId);
            }}
          >
            Dismiss
          </Button>
        </>
      );

      enqueueSnackbar("Movie is Added successfully!", {
        variant: "success",
        action,
      });
    } else {
      enqueueSnackbar("Error adding the movie!", {
        variant: "error",
      });
    }
    // });
  };

  // const handleReleaseChange = (newValue: string) => {
  // };
  return (
    <>
      <Box
        sx={{ border: "3px solid grey ", borderRadius: "20px", margin: "50px" }}
      >
        <div style={{ margin: "50px", gap: "20px" }}>
          <Grid container spacing={2} columns={15}>
            <Grid item xs={15}>
              {" "}
              <Typography variant="h5" component="div">
                Add a new Movie
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                data-testid="movieNameInput"
                id="outlined-basic"
                label="Movie Name"
                variant="outlined"
                onChange={handleMovieNameChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                data-testid="movieViewsInput"
                id="outlined-basic"
                label="Total views"
                variant="outlined"
                onChange={handleViewsChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="outlined-basic"
                label="Realease Date"
                variant="outlined"
                // onChange={handleReleaseChange}
              />
            </Grid>

            <Grid item xs={15}>
              <Typography variant="h5" component="div">
                Add Actors for new Movie
              </Typography>
            </Grid>

            <ActorsList setActorsInputFromChild={setActorsInputFromChild} />
            <Grid item xs={15}>
              <Button
                sx={{ marginTop: "20px" }}
                onClick={addActor}
                size="large"
                variant="contained"
                color="success"
                data-testid="addMovieButton"
              >
                Add Movie
              </Button>
            </Grid>
          </Grid>
        </div>
      </Box>
    </>
  );
}
