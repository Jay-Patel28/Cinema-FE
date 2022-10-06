import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteMovieService } from "../commonFunctions/deleteMovie";
import { allMoviesProps } from "../DTOs/allMoviesProps";
import { movieDTO } from "../DTOs/movieDTO";

export default function AllMovies(props: allMoviesProps) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [movies, setMovies] = useState(props.movies);

  const deleteMovie = async (movieId: string, name: string) => {
    const res = await deleteMovieService(movieId);
    if (res?.status === 200 || res?.status === 204) {
      // props.loadAllMovies();

      setMovies(movies?.filter((movie) => movie.id !== movieId));
      enqueueSnackbar(`${name} has been deleted successfully!`, {
        variant: "success",
      });
    } else {
      const action = (snackbarId: any) => (
        <>
          <Button
            sx={{ marginRight: "5px", color: "white" }}
            variant="text"
            size="small"
            onClick={() => {
              navigate(`/movie/${movieId}`);
            }}
          >
            View
          </Button>
        </>
      );
      enqueueSnackbar(`${res.errorMessage}`, { variant: "error", action });
    }
  };
  if (props.loading) {
    return (
      <div
        style={{
          margin: "50px",
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
  // const { movies } = props;
  return (
    <>
      {props &&
        movies &&
        movies.length > 0 &&
        movies?.map((movie: movieDTO) => {
          return (
            <div key={movie.id}>
              <Card
                sx={{ minWidth: 275, background: "gainsboro", margin: "20px" }}
              >
                <CardContent>
                  <Typography variant="h5" component="div">
                    {movie.movieName}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {movie.releaseDate}
                  </Typography>
                  <Typography variant="body2">
                    Total Views : {movie.totalViews}$
                  </Typography>
                </CardContent>
                <CardActions>
                  {" "}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <Button
                    variant="outlined"
                      size="small"
                      onClick={() => navigate(`${movie.id}`)}
                    >
                      Learn More
                    </Button>
                    <Button
                    startIcon={<DeleteIcon />}
                      name="delMovies"
                      variant="contained"
                      size="small"
                      color="error"
                      onClick={() => deleteMovie(movie.id, movie.movieName)}
                    >
                      {" "}
                      Delete
                      {/* <DeleteForeverIcon /> */}
                    </Button>
                  </div>
                </CardActions>
              </Card>
            </div>
          );
        })}
    </>
  );
}
