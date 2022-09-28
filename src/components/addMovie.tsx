import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useState } from "react";
import ActorsList from "./actorsList";
import dayjs, { Dayjs } from "dayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { actorDTO } from "../DTOs/actorDTO";
import { actorwithId, addMovieDTO, movieDTO } from "../DTOs/movieDTO";

interface propsInterface {
  loadAllMovies: Function;
}


export default function AddMovie(props: propsInterface) {
  const [movieName, setMovieName] = useState("");
  const [totalViews, setTotalViews] = useState(0);
  const [releaseDate, setReleaseDate] = useState(new Date());
  const [added, setAdded] = useState(false);
  const [addedFail, setAddedFail] = useState(false);
  const [inputList, setInputList] = useState([{}]);

  const { enqueueSnackbar } = useSnackbar();

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    console.log("index: e: ", index, " ", e.target.value);

    const { value } = e.target;
    console.log("value: 1", value);
    const list = [...inputList];
    list[index] = value;
    setInputList(list);
    console.log("inputList: ", inputList);
  };

  const handleMovieNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMovieName(e.target.value);
  };
  const handleViewsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTotalViews(parseInt(e.target.value));
    console.log("e.target.value: ", e.target.value);
  };

  const setActorsInputFromChild = (list: Array<actorDTO>) => {
    console.log("setActorsInputFromChild: ", list);
    setInputList(list);
  };

  const addActor = async () => {
    console.log("inputList: ", inputList);
    const filtered = inputList.filter(function (el) {
      return el != null;
    });
    console.log("filtered: ", filtered);

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

    console.log("actors: ", actors);
    addRequest(movie);
  };

  const addRequest = async (data: addMovieDTO) => {
    axios
      .post("https://localhost:7114/movie", data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        if (res.status === 200) {
          props.loadAllMovies();
          enqueueSnackbar("Movie is Added successfully!", {
            variant: "success",
          });
          console.log("Success Added Movie");
        }
        setAdded(true);
        return res;
      })
      .catch((err) => {
        console.log("err: ", err);
        if (err.response.status !== 200) {
          setAddedFail(true);
        }
      });
  };

  // const handleReleaseChange = (newValue: string) => {
  //   console.log("newValue: ", newValue);
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
                id="outlined-basic"
                label="Movie Name"
                variant="outlined"
                onChange={handleMovieNameChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
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
            {/* 

            <LocalizationProvider dateAdapter={AdapterMoment}>
            <DesktopDatePicker
          label="Date desktop"
          inputFormat="DD/MM/YYYY"
          value={moment().format() }
          onChange={handleReleaseChange}
          renderInput={(params) => <TextField {...params} />}
        /></LocalizationProvider> */}

            <Grid item xs={15}>
              <Typography variant="h5" component="div">
                Add Actors for new Movie
              </Typography>
            </Grid>

            <ActorsList setActorsInputFromChild={setActorsInputFromChild} />

            <Grid item xs={15}>
              <Button
                onClick={addActor}
                size="large"
                variant="contained"
                color="success"
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </div>
      </Box>
    </>
  );
}
