import { Box, Button, Grid } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import AddActor from "./addActor";
import AllActors from "./allActors";
import DeleteActor from "./deleteActor";

export default function Actor() {
  const [allActors, setAllActors] = useState({});
  const [isLoading, setLoading] = useState(false);

  const loadAllActors = async () => {
    console.log('loadAllActors: ');
    setLoading(true);
    setAllActors({});
    axios.get("https://localhost:7114/actors").then((res) => {
      console.log("res: ", res);

      setTimeout(() => {
        setAllActors(res.data);
        setLoading(false);
      }, 500);
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
          Load All Actors
        </Button>
        {!(allActors == null) && (
          <Grid container xs={12}>
            <AllActors actors={allActors} loading={isLoading} loadAllActors={loadAllActors}/>
          </Grid>
        )}
      </Box>
      <AddActor loadAllActors={loadAllActors}/>
      <DeleteActor />
    </>
  );
}