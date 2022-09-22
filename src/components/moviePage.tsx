import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import DeleteForeverIcon from "@mui/icons-material/DeleteForeverTwoTone";

export default function MoviePage() {
  let Movie = useParams();
  const [actors, setActors] = useState({
    movieName: "Jay",
    totalViews: 0,
    actorDTOs: [{}],
  });
  useEffect(() => {
    axios.get(`https://localhost:7114/movie/${Movie.id}`).then((res) => {
      console.log(res.data);
      setActors(res.data);
    });
  }, []);
  const { enqueueSnackbar } = useSnackbar();

  const deleteActor = (actorId: any, name: string) => {
    axios.delete(`https://localhost:7114/actor/${actorId}`).then((res) => {
      if (res.status === 200) {
        enqueueSnackbar(`${name} has been deleted successfully!`, {
          variant: "success",
        });
      } else {
        enqueueSnackbar("Error deleting the movie!", { variant: "error" });
      }
    });
  };
  return (
    <>
      <div style={{}}>
        <Typography
          variant="h2"
          sx={{ margin: "30px", fontFamily: "Helvetica", fontWeight: "bold" }}
          color="red"
        >
          {actors.movieName}
        </Typography>
        <Typography
          variant="h5"
          sx={{ margin: "30px", fontFamily: "Helvetica" }}
        >
          Total views : <strong>{actors.totalViews}</strong>
        </Typography>

        <Box
          component="form"
          sx={{
            p: 2,
            bgcolor: "#3A3B3C",
            display: "flow",
            gridTemplateColumns: { md: "1fr 1fr" },
            gap: 2,
            margin: "30px",
            borderRadius: "20px",
            justifyContent: "center",
            alignItems: "center",
            minWidth: "300px",
            maxWidth: "400px",
          }}
          noValidate
          autoComplete="off"
        >
          <Typography variant="h3" sx={{ margin: "20px" }} color="white">
            Cast
          </Typography>
          {actors.actorDTOs &&
            actors.actorDTOs.length > 0 &&
            actors.actorDTOs.map((actor: any) => {
              return (
                <div key={actor.actorId}>
                  <Card
                    sx={{
                      minWidth: 275,
                      background: "gainsboro",
                      margin: "20px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <CardContent>
                        <Typography variant="h5" component="div">
                          {actor.firstName} {actor.lastName}
                        </Typography>
                        <Typography
                          sx={{ mb: 1 }}
                          variant="body1"
                          color="text.secondary"
                        >
                          Wealth : ${actor.wealth}
                        </Typography>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            
                          }}
                        >
                          <Button
                          variant="contained"
                            size="large"
                            color="error"
                            onClick={() =>
                              deleteActor(actor.actorId, actor.firstName)
                            }
                          >
                            DELETE{" "}
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </div>
              );
            })}
        </Box>
      </div>
    </>
  );
}
