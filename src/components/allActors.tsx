import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";

export default function AllActors(data: any) {
  console.log("aaaaaaaaaaaaaaaa", data);

  if (data.loading) {
    return (
      <div style={{width:"100%", height:"300px", alignItems:"center" , justifyContent:"center", display: "flex" }}>
        <CircularProgress color="success" />
      </div>
    );
  }

  return (
    data &&
    data.actors.length > 0 &&
    data.actors.map((actor: any) => {
      return (
        <div key={actor.firstName}>
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
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </div>
      );
    })
  );
}
