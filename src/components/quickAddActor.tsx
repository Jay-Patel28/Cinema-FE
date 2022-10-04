import { Box, Typography, TextField, Button } from "@mui/material";
import { FormEvent } from "react";
import { addActorRequest } from "../commonFunctions/addActor";
import { actorDTO } from "../DTOs/actorDTO";
import { newActorDTO } from "../DTOs/newActorDTO";
import allActors from "./allActors";

interface inputProps{
    addNewActorToList : Function;
}

export default function QuickAddActor({addNewActorToList}:inputProps) {

    const addNewActor = async (e: any) => {
        e.preventDefault();
    
        const newActor: newActorDTO = {
          FirstName: e.target.elements.newactorfname.value,
          LastName: e.target.elements.newactorlname.value,
          Wealth: e.target.elements.newactorwealth.value,
        };
    
        const actor: actorDTO = await addActorRequest(newActor);
        addNewActorToList(actor);
      };


    return(
        <Box
        sx={{
          display: "flex",
          alignItems: "center",
          border: "solid",
          borderRadius: "10px",
          borderColor: "lightblue",
        }}
      >
        <div style={{ padding: "10px", minWidth: "200px" }}>
          <form onSubmit={(e) => addNewActor(e)}>
            <Typography variant="body1">Quickly Add a new Actor</Typography>
            <TextField
              sx={{ margin: "10px" }}
              name="newactorfname"
              size="small"
              label="First Name"
              variant="outlined"
            />{" "}
            <TextField
              sx={{ margin: "10px" }}
              name="newactorlname"
              size="small"
              label="Last Name"
              variant="outlined"
            />
            <TextField
              sx={{ margin: "10px" }}
              name="newactorwealth"
              size="small"
              label="Wealth"
              variant="outlined"
            />
            <Button
              sx={{ margin: "10px" }}
              variant="contained"
              type="submit"
              size="small"
            >
              Add Actor
            </Button>
          </form>
        </div>
      </Box>
    )
}
