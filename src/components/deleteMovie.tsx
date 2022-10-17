import { Alert, Box, Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { baseUrl } from "../constants/global";

export default function DeleteMovie() {
  const [delId, setDelId] = useState<string>("");

  const [added, setAdded] = useState(false);
  const [addedFail, setAddedFail] = useState(false);

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDelId(e.target.value);
  };
  const { enqueueSnackbar } = useSnackbar();

  const deleteMovie = () => {
    delRequest(delId);
  };

  const delRequest = async (data: string) => {
    axios
      .delete(`${baseUrl}/movie/${data}`)
      .then((res) => {
        if (res.status === 200) {
          enqueueSnackbar("Movie Deleted successfully!", {
            variant: "success",
          });
        }
        setAdded(true);
        return res;
      })
      .catch((err) => {
        if (err.response.status !== 200) {
          enqueueSnackbar(`${err.response.status} Error!`, {
            variant: "error",
          });
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
                Delete Movie Record
              </Typography>
            </Grid>

            <Grid item xs={15}>
              <TextField
                style={{ width: "400px" }}
                id="outlined-basic"
                label="Movie Id"
                variant="outlined"
                onChange={handleIdChange}
              />
            </Grid>
            <Grid item xs={15}>
              <Button
                onClick={deleteMovie}
                size="large"
                variant="contained"
                color="error"
              >
                Delete By Id
              </Button>
            </Grid>

            {added && (
              <Grid item xs={4}>
                <Alert variant="filled" severity="error">
                  Movie Deleted successfully!
                </Alert>
              </Grid>
            )}
          </Grid>
        </div>
      </Box>
    </>
  );
}
