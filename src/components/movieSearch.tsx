import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  TextField,
  Typography
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchMovieByName } from "../commonFunctions/searchMovie";
import { movieDTO } from "../DTOs/movieDTO";
// import "../../src/App.css";
export default function MovieSearch() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<Array<movieDTO>>([]);

  const handleMovieSearch = async (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setLoading(true);
    const search = e.target.value;
    // if (search === null) {
    //   setSearchResults([]);
    // }
    const movies: Array<movieDTO> = await searchMovieByName(search);
    setLoading(false);
    setSearchResults(movies);
  };
  return (
    <Box
      component="form"
      sx={{
        p: 2,
        bgcolor: "#DCDCDC",
        display: "grid",
        gridTemplateColumns: { md: "1fr 1fr" },
        gap: 2,
        margin: "50px",
        borderRadius: "20px",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "inherit",
      }}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h4" color="darkred">
        Start Searching for your favourite Shows {"   "}
        {isLoading && <CircularProgress color="inherit" />}
      </Typography>
      <TextField
        data-testid="MovieSearchField"
        id="standard-basic"
        label="Enter your search"
        color="secondary"
        onChange={(e) => handleMovieSearch(e)}
        focused
      />
      {/* {isLoading && <CircularProgress color="success" />} */}
      {searchResults.length > 0 &&
        Array.from(searchResults).map((movie: movieDTO) => {
          return (
            <div key={movie.id}>
              <Card sx={{ minWidth: 275, background: "white", margin: "20px" }}>
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
                  <Button
                    size="small"
                    onClick={() => navigate(`/movie/${movie.id}`)}
                  >
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </div>
          );
        })}
    </Box>
  );
}
