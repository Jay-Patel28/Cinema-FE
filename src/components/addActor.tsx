import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { addActorRequest } from "../commonFunctions/addActor";
import { actorDTO } from "../DTOs/actorDTO";
import { newActorDTO } from "../DTOs/newActorDTO";

interface propsInterface {
  loadAllActors: Function;
}

export default function AddActor(props: propsInterface) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [wealth, setWealth] = useState<number>(0);

  const { enqueueSnackbar } = useSnackbar();

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };
  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };
  const handleWealthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const wealth = e.target.value;
    setWealth(parseInt(wealth));
  };

  const addActor = async () => {
    const newActor: newActorDTO = {
      FirstName: firstName,
      LastName: lastName,
      Wealth: wealth,
    };

    const response: actorDTO = await addActorRequest(newActor);
    if (response !== null) {
      props.loadAllActors();
      enqueueSnackbar(`${response.firstName} Added successfully!`, { variant: "success" });
    } else {
      enqueueSnackbar("Error! Please try Again.", { variant: "error" });
    }
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
                data-testid="add_fname"
                id="outlined-basic"
                label="FirstName"
                variant="outlined"
                onChange={handleFirstNameChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                data-testid="add_lname"
                id="outlined-basic"
                label="LastName"
                variant="outlined"
                onChange={handleLastNameChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                data-testid="add_wealth"
                id="outlined-basic"
                label="Total Wealth"
                variant="outlined"
                type='number'
                onChange={handleWealthChange}
              />
            </Grid>
            <Grid item xs={3}>
              <Button
                data-testid="add_actor_button"
                onClick={addActor}
                size="large"
                variant="contained"
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
