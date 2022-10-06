import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Typography
} from "@mui/material";
import { useSnackbar } from "notistack";
import { deleteActorService } from "../commonFunctions/deleteActor";
import { actorDTO } from "../DTOs/actorDTO";

interface propsInterface {
  actors: Array<actorDTO>;
  loading: boolean;
  loadAllActors: Function;
}
export default function AllActors({ actors, loadAllActors, loading }: any) {
  const { enqueueSnackbar } = useSnackbar();

  const deleteActor = async (actorId: string, name: string) => {
    const response = await deleteActorService(actorId);
    if (response.status === 200) {
      enqueueSnackbar(`${name} has been deleted successfully!`, {
        variant: "success",
      });
      loadAllActors();
    } else {
      enqueueSnackbar("Error deleting the actor!", { variant: "error" });
    }
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
    <>
      {actors?.length > 0 ? (
        actors.map((actor: actorDTO) => {
          return (
            <div key={actor.actorId}>
              <Card
                sx={{ minWidth: 275, background: "gainsboro", margin: "10px" }}
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
                    startIcon={<DeleteIcon />}
                      data-testid="delete_actor"
                      size="large"
                      color="error"
                      onClick={() =>
                        deleteActor(actor.actorId, actor.firstName)
                      }
                    >

                    </Button>
                  </div>
                </CardActions>
              </Card>
            </div>
          );
        })
      ) : (
        <Typography variant="body2" component="div" margin="20px">
          Click the action above to load actors.
        </Typography>
      )}
    </>
  );
}
