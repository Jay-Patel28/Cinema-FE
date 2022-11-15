import { Box, Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { handleAuth } from "../commonFunctions/authorised";
import { fetchAllActors } from "../commonFunctions/fetchAllActors";
import { actorDTO } from "../DTOs/actorDTO";
import AddActor from "./addActor";
import AllActors from "./allActors";

export default function Actor() {
  const [allActors, setAllActors] = useState<Array<actorDTO>>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  const loadAllActors = async () => {
    setLoading(true);
    setAllActors([]);
    const actors: Array<actorDTO> = await fetchAllActors();
    setAllActors(actors);
    setLoading(false);
  };

  useEffect(() => {
    if (!handleAuth()) navigate("/login", { state: location.pathname });
  }, []);

  return (
    <>
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
          onClick={() => loadAllActors()}
          variant="contained"
        >
          Load All Actors
        </Button>
        {!(allActors == null) && (
          <Grid container>
            <AllActors
              actors={allActors}
              loading={isLoading}
              loadAllActors={loadAllActors}
            />
          </Grid>
        )}
      </Box>
      <AddActor loadAllActors={loadAllActors} />
      {/* <DeleteActor /> */}
    </>
  );
}
