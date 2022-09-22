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
  
  export default function AllMovies(data: any) {
  
    if (data.loading) {
      return (
        <div style={{width:"100%", height:"300px", alignItems:"center" , justifyContent:"center", display: "flex" }}>
          <CircularProgress color="success" />
        </div>
      );
    }
  
    return (
      data &&
      data.movies.length > 0 &&
      data.movies.map((movie: any) => {
        return (
          <div key={movie.id}>
            <Card sx={{ minWidth: 275, background: "gainsboro", margin: "20px" }}>
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
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </div>
        );
      })
    );
  }
  