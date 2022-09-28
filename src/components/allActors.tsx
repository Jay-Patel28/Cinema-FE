import DeleteForeverIcon from "@mui/icons-material/DeleteForeverTwoTone";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";
import { actorDTO } from "../DTOs/actorDTO";

interface propsInterface {
  actors: Array<actorDTO>;
  loading: boolean;
  loadAllActors: Function;
}
export default function AllActors({ actors, loadAllActors, loading }: any) {
  const { enqueueSnackbar } = useSnackbar();

  const deleteActor = (actorId: string, name: string) => {
    axios.delete(`https://localhost:7114/actor/${actorId}`).then((res) => {
      if (res.status === 200) {
        enqueueSnackbar(`${name} has been deleted successfully!`, {
          variant: "success",
        });
        loadAllActors();
      } else {
        enqueueSnackbar("Error deleting the movie!", { variant: "error" });
      }
    });
  };

  if (loading) {
    return (
      <div
        data-testid="loading_all_actors"
        style={{
          width: "100%",
          height: "300px",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <CircularProgress color="success" />
      </div>
    );
  }

  return (
    <div
      data-testid="actors_container"
      style={{ display: "flex", width: "100%" }}
    >
      {actors?.length > 0 &&
        actors.map((actor: actorDTO) => {
          return (
            <div key={actor.actorId}>
              <Card
                sx={{ minWidth: 275, background: "gainsboro", margin: "15px" }}
              >
                <CardContent>
                  <Typography variant="h5" component="div">
                    {actor.firstName}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {actor.lastName}
                  </Typography>
                  <Typography variant="body2">
                    Total Net worth : {actor.wealth}$
                  </Typography>
                </CardContent>
                <CardActions>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <Button size="medium">Learn More</Button>
                    <Button
                      name="delete_actor"
                      size="large"
                      color="error"
                      onClick={() =>
                        deleteActor(actor.actorId, actor.firstName)
                      }
                    >
                      <DeleteForeverIcon />
                    </Button>
                  </div>
                </CardActions>
              </Card>
            </div>
          );
        })}
    </div>
  );
}
