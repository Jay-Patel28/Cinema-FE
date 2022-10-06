import axios from "axios";
import { addMovieDTO, movieDTO } from "../DTOs/movieDTO";

interface outputDTO {
  status: 200;
  movie: movieDTO;
}
export async function addMovieRequest(movieToAdd: addMovieDTO) {
  try {
    const newMovie = await axios.post(
      "https://localhost:7114/movie",
      movieToAdd,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    const movie: movieDTO = newMovie.data;
    return { status: newMovie.status, movie: movie };
  } catch (err) {
    return { status: 400, movie: null };
  }
}
