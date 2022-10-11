import SentimentDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentDissatisfiedOutlined';
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseUrl } from '../constants/global';
import { moviebyIdDTO } from "../DTOs/movieDTO";
import ProgressBar from "./Progressbar";
export default function MoviePage() {

  
  useEffect(() => loadMovieActors, []);
  let Movie = useParams();
  const [isLoading, setLoading] = useState(true);
  const [movie, setMovie] = useState<moviebyIdDTO>();

  const loadMovieActors = () => {
    axios.get(`${baseUrl}/movie/${Movie.id}`).then((res) => {
      setTimeout(() => {
        setLoading(false);
      }, 500);
      setMovie(res.data);
    });
  };

  const { enqueueSnackbar } = useSnackbar();

  const deleteActor = (actorId: string|void, name: string|void) => {
    axios.delete(`${baseUrl}/actor/${actorId}`).then((res) => {
      if (res.status === 200) {
        loadMovieActors();
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
          {movie?.movieName}
        </Typography>
        <Typography
          variant="h5"
          sx={{ margin: "30px", fontFamily: "Helvetica" }}
        >
          Total views : <strong>{movie?.totalViews}</strong>
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
          {!isLoading &&
            movie?.actorDTOs &&
            movie?.actorDTOs.length > 0 &&
            movie?.actorDTOs.map((actor) => {
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
          {
            (movie?.actorDTOs?.length === 0 && (
              <>
              <Typography variant="h6" component="div" color="white" sx={{marginLeft:"30px"}}>
                No Registered actors found!   {'   '}
                <SentimentDissatisfiedOutlinedIcon/>
              </Typography></>
            ))
          }
          {isLoading && <ProgressBar />}
        </Box>
      </div>
    </>
  );
}
