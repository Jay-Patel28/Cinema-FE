import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CircularProgress, TextField,
    Typography
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../src/App.css";
export default function MovieSearch() {

    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const handleMovieSearch = (e: any) => {
        setLoading(true);
        const search = e.target.value;
        if (search === null) {
          setSearchResults([]);
        }
        axios.get(`https://localhost:7114/movie/q/${search}`).then((res: any) => {
          console.log("res: ", res.data);
          if (res === null) {
            return null;
          }
          setTimeout(() => {
            setLoading(false);
            setSearchResults(res.data);
          }, 1000);
        });
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
        id="standard-basic"
        label="Enter your search"
        color="secondary"
        onChange={(e) => handleMovieSearch(e)}
        focused
      />
      {/* {isLoading && <CircularProgress color="success" />} */}
      {Array.from(searchResults).map((movie: any) => {
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
