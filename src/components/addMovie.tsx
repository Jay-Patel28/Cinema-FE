import { Alert, Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useSnackbar } from "notistack";
import axios from "axios";
import ActorsList from "./actorsList";
export default function AddMovie() {
  const [movieName, setMovieName] = useState("");
  const [totalViews, setTotalViews] = useState(0);
  const [added, setAdded] = useState(false);
  const [addedFail, setAddedFail] = useState(false);
  const [inputList, setInputList] = useState([{}]);

  const { enqueueSnackbar } = useSnackbar();

  const handleOnChange = (e: any, index: number) => {
    console.log("index: e: ", index, " ", e.target.value);

    const { value } = e.target;
    console.log("value: 1", value);
    const list = [...inputList];
    list[index] = value;
    setInputList(list);
    console.log("inputList: ", inputList);
  };

  const handleReleaseChange = () => {};

  const handleMovieNameChange = (e: any) => {
    setMovieName(e.target.value);
  };
  const handleViewsChange = (e: any) => {
    setTotalViews(e.target.value);
  };

  const setActorsInputFromChild = (list: any) => {
    console.log("setActorsInputFromChild: ", list);
    setInputList(list);
  };

  const addActor = async () => {
    console.log("inputList: ", inputList);
    const filtered = inputList.filter(function (el) {
      return el != null;
    });
    console.log("filtered: ", filtered);
    const actors = filtered.map((actorId) => {
      if (actorId !== null) {
        return {
          actorId: actorId,
        };
      }
    });

    console.log("actors: ", actors);
    const res: any = await addRequest({
      movieName: movieName,
      totalViews: totalViews,
      actorDTOs: actors,
    });
    console.log("res.status: ", res);
  };

  const addRequest = async (data: any) => {
    axios
      .post("https://localhost:7114/movie", data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        if (res.status === 200) {
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
            <Grid item xs={3}>
              <TextField
                id="outlined-basic"
                label="Movie Name"
                variant="outlined"
                onChange={handleMovieNameChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="outlined-basic"
                label="Total views"
                variant="outlined"
                onChange={handleViewsChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="outlined-basic"
                label="Realease Date"
                variant="outlined"
                onChange={handleReleaseChange}
              />
            </Grid>
            {/* {""}
            <Grid item xs={15}>
              <Typography variant="h5" component="div">
                Add Actors for new Movie
              </Typography>
            </Grid>

            {Array.from(Array(counter)).map((c, index) => {
              return (
                <Grid item xs={15}>
                  <TextField
                    key={c}
                    id="outlined-basic"
                    label="Actor Id"
                    variant="outlined"
                    onChange={(e) => handleOnChange(e, index)}
                  />
                </Grid>
              );
            })} */}

            {/* <Grid item xs={3}>
              <Button
                onClick={handleClick}
                size="small"
                variant="outlined"
                color="info"
              >
                Add more
              </Button>
            </Grid> */}

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

            {/* {added && (
              <Grid item xs={4}>
                <Alert variant="filled" severity="success">
                  Movie Added successfully!
                </Alert>
              </Grid>
            )} */}
          </Grid>
        </div>
      </Box>
    </>
  );
}
