import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useState } from "react";

export default function DeleteActor() {
  const [delId, setDelId] = useState<string>("");
  const { enqueueSnackbar } = useSnackbar();

  const handleIdChange = (e:  React.ChangeEvent<HTMLInputElement>) => {
    setDelId(e.target.value);
  };

  const deleteActor = async () => {
    await delRequest(delId);
  };

  const delRequest = async (data: string) => {
    axios
      .delete(`https://localhost:7114/actor/${data}`)
      .then((res) => {
        if (res.status === 200) {
          enqueueSnackbar("Actor Deleted successfully!", { variant: "success" });
          console.log("Success");
        }
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
                Delete Actor from database
              </Typography>
            </Grid>

            <Grid item xs={15}>
              <TextField
                style={{ width: "400px" }}
                id="outlined-basic"
                label="Actor Id"
                variant="outlined"
                onChange={handleIdChange}
              />
            </Grid>
            <Grid item xs={15}>
              <Button
                onClick={deleteActor}
                size="large"
                variant="contained"
                color="error"
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        </div>
      </Box>
    </>
  );
}
