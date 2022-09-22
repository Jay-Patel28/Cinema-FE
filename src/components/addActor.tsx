import { Alert, Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";

export default function AddActor(props:any) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [wealth, setWealth] = useState(0);

  const { enqueueSnackbar } = useSnackbar();

  const handleFirstNameChange = (e: any) => {
    setFirstName(e.target.value);
  };
  const handleLastNameChange = (e: any) => {
    setLastName(e.target.value);
  };
  const handleWealthChange = (e: any) => {
    setWealth(e.target.value);
  };

  const addActor = async () => {
    const res: any = await addRequest({
      FirstName: firstName,
      LastName: lastName,
      Wealth: wealth,
    });
    console.log("res.status: ", res);
  };

  const addRequest = async (data: any) => {
    axios
      .post("https://localhost:7114/actor", data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        if (res.status === 200) {
          props.loadAllActors();
          enqueueSnackbar("Actor Added successfully!", { variant: "success" });
          console.log("Success");
        }
        return res;
      })
      .catch((err) => {
        console.log("err: ", err);
        if (err.response.status !== 200) {
          enqueueSnackbar("Error!", { variant: "error" });
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
                Add a new Actor
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="outlined-basic"
                label="FirstName"
                variant="outlined"
                onChange={handleFirstNameChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="outlined-basic"
                label="LastName"
                variant="outlined"
                onChange={handleLastNameChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="outlined-basic"
                label="Total Wealth"
                variant="outlined"
                onChange={handleWealthChange}
              />
            </Grid>
            <Grid item xs={3}>
              <Button onClick={addActor} size="large" variant="contained">
                Add
              </Button>
            </Grid>
          </Grid>
        </div>
      </Box>
    </>
  );
}
