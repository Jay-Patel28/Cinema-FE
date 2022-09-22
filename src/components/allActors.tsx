import DeleteForeverIcon from "@mui/icons-material/DeleteForeverTwoTone";
import {
  Button,
  Card,
  CardActions,
  CardContent, CircularProgress, Typography
} from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";

export default function AllActors(props: any) {
  
  const { enqueueSnackbar } = useSnackbar();

  const deleteActor = (actorId: any, name:string) => {
    axios.delete(`https://localhost:7114/actor/${actorId}`)
    .then((res)=>{
      if(res.status === 200){
        enqueueSnackbar(`${name} has been deleted successfully!`, { variant: 'success' })
        props.loadAllActors();
      }
      else{
        enqueueSnackbar("Error deleting the movie!", { variant: 'error' })
      }
    })
  };

  if (props.loading) {
    return (
      <div
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
    props &&
    props.actors.length > 0 &&
    props.actors.map((actor: any) => {
      return (
        <div key={actor.actorId}>
          <Card sx={{ minWidth: 275, background: "gainsboro", margin: "20px" }}>
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
                  size="large"
                  color="error"
                  onClick={() => deleteActor(actor.actorId, actor.firstName)}
                >
                  <DeleteForeverIcon />
                </Button>
              </div>
            </CardActions>
          </Card>
        </div>
      );
    })
  );
}
